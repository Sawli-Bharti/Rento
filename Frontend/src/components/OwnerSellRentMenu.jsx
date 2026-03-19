import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";

const sellSteps = [
  {
    step: "01",
    title: "Become Owner",
    desc: "Register to sell property",
    link: "/owner/signup",
  },
  {
    step: "02",
    title: "Upload Documents",
    desc: "Property & ID verification",
    link: "/owner/kyc",
  },
  {
    step: "03",
    title: "Add Property for Rent/Sale",
    desc: "List property for Renter/buyers",
    link: "/owner/add-property",
  },
];

const OwnerSellRentMenu = () => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const handleEnter = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 150); // Flipkart-like delay
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Trigger */}
      <span className="cursor-pointer font-medium text-slate-600 hover:text-indigo-600">
        Rent/Sell Property
      </span>

      {/* Dropdown (part of same hover zone) */}
      {open && (
        <div className="absolute left-0 top-full mt-3 w-[420px] bg-white shadow-xl rounded-xl border p-4">
          {sellSteps.map((step) => (
            <NavLink
              key={step.step}
              to={step.link}
              className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition"
            >
              <div className="text-indigo-600 font-bold text-lg">
                {step.step}
              </div>
              <div>
                <p className="font-semibold text-slate-800">
                  {step.title}
                </p>
                <p className="text-sm text-slate-500">
                  {step.desc}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerSellRentMenu;
