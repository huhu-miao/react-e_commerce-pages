import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
// import { Button } from "bootstrap";
import { CartState } from "../../context/ShoppingCartContext";

import "./style.css";

const Product = ({
  isAdmin,
  addToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
}) => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`/allProducts/${id}`);
      const result = await response.json();
      setProduct(result);
    };
    getProduct();
  }, [id]);

  const {
    state: { cart },
    // dispatch,
  } = CartState();
  // const quantity = getItemQuantity(product.id);

  // if (cart[0] !== null) {
  //   quantity = cart.find((item) => item.id === product.id)?.quantity || 0;
  // }

  const ShowProduct = () => {
    return (
      <div className="productInfoContainer">
        <div className="infoTitle">Product Detail</div>
        <div className="product-detail">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              className="product-detail-image"
            />
          </div>
          <div className="col-md-6">
            <h6 className="text-capitalize text-black-50 mb-3">
              {product.category}
            </h6>
            <h4 className="display-8 text-muted mb-3">{product.title}</h4>
            <div className="price-stock">
              <h4 className="display-8">${product.price}</h4>
              <div className="stockInfo">In Stock</div>
            </div>
            <p className="text-black-50 mt-3">
              <small>{product.description}</small>
            </p>
            <div className="btn-group">
              {cart.find((p) => p.id === product.id) ? (
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                  key={product.id}
                >
                  <button
                    className="btn btn-primary"
                    size="sm"
                    onClick={() => decreaseItemQuantity(product)}
                  >
                    -
                  </button>
                  <div className="fs-6">
                    {cart.find((item) => item.id === product.id).quantity}
                  </div>
                  <button
                    className="btn btn-primary"
                    size="sm"
                    onClick={() => increaseItemQuantity(product)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="btn btn-primary"
                    key={product.id}
                    onClick={() => addToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              )}
              {isAdmin ? (
                <div className="edit-btn">
                  <NavLink
                    to={`/editProduct/${product.id}`}
                    className="btn btn-outline-dark"
                  >
                    Edit
                  </NavLink>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container">
      <div className="row">
        <ShowProduct />
      </div>
    </div>
  );
};

export default Product;
