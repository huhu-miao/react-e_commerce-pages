import React, { useState, useEffect } from "react";
// import { ajaxConfigHelper } from "../../helper/index";
import Dropdown from "./Dropdown";
import ProductCard from "./ProductCard";
import "./style.css";
import { NavLink } from "react-router-dom";

const Products = ({
  isAdmin,
  addToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [filterName, setFilterName] = useState("Sort by");
  const [pageNumber, setPageNumber] = useState(1);
  const [productsPerPage] = useState(8);
  const lastProduct = pageNumber * productsPerPage;
  const firstProduct = lastProduct - productsPerPage;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("/allProducts");
      const result = await response.json();
      if (response.ok) {
        setData([...result]);
        // console.log(data);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    setSortedData([...data]);
  }, [data]);
  // console.log(sortedData);

  const currentProducts = sortedData.slice(firstProduct, lastProduct);

  const Loading = () => {
    return <div>Loading....</div>;
  };

  const handleMenuOne = () => {
    setSortedData([...data]);
    setFilterName("Last added");
  };

  const handleMenuTwo = () => {
    const lowToHigh = [...sortedData.sort((a, b) => a.price - b.price)];
    setSortedData(lowToHigh);
    setFilterName("Price: low to high");
  };
  const handleMenuThree = () => {
    const highToLow = [...sortedData.sort((a, b) => b.price - a.price)];
    setSortedData(highToLow);
    setFilterName("Price: high to low");
  };

  const pages = [];

  for (let i = 1; i <= Math.ceil(sortedData.length / productsPerPage); i++) {
    pages.push(i);
  }

  const changePage = (page) => {
    setPageNumber(page);
  };
  const ShowProducts = () => {
    return (
      <div className="productsContainer">
        <div className="filter">
          <div className="dropdown">
            <Dropdown
              trigger={<button className="dropdownBtn">{filterName}</button>}
              menu={[
                <button onClick={handleMenuOne}>Last added</button>,
                <button onClick={handleMenuTwo}>Price: low to high</button>,
                <button onClick={handleMenuThree}>Price: high to low</button>,
              ]}
            />
          </div>
          {isAdmin ? (
            <NavLink to="/createProduct">
              <div className="addProdcttBtn">Add Products</div>
            </NavLink>
          ) : null}
        </div>
        <div className="producListContainer">
          {currentProducts.map((product) => {
            return (
              <ProductCard
                product={product}
                key={product.id}
                isAdmin={isAdmin}
                addToCart={addToCart}
                increaseItemQuantity={increaseItemQuantity}
                decreaseItemQuantity={decreaseItemQuantity}
              />
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="products">
      <h3 className="productsHeader">Products</h3>

      <div>
        <div>{loading ? <Loading /> : <ShowProducts />}</div>
      </div>
      <div className="pagesContainer">
        {pages.map((ele) => {
          return (
            <>
              <button
                className="pageBtn"
                key={`page${ele}`}
                onClick={() => changePage(ele)}
              >
                {ele}
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
