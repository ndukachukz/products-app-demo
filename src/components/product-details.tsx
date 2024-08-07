import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useCartStore from "../stores/cart-store";
import useProductStore, { Product } from "../stores/product-store";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, setProduct } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fake-store-api.mock.beeceptor.com/api/products/${id}`
        );

        const result = (response.data as Product[]).find(
          (product) => product.product_id.toString() === id
        );

        // if(!result)

        setProduct(result!);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.product_id,
        title: product.name,
        price: product.price,
        quantity: 1,
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-contain"
        />
      </div>
      <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl font-semibold mb-4">${product.price}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-sm text-gray-500 mb-4">
          Category: {product.category}
        </p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
