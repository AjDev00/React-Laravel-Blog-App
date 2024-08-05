import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import loadingImg from "../assets/loading.svg";

export default function BlogDetails() {
  const [singleBlog, setSingleBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const history = useHistory();

  async function displaySingleBlog() {
    const res = await fetch("http://localhost:8000/api/blogs/" + params.id);
    const data = await res.json();

    setSingleBlog(data.data);
    setLoading(false);
  }

  useEffect(() => {
    displaySingleBlog();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="justify-center items-center flex">
          <img
            src={loadingImg}
            alt=""
            className="w-14 h-14 animate-spin mt-44"
          />
        </div>
      ) : (
        <div className="flex flex-col mb-5">
          <div className="flex flex-row justify-between px-3 pt-3 items-center">
            <div className="font-bold text-[22px] text-blue-800">
              {singleBlog.title}
            </div>
            <div
              onClick={() => history.push("/")}
              className="flex flex-row items-center justify-center gap-4 border border-transparent shadow-sm p-2 px-4 rounded-md bg-slate-500 text-black font-semibold cursor-pointer hover:invert duration-300"
            >
              {/* back to home */}
              {/* <BiArrowBack /> */}
              back
            </div>
          </div>
          <div className="px-3 pt-4">
            <div className="text-blue-950">
              by <strong className="text-blue-800">{singleBlog.author}</strong>{" "}
              on {singleBlog.date}.
            </div>
          </div>
          <div className="px-3 pt-10">
            {singleBlog.image && (
              <img
                src={`http://localhost:8000/uploads/blogs/${singleBlog.image}`}
                alt=""
                className="h-auto rounded-lg"
              />
            )}
          </div>
          <div className="px-3 mt-5">
            <div className="tracking-wide">{singleBlog.description}</div>
          </div>
        </div>
      )}
    </div>
  );
}
