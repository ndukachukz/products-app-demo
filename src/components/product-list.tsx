import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductSlider from "./product-slider";
import useCartStore from "../stores/cart-store";
import { Product } from "../stores/product-store";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fake-store-api.mock.beeceptor.com/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: (Math.random() * Date.now()) / 5,
      product: product,
      quantity: 1,
    });
  };

  return (
    <div>
      <ProductSlider products={products} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
            <div className="flex justify-between md:grid md:justify-center gap-2 ">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 md:p-2 md:min-w-full rounded hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${product.product_id}`}
                className="bg-gray-200 text-gray-700 px-4 py-2 md:p-2 md:min-w-full rounded hover:bg-gray-300 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
