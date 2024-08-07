import { Link, Outlet } from "react-router-dom";
import useCartStore from "../stores/cart-store";
function RootLayout() {
  const items = useCartStore((state) => state.items);

  return (
    <div className="container mx-auto px-4 overflow-x-hidden">
      <nav className="flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold">
          Fake Store
        </Link>
        <Link to="/cart" className="flex items-center">
          <span className="mr-2">Cart</span>
          <span className="bg-blue-500 text-white rounded-full px-2 py-1">
            {items.length}
          </span>
        </Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default RootLayout;
