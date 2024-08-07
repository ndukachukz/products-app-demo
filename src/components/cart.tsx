import React from "react";
import useCartStore from "../stores/cart-store";

const Cart: React.FC = () => {
  const { items, removeItem, clearCart, getTotalItems, getTotalPrice } =
    useCartStore();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4"
            >
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">
                  ${item.product.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t">
            <p className="font-semibold">Total Items: {getTotalItems()}</p>
            <p className="font-semibold">
              Total Price: ${getTotalPrice().toFixed(2)}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
