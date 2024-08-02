import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../App";

export default function InputSearch() {
  const { setInput, input, nav } = useContext(AppContext);
  return (
    <div>
      <motion.div initial={true} animate={{ x: -1 }}>
        {!nav && (
          <div className="flex pt-5 px-3">
            <input
              type="text"
              placeholder="Search with keywords..."
              onChange={(e) => setInput(e.target.value)}
              className="-z-10 border border-blue-500 shadow-sm p-2 rounded-md w-96 px-3 focus:outline-blue-900 focus:border-2 placeholder:font-semibold"
              value={input}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
