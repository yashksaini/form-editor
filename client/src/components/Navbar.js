import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-16 border bg-gray-100">
      <div className="w-[900px] h-16 max-w-full m-auto flex justify-between items-center px-3 md:px-0">
        <NavLink to="/" className="text-xl text-gray-800 font-semibold">
          Form Builder
        </NavLink>
        <div className="flex gap-8 ">
          <NavLink to="/create">Create</NavLink>
          <NavLink to="/forms">All Forms</NavLink>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
