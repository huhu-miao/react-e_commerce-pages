import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { CartState } from "../../context/ShoppingCartContext";

const ShoppingCart = ({
  open,
  onClose,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeFromCart,
}) => {
  const {
    state: { cart },
    // dispatch,
  } = CartState();

  const [total, setTotal] = useState();
  const cartQuantity = cart.reduce(
    (acc, item) => Number(item.quantity) + acc,
    0
  );
  // console.log(cart);
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.quantity, 0)
    );
    // console.log(cart);
  }, [cart]);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const handleDiscount = () => {
    if (couponCode === "10OFF") {
      setDiscount(10);
    } else if (couponCode === "20OFF") {
      setDiscount(20);
    }
  };

  if (!open) return null;
  return (
    <div onClick={onClose} className="cartOverlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="cartContainer"
      >
        <div className="cartHeader">
          <div id="headerDiv">
            <span id="headerCart">Cart</span>
            <span id="headerQuantity">({cartQuantity})</span>
          </div>
          <div id="closeBtn" onClick={onClose}>
            X
          </div>
        </div>
        <div className="cartItems">
          {cart.map((product) => {
            // <CartItem key={product.id} product={product} />;
            if (product.quantity < 1) {
              return null;
            }
            return (
              <div className="cartItem" key={product.id}>
                <div className="itemImage">
                  <img
                    src={product.image}
                    alt={product.title}
                    height="80px"
                    width="80px"
                  />
                </div>
                <div className="titleNbtn">
                  <div className="itemTitle">{product.title}</div>
                  <div className="itemEditBtn">
                    <button
                      className="editBtn"
                      onClick={() => decreaseItemQuantity(product)}
                    >
                      -
                    </button>
                    <button className="itemQuantity">{product.quantity}</button>
                    <button
                      className="editBtn"
                      onClick={() => increaseItemQuantity(product)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="itemTotalNremove">
                  <div className="itemTotal">
                    ${product.price * product.quantity}
                  </div>
                  <div
                    className="remove"
                    onClick={() => removeFromCart(product)}
                  >
                    Remove
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div id="couponContainer">
          <label id="couponLabel">Apply Discount Code</label>
          <div id="couponInputContainer">
            <input
              type="text"
              placeholder="20 DOLLAR OFF"
              className="couponInput"
              defaultValue={""}
              onChange={(e) => setCouponCode(e.target.value)}
            ></input>
            <button id="couponBtn" onClick={handleDiscount}>
              Apply
            </button>
          </div>
        </div>
        <hr id="line" />
        <div id="checkoutInfo">
          <div className="infoDetail">
            <div>Subtotal</div> <div>${total.toFixed(2)}</div>
          </div>
          <div className="infoDetail">
            <div>Tax</div> <div>${(total * 0.1).toFixed(2)}</div>
          </div>
          <div className="infoDetail">
            <div>Discount</div> <div>-${discount}</div>
          </div>
          <div className="infoDetail">
            <div>Estimated Total</div>{" "}
            <div>${(total * 1.1 - discount).toFixed(2)}</div>
          </div>
        </div>
        <div id="checkoutContainer">
          <NavLink to="/checkOut">
            <button id="checkoutBtn" onClick={onClose}>
              Continue to Checkout
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
