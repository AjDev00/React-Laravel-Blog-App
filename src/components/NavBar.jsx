import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import "../index.css";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import { FaHome } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

export default function NavBar() {
  const { nav } = useContext(AppContext);

  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };
  return (
    <div>
      <motion.div
        layout
        // animate={{ opacity: 0.5 }}
        transition={{
          opacity: { ease: "linear" },
          layout: { duration: 10 },
        }}
      >
        {nav && (
          <div
            style={{ fontSize: "20px" }}
            className="flex flex-col gap-10 text-white border border-transparent bg-blue-950 absolute top-0 right-0 w-60 h-screen bg-opacity-95 z-0 backdrop-blur-lg frosted-glass"
          >
            <div className="ml-10 mt-20 cursor-pointer flex flex-row gap-3 items-center">
              {/* <FaHome size={25} /> */}
              Home
            </div>
            <div className="ml-10 cursor-pointer">Profile</div>
            <div className="ml-10 cursor-pointer flex flex-row gap-3 items-center">
              Logout
              <BiLogOut size={25} className="text-red-500" />
            </div>
            <div className="ml-5 px-3 mt-72 flex flex-row gap-7 border border-transparent bg-blue-900 w-fit p-2 rounded-md items-center justify-between">
              <FaSun size={25} />
              <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
                <motion.div className="handle" layout transition={spring} />
              </div>
              <FaMoon size={25} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
