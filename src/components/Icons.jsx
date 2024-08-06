import { createContext, useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AppContext } from "../App";
import { BiSun } from "react-icons/bi";
import { BiMoon } from "react-icons/bi";

export default function Icons() {
  const { handleShowInput, toggleSwitch, handleToggleSwitch } =
    useContext(AppContext);

  return (
    <div className="dark:text-white flex flex-row gap-4 text-blue-900 justify-center items-center md:mt-2">
      <div className="opacity-50 cursor-pointer">
        <FaSearch size={25} onClick={handleShowInput} />
      </div>
      <div className="cursor-pointer" onClick={handleToggleSwitch}>
        {toggleSwitch ? <BiMoon size={25} /> : <BiSun size={25} />}
      </div>
    </div>
  );
}
