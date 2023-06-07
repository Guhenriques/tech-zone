import React from "react";
import { useGetAllProductsQuery } from "../slices/productsApi";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const Home = () => {
  const { items: products, status } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetAllProductsQuery();
  console.log("Api", isLoading);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error ocurred</p>
      ) : (
        <>
          <h2>Products</h2>
          <div className="products">
            {data?.map(product => <div key={product.id} className="product">
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} />
              <div className="details">
                <span>{product.desc}</span>
                <span className="price">${product.price}</span>
              </div>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;

