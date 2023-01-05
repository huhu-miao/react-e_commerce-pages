import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ajaxConfigHelper } from "../../helper/index";
import { useParams } from "react-router";
import "./style.css";

const EditProduct = ({ newProduct }) => {
  const [imageLink, setImageLink] = useState("");
  const [formValues, setFormValues] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`/allProducts/${id}`);
      const result = await response.json();
      setFormValues(result);
    };
    if (!newProduct) {
      getProduct();
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const uploadImage = (event) => {
    event.preventDefault();
    setImageLink(formValues.image);
  };
  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "/createProduct",
        ajaxConfigHelper(
          "",
          {
            title: formValues.title,
            price: formValues.price,
            image: formValues.image,
            description: formValues.description,
            category: formValues.category,
            inStockQuantity: formValues.inStockQuantity,
          },
          "POST"
        )
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/editProduct/${id}`,
        ajaxConfigHelper(
          "",
          {
            title: formValues.title,
            price: formValues.price,
            image: formValues.image,
            description: formValues.description,
            category: formValues.category,
            inStockQuantity: formValues.inStockQuantity,
          },
          "PUT"
        )
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="edit-title">
        {newProduct ? "Create Product" : "Edit Product"}
      </div>
      <div className="editContainer">
        <form className="eidtForm">
          <label className="labels">Product name</label>
          <input
            className="inputfieldLg"
            type="text"
            name="title"
            key="titleField"
            defaultValue={formValues.title}
            onChange={handleChange}
          ></input>
          <label className="labels">Product Description</label>
          <textarea
            className="inputfieldXLg"
            type="textarea"
            name="description"
            key="descriptionField"
            defaultValue={formValues.description}
            onChange={handleChange}
          />
          <div className="twoInputFieldContainer">
            <div className="areaInputField">
              <label className="labels" htmlFor="category">
                Category
              </label>
              <select
                className="inputfieldSm"
                name="category"
                key="categoryField"
                defaultValue={formValues.category}
                onChange={handleChange}
              >
                <option value="DEFAULT"></option>
                <option value="men's clothing">Men's clothing</option>
                <option value="women's clothing">Women's clothing</option>
                <option value="jewelery">Jewelery</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
            <div className="areaInputField">
              <label className="labels">Price</label>
              <input
                className="inputfieldSm"
                type="number"
                name="price"
                key="priceField"
                defaultValue={formValues.price}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="twoInputFieldContainer">
            <div className="areaInputField2">
              <label className="labels">In Stock Quantity</label>
              <input
                className="inputfieldXSm"
                type="number"
                name="inStockQuantity"
                key="inStockQuantityField"
                defaultValue={formValues.inStockQuantity}
                onChange={handleChange}
              ></input>
            </div>
            <div className="areaInputField2">
              <label className="labels">Add Image Link</label>
              <div className="imageUpload">
                <div>
                  <input
                    className="inputfieldSm"
                    type="text"
                    name="image"
                    key="imageField"
                    defaultValue={formValues.image}
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <button
                    className="btn btn-primary p-1 uploadBtn"
                    onClick={uploadImage}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="imageArea">
            <div className="imageContainer">
              <img
                src={imageLink}
                height="140px"
                width="90%"
                alt="Image preview!"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={newProduct ? handleCreate : handleUpdate}
            >
              {newProduct ? "Add Product" : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
