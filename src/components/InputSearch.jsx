import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";

export default function InputSearch() {
  const { setInput, input, nav, setBlogs, blogs } = useContext(AppContext);

  //search for blogs.
  async function searchBlog() {
    const res = await fetch("http://localhost:8000/api/blogs?keyword=" + input);
    const data = await res.json();
    if (!data.data || data.data.length === 0) {
      setBlogs("No Search Results!");
    }

    setBlogs(data.data);
  }

  useEffect(() => {
    searchBlog();
  }, [input]);

  return (
    <div>
      {/* <motion.div initial={true} animate={{ x: -1 }}> */}
      {!nav && (
        <div className="flex pt-5 px-3">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search with keywords..."
            className="border border-blue-500 shadow-sm p-2 rounded-md w-96 px-3 focus:outline-blue-900 focus:border-2 placeholder:font-semibold"
            value={input}
            required
          />
        </div>
      )}
      {/* </motion.div> */}
    </div>
  );
}
