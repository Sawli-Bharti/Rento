
import { NavLink } from "react-router-dom";
import {  OwnerSellRentMenu } from "../resource";

const HeaderOwner = () => {
  return (
    <header className="sticky top-0 bg-white shadow z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/owner" className="text-2xl font-bold text-indigo-600">
          Rento Seller
        </NavLink>

        <div className="flex gap-8 items-center">
          
          <OwnerSellRentMenu/>

          <NavLink to="/owner/pricing" className="text-slate-600 hover:text-indigo-600">
            Pricing
          </NavLink>

          <NavLink
            to="/owner/login"
            className="border border-indigo-600 px-4 py-1 rounded text-indigo-600"
          >
            Login
          </NavLink>

          <NavLink
            to="/owner/signup"
            className="bg-indigo-600 text-white px-4 py-1 rounded"
          >
            Start Selling
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default HeaderOwner;
