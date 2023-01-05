import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";

import Header from "./Commom/header/Header";
import Footer from "./Commom/footer/Footer";
import Modal from "./Commom/Modal/Modal";
import FreeComponet from "./components/FreeComponent/FreeComponet";
import AuthComponent from "./components/authComponent/AuthComponent";
import Products from "./components/FreeComponent/Products";
import Product from "./components/FreeComponent/Product";
import EditProduct from "./components/authComponent/EditProduct";
import ShoppingCart from "./components/FreeComponent/ShoppingCart";
import { CartState } from "./context/ShoppingCartContext";
import ErrorPage from "./Commom/ErrorPage";
import { ajaxConfigHelper } from "../client/helper/index";
// import ProtectedRoutes from "./Commom/ProtectedRoutes";

import "./App.css";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formName, setFormName] = useState("");
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const [cartChanged, setCartChanged] = useState(false);

  const navigate = useNavigate();
  const cookies = new Cookie();

  const {
    state: { cart },
    dispatch,
  } = CartState();

  const getCart = async (token) => {
    const response = await fetch(
      "/userCart",
      // ajaxConfigHelper(token, {}, "POST")
      {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer" + " " + token,
        }),
      }
    );
    const result = await response.json();
    // console.log(result);
    dispatch({
      type: "INIT",
      payload: result.cart,
    });
    // setIsAdmin(result.isAdmin);
  };
  const updateCart = async () => {
    const token = cookies.get("TOKEN");
    if (token) {
      try {
        const response = await fetch(
          "/updateShoppingCart",
          ajaxConfigHelper(
            token,
            {
              cart: [...cart],
            },
            "PUT"
          )
        );
        const result = await response.json();
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (cartChanged) {
      updateCart();
      // console.log(cart);
    }
    // updateCart();
  }, [cart]);

  useEffect(() => {
    const token = cookies.get("TOKEN");
    if (token) {
      setIsSignIn(true);
      setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
      getCart(token);
      // console.log(cart);
      setCartChanged(false);
    } else {
      dispatch({
        type: "INIT",
        payload: [],
      });
    }
  }, []);

  // useEffect(() => {
  //   if (cookies.get("TOKEN")) {
  //     setIsSignIn(true);
  //   }
  //   if (cookies.get("EMAIL") === "testCase1@example.com") {
  //     setIsAdmin(true);
  //   }
  //   let prev_items = JSON.parse(localStorage.getItem("cart")) || [];
  //   dispatch({
  //     type: "INIT",
  //     payload: prev_items,
  //   });
  //   setIsInitiallyFetched(true);
  //   // if (cookies.get("CART")) {
  //   //   dispatch({
  //   //     type: "INIT",
  //   //     payload: cookies.get("CART"),
  //   //   });
  //   // }
  // }, []);

  // useEffect(() => {
  //   if (isInitiallyFetched) {
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //   }
  // }, [cart]);

  const toggleSignIn = () => {
    setIsModalVisible(true);
    setModalTitle("Sign in to your account");
    setFormName("SignIn");
  };

  const handleClose = () => {
    setIsModalVisible(false);
    navigate("/");
  };
  const toggleShowShoppingCart = () => {
    setShowShoppingCart(true);
  };
  const closeShoppingCart = () => {
    setShowShoppingCart(false);
  };
  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
    setCartChanged(true);
  };
  const increaseItemQuantity = (product) => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: product,
    });
    setCartChanged(true);
  };
  const decreaseItemQuantity = (product) => {
    const qty = cart.find((item) => item.id === product.id).quantity;
    if (qty === 1) {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: product,
      });
      // console.log("remove");
    } else {
      dispatch({
        type: "DECREASE_QUANTITY",
        payload: product,
      });
      // console.log("decrease");
    }

    setCartChanged(true);
  };
  const removeFromCart = (product) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });
    setCartChanged(true);
  };
  // const CheckOut = (totalBill) => {
  //   return <span>{totalBill.toal}</span>;
  // };
  return (
    <div>
      <div className="App">
        <div>
          <Header
            toggleSignIn={toggleSignIn}
            isSignIn={isSignIn}
            setIsSignIn={setIsSignIn}
            setIsAdmin={setIsAdmin}
            toggleShowShoppingCart={toggleShowShoppingCart}
          />
        </div>
        <ShoppingCart
          open={showShoppingCart}
          onClose={closeShoppingCart}
          increaseItemQuantity={increaseItemQuantity}
          decreaseItemQuantity={decreaseItemQuantity}
          removeFromCart={removeFromCart}
        />
        <div className="mainContent">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Products
                  isAdmin={isAdmin}
                  addToCart={addToCart}
                  increaseItemQuantity={increaseItemQuantity}
                  decreaseItemQuantity={decreaseItemQuantity}
                />
              }
            />
            <Route
              exact
              path="/signIn"
              element={
                <Modal
                  open={isModalVisible}
                  onClose={handleClose}
                  modalTitle={modalTitle}
                  setModalTitle={setModalTitle}
                  formName={formName}
                  setFormName={setFormName}
                  setIsSignIn={setIsSignIn}
                  setIsAdmin={setIsAdmin}
                  setCartChanged={setCartChanged}
                />
              }
            />
            <Route exact path="/free" element={<FreeComponet />} />
            <Route exact path="/auth" element={<AuthComponent />} />
            {/* <Route exact path="/free/allProducts/:id" element={<Product />} /> */}
            <Route
              exact
              path="/allProducts/:id"
              element={
                <Product
                  isAdmin={isAdmin}
                  addToCart={addToCart}
                  increaseItemQuantity={increaseItemQuantity}
                  decreaseItemQuantity={decreaseItemQuantity}
                />
              }
            />
            <Route
              exact
              path="/editProduct/:id"
              element={<EditProduct newProduct={false} />}
            />
            <Route
              exact
              path="/createProduct"
              element={<EditProduct newProduct={true} />}
            />
            {/* <Route
              path="/checkOut"
              element={<CheckOut totalBill={cart.total} />}
            /> */}
            <Route path="*" element={<ErrorPage />} />
            {/* <ProtectedRoutes
            exact
            path="/editProduct/:id"
            element={<EditProduct newProduct={false} />}
          />
          <ProtectedRoutes
            exact
            path="/createProduct"
            element={<EditProduct newProduct={true} />}
          /> */}
          </Routes>
        </div>
        {/* <button className="signInBtn" onClick={toggleSignIn}>
        Sign In
      </button> */}

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
