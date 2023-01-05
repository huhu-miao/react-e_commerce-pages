import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookie from "universal-cookie";
import { CartState } from "../../context/ShoppingCartContext";
// import { ajaxConfigHelper } from "../../helper/index";
import "./Header.css";

function Header({
  isSignIn,
  setIsSignIn,
  toggleSignIn,
  setIsAdmin,
  toggleShowShoppingCart,
}) {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const cookies = new Cookie();
  const toggleLogOut = async (event) => {
    event.preventDefault();
    // const token = cookies.get("TOKEN");
    // try {
    //   const response = await fetch(
    //     "/updateShoppingCart",
    //     ajaxConfigHelper(
    //       token,
    //       {
    //         cart: cart,
    //       },
    //       "PUT"
    //     )
    //   );
    //   const result = await response.json();
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }
    localStorage.clear();
    // cookies.remove("CART", { path: "/" });
    cookies.remove("TOKEN", { path: "/" });
    // cookies.remove("EMAIL", { path: "/" });
    dispatch({
      type: "INIT",
      payload: [],
    });
    setIsSignIn(false);
    setIsAdmin(false);
  };

  const [total, setTotal] = useState(0);
  const cartQuantity = cart.reduce(
    (acc, item) => Number(item.quantity) + acc,
    0
  );
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.quantity, 0)
    );
    // console.log(cart);
  }, [cart]);
  return (
    <div className="header">
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <div className="webstieName">
          <div className="name1">M</div>
          <div className="name2">Kachoo</div>
        </div>
      </NavLink>

      <form className="searchForm">
        <input type="search" placeholder="Search" className="input"></input>
        <button type="submit" className="button">
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"
            alt="search"
          />
        </button>
      </form>
      <div className="accountStatus">
        <div className="accountImg">
          <img
            src="https://img.icons8.com/external-anggara-flat-anggara-putra/32/000000/external-account-email-interface-anggara-flat-anggara-putra.png"
            alt="img"
          />
        </div>
        {!isSignIn ? (
          <NavLink to="/signIn">
            <button className="signInBtn" onClick={toggleSignIn}>
              Sign In
            </button>
          </NavLink>
        ) : (
          <NavLink to="/">
            <button className="signInBtn" onClick={toggleLogOut}>
              Log Out
            </button>
          </NavLink>
        )}
      </div>
      <div className="shoppingCart">
        <div className="cart">
          <img
            src="https://img.icons8.com/tiny-color/32/000000/buy.png"
            alt="shoppingCart"
            onClick={toggleShowShoppingCart}
          />

          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-item-center sm"
            style={{
              color: "white",
              width: "20px",
              height: "20px",
              position: "absolute",
              top: 0,
              right: "50px",
              transform: "translate(-25%,-25%)",
            }}
          >
            {cartQuantity}
          </div>
        </div>
        <div className="totalAmount">${total.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default Header;
