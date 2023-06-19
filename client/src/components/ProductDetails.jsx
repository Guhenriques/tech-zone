import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../slices/productsSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  return (
    <div>
      {status === "pending" && <p>Loading...</p>}
      {status === "rejected" && <p>Error occurred while fetching product details.</p>}
      {status === "success" && product && (
        <>
          <h2>Product Details</h2>
          <p>Product ID: {product.id}</p>
          <p>Name: {product.name}</p>
          <p>Description: {product.desc}</p>
          <p>Price: £{product.price}</p>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
