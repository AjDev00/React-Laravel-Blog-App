import { BiEdit } from "react-icons/bi";
import RecentPosts from "./RecentPosts";
import { BiArrowFromLeft } from "react-icons/bi";
import loadingImg from "../assets/loading.svg";
import { useEffect, useState } from "react";
import placeholder from "../assets/placeholder.jpg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Blog({ firstBlog, loading, showImage }) {
  const [blogs, setBlogs] = useState();

  //displaying all blogs via external api.
  async function readAllBlogs() {
    const res = await fetch("http://localhost:8000/api/blogs");
    const data = await res.json();

    setBlogs(data.data);
  }

  useEffect(() => {
    readAllBlogs();
  }, []);

  //displaying all images via external api.
  function showImage(img) {
    return img ? (
      "http://localhost:8000/uploads/blogs/" + img //getting the image blogs from the upload folder from the backend.
    ) : (
      <img src={placeholder} alt="" />
    );
  }

  return (
    <div>
      <div>
        <div
          style={{ fontSize: "18px" }}
          className="flex flex-col px-3 pt-7 gap-3 font-semibold"
        >
          {loading ? (
            <div className="justify-center items-center flex">
              <img
                src={loadingImg}
                alt=""
                className="w-14 h-14 animate-spin mt-44"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <img
                src={showImage(firstBlog.image)}
                alt=""
                className="rounded-md h-52 w-96"
              />
              <div className="font-bold text-[18px]">{firstBlog.title}</div>
              <div className="-z-10 opacity-90">{firstBlog.shortDesc}</div>
            </div>
          )}
        </div>
        {!loading && (
          <span className="flex flex-row justify-between mt-2 px-3">
            <Link to={`/blog-details/${firstBlog.id}`}>
              <span className="flex flex-row items-center gap-1.5 mt-4">
                <i className="hover:underline text-[15px]">Read More</i>
                <BiArrowFromLeft className="mt-0.5" />
              </span>
            </Link>
            <Link to={`/edit-blog/${firstBlog.id}`} className="mt-4 mr-4">
              <span className="">
                <BiEdit size={25} className="cursor-pointer" />
              </span>
            </Link>
          </span>
        )}
        <div>
          <div className="-z-10">
            {!loading && (
              <div
                style={{ fontSize: "22px" }}
                className="font-bold opacity-50 text-blue-900 mb-4 -z-50 px-3 pt-14"
              >
                Recent Posts
              </div>
            )}
            {blogs &&
              blogs.map((blog) => {
                return (
                  <RecentPosts blog={blog} key={blog.id} loading={loading} />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
