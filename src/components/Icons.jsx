import { createContext, useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { AppContext } from "../App";

export default function Icons() {
  const { handleShowInput, nav, setNav } = useContext(AppContext);

  return (
    <div className="flex flex-row gap-4 text-blue-900 justify-center items-center">
      <div className="opacity-50 cursor-pointer">
        <FaSearch size={25} onClick={handleShowInput} />
      </div>
      <div onClick={() => setNav(!nav)} className="cursor-pointer">
        {nav ? (
          <FaTimes size={25} className="z-10 relative text-white mr-2" />
        ) : (
          <FaBars size={25} />
        )}
      </div>
    </div>
  );
}
