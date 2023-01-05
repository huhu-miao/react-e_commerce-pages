var createError = require("http-errors");
var express = require("express");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require("uuid");
// const auth = require("./auth");

//connect to database
const connectToMongoose = require("./database/connect");
const UserInfo = require("./database/models/userInfoModel");
const Products = require("./database/models/productsModels");
const { lte } = require("semver");

// const ShoppingCart = require("./database/models/shoppingCartModel");

connectToMongoose();

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// read the userInfo from database
// let UserInfoData = require("./userInfo.json");

app.get("/allUserInfo", async (_, res) => {
  const userInfoRawData = await UserInfo.find({});
  const userInfoData = userInfoRawData.map(({ email, password, id, cart }) => {
    return {
      email,
      password,
      id,
      cart,
    };
  });
  res.json(userInfoData);
});

//Sign up
app.post("/signUp", async (req, res) => {
  if (req.body && req.body.email && req.body.password !== undefined) {
    const userExist = await UserInfo.findOne({ email: req.body.email });
    if (userExist) {
      res.status(409).json({ emailMessage: "Email already exist." });
      return;
    } else {
      const userInfo = new UserInfo({
        email: req.body.email,
        password: req.body.password,
        id: uuidv4(),
        cart: [],
      });
      const newUserInfo = await userInfo.save();
      if (userInfo === newUserInfo) {
        res.status(200).json({
          message: "Sign up successfully!",
          newUserInfo: {
            email: newUserInfo.email,
            passwoed: newUserInfo.passwoed,
            id: newUserInfo.id,
            cart: newUserInfo.cart,
          },
        });
        return;
      }
    }
  }
  // else {
  //   res
  //     .status(400)
  //     .json({ message: "Faild! Email and/or password cannot be empty." });
  // }
});

// signin, read userInfo from server, check whether the email exsit, and whether the password matches
app.post("/signIn", async (req, res) => {
  if (req.body && req.body.email && req.body.password !== undefined) {
    const userExist = await UserInfo.findOne({ email: req.body.email });
    if (userExist) {
      if (userExist.password === req.body.password) {
        const token = jwt.sign(
          {
            userId: userExist.id,
            userEmail: userExist.email,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );
        let isAdmin = false;
        if (userExist.email === "testCase1@example.com") {
          isAdmin = true;
        }
        res.status(200).json({
          message: "SignIn successfully!",
          email: userExist.email,
          cart: userExist.cart,
          isAdmin: isAdmin,
          token,
        });
        // res.json({ email: req.body.email, password: req.body.password });
      } else {
        res
          .status(401)
          .json({ emailMessage: "", passwordMessage: "Wrong Password" });
      }
    } else {
      res.status(401).json({
        emailMessage: "Email does not exist",
        passwordMessage: "",
      });
    }
  }
  // else {
  //   res
  //     .status(400)
  //     .json({ message: "Faild! Email and/or password cannot be empty." });
  // }
});

// get user cart
app.get("/userCart", async (req, res) => {
  //verify the JWT token generated for the user
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
    const user = await decodedToken;
    req.user = user;
    const email = user.userEmail;
    // let isAdmin = false;
    // if (email === "testCase1@example.com") {
    //   isAdmin = true;
    // }
    const userExist = await UserInfo.findOne({ email: email });
    // res.json({ cart: userExist.cart, isAdmin: isAdmin });
    res.json({ cart: userExist.cart });
    // next();
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
});
//update user cart
app.put("/updateShoppingCart", async (req, res) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
    const user = await decodedToken;
    // req.user = user;
    const email = user.userEmail;
    const userExist = await UserInfo.findOne({ email: email });
    const { modifiedShoppingCart } = await userExist.updateOne({
      cart: req.body.cart,
    });
    if (!modifiedShoppingCart) {
      res.status(200).json({
        message: "Shopping cart information has been updated successfully!",
      });
      return;
    }

    // else {
    //   res.status(400).json({ message: "Failed" });
    // }
    // next();
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
});

// Change password
app.put("/changePassword", async (req, res) => {
  if (req.body && req.body.email !== undefined) {
    const userExist = await UserInfo.findOne({ email: req.body.email });
    if (userExist) {
      // const { modifiedPassword } = await userExist.updateOne({
      //   passowrd: req.body.password,
      // });
      // if (modifiedPassword) {
      //   res.status(200).json({ message: "Password changed successfully!" });
      //   return;
      // }
      res
        .status(200)
        .json({ message: "We've sent a link to your email address." });
    } else {
      res.status(401).json({ message: "Email does not exist" });
    }
  } else {
    res.status(400).json({ message: "Faild! Email cannot be empty." });
  }
});

