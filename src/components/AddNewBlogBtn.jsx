import { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { AppContext } from "../App";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function AddNewBlogBtn() {
  const { nav } = useContext(AppContext);

  return (
    <div>
      {nav ? (
        <div className="border border-transparent p-4 w-fit rounded-full bg-blue-900 text-white cursor-pointer hover:opacity-75 duration-300 right-0 top-[600px] mr-3 fixed -z-10">
          <FaPlus size={20} className="" />
        </div>
      ) : (
        <Link to="/create-blogs">
          <div className="border border-transparent p-4 w-fit rounded-full bg-blue-900 text-white cursor-pointer hover:invert duration-300 right-0 top-[600px] mr-3 fixed z-10">
            <FaPlus size={20} className="" />
          </div>
        </Link>
      )}
    </div>
  );
}
