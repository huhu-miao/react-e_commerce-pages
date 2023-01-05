import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CartState } from "../../context/ShoppingCartContext";

const ProductCard = ({
  product,
  isAdmin,
  addToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
}) => {
  const {
    state: { cart },
    // dispatch,
  } = CartState();
  // console.log(cart);

  // if (cart[0] !== null) {
  //   // console.log(cart);
  //   quantity = cart.find((item) => item.id === product.id)?.quantity || 0;
  // }

  return (
    <div className="col-md-3 col-xs-12 col-sm-4 mb-4">
      <div className="card h-60 w-55 text-center p-3">
        <NavLink to={`/allProducts/${product.id}`}>
          <img
            src={product.image}
            className="rounded mx-auto d-block"
            alt={product.title}
            width="150px"
            height="150px"
          />
        </NavLink>

        <div className="card-body p-1">
          <h6 className="card-title mb-0 text-secondary">
            {product.title.substring(0, 12)}
          </h6>
          <p className="card-text fw-bold mb-1">${product.price}</p>
          <div className={isAdmin ? "btnContainer" : null}>
            {cart.some((p) => p.quantity > 0 && p.id === product.id) ? (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
                key={product.id}
              >
                <Button size="sm" onClick={() => decreaseItemQuantity(product)}>
                  -
                </Button>
                <div className="fs-6">
                  {cart.find((item) => item.id === product.id).quantity}
                </div>
                <Button size="sm" onClick={() => increaseItemQuantity(product)}>
                  +
                </Button>
              </div>
            ) : (
              <Button
                className="btn btn-primary"
                size="sm"
                style={{ gap: ".5rem" }}
                key={product.id}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            )}
            {isAdmin ? (
              <NavLink
                to={`/editProduct/${product.id}`}
                className="btn btn-outline-dark"
              >
                Edit
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