//get all procts information
app.get("/allProducts", async (_, res) => {
  const ProductsRawData = await Products.find({});
  const productsData = ProductsRawData.map(
    ({ title, price, id, image, description, category, inStockQuantity }) => {
      return {
        title,
        price,
        id,
        image,
        description,
        category,
        inStockQuantity,
      };
    }
  );
  res.status(200).json(productsData);
});
// find one product
app.get("/allProducts/:id", async (req, res) => {
  // res.json(req.params.id);
  if (req.params && req.params.id !== undefined) {
    const id = req.params.id;
    const queryResult = await Products.findOne({ id });
    if (queryResult) {
      res.status(200).json({
        id: queryResult.id,
        title: queryResult.title,
        price: queryResult.price,
        image: queryResult.image,
        description: queryResult.description,
        category: queryResult.category,
        inStockQuantity: queryResult.inStockQuantity,
      });
    } else {
      res.status(400).json({ message: "failed" });
    }
  }
});
// create a new product
app.post("/createProduct", async (req, res) => {
  if (
    req.body &&
    req.body.title &&
    req.body.price &&
    req.body.image &&
    req.body.description &&
    req.body.category &&
    req.body.inStockQuantity !== undefined
  ) {
    const productExist = await Products.findOne({ title: req.body.title });
    if (productExist) {
      res.status(409).json({ message: "Product name already exist." });
      return;
    } else {
      const product = new Products({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        category: req.body.category,
        inStockQuantity: req.body.inStockQuantity,
        id: uuidv4(),
      });
      const newProduct = await product.save();
      if (product === newProduct) {
        res.status(200).json({
          message: "Product has been created successfully!",
          newProduct: {
            title: newProduct.title,
            price: newProduct.price,
            image: newProduct.image,
            description: newProduct.description,
            category: newProduct.category,
            inStockQuantity: newProduct.inStockQuantity,
            id: newProduct.id,
          },
        });
        return;
      }
    }
  } else {
    res.status(400).json({ message: "Faild! All input field required." });
  }
});

//delete a product
app.delete("/deleteProduct", async (req, res) => {
  const productId = req.body.id;
  const { deleteProduct } = await Products.remove({ id: productId });
  if (!deleteProduct) {
    res.status(200).json({ message: "succeed" });
    return;
  } else {
    res.status(400).json({ message: "failed" });
  }
});

// edit a product
app.put("/editProduct/:id", async (req, res) => {
  // happy path
  if (
    req.body &&
    req.body.title &&
    req.body.price &&
    req.body.image &&
    req.body.description &&
    req.body.category &&
    req.body.inStockQuantity !== undefined
  ) {
    const id = req.params.id;
    const queryResult = await Products.findOne({ id });
    const { modifiedProduct } = await queryResult.update({
      title: req.body.title,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
      category: req.body.category,
      inStockQuantity: req.body.inStockQuantity,
    });

    if (!modifiedProduct) {
      res.status(200).json({
        message: "Product information has been updated successfully!",
      });
      return;
    } else {
      res.status(400).json({ message: "Failed" });
      return;
    }
  }
  //error handling
  res.status(400).json({ message: "Failed" });
});

// //get all user cart information
// app.get("/allShoppingCarts", async (_, res) => {
//   const ShoppingCartsRawData = await ShoppingCart.find({});
//   const shoppingCartsData = ShoppingCartsRawData.map(({ email, items }) => {
//     return {
//       email,
//       items,
//     };
//   });
//   res.status(200).json(shoppingCartsData);
// });
// //create a user's cart
// app.post("/createShoppingCart", async (req, res) => {
//   if (req.body && req.body.email !== undefined) {
//     const userShoppingCartExist = await ShoppingCart.findOne({
//       email: req.body.email,
//     });
//     if (userShoppingCartExist) {
//       res.status(200).json({
//         email: userShoppingCartExist.email,
//         items: userShoppingCartExist.items,
//       });
//       return;
//     } else {
//       const shoppingCart = new ShoppingCart({
//         email: req.body.email,
//         items: req.body.items,
//       });
//       const newShoppingCart = await shoppingCart.save();
//       if (shoppingCart === newShoppingCart) {
//         res.status(200).json({
//           message: "Shopping cart has been created successfully!",
//           newShoppingCart: {
//             email: newShoppingCart.email,
//             items: newShoppingCart.items,
//           },
//         });
//         return;
//       }
//     }
//   } else {
//     res.status(400).json({ message: "Faild!" });
//   }
// });
// update one user's cart
// app.put("/updateShoppingCart", async (req, res) => {
//   if (req.body && req.body.email !== undefined) {
//     const userExist = await UserInfo.findOne({ email: req.body.email });
//     if (userExist) {
//       const { modifiedShoppingCart } = await userExist.updateOne({
//         cart: req.body.cart,
//       });

//       if (!modifiedShoppingCart) {
//         res.status(200).json({
//           message: "Shopping cart information has been updated successfully!",
//         });
//         return;
//       } else {
//         res.status(400).json({ message: "Failed" });
//         return;
//       }
//     } else {
//       res.status(401).json({ message: "Email does not exist" });
//     }
//   } else {
//     res.status(400).json({ message: "Faild! Email cannot be empty." });
//   }
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

module.exports = app;
