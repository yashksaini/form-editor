import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-full w-[900px] m-auto py-16 ">
      <NavLink
        to="/create"
        className="flex justify-center items-center w-40  m-auto  bg-blue-500 text-white py-2 px-6 rounded-full"
      >
        Create Form
      </NavLink>
    </div>
  );
};

export default Home;
