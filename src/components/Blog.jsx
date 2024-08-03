import img2 from "../assets/pic-2.webp";
import RecentPosts from "./RecentPosts";
import { BiArrowFromLeft } from "react-icons/bi";
import loadingImg from "../assets/loading.svg";
import { useEffect, useState } from "react";

export default function Blog({ firstBlog, loading }) {
  const [blogs, setBlogs] = useState({});

  async function readAllBlogs() {
    const res = await fetch("http://localhost:8000/api/blogs");
    const data = await res.json();

    setBlogs(data.data);
    console.log(blogs);
  }

  useEffect(() => {
    readAllBlogs();
  }, []);

  return (
    <div>
      <div>
        <div
          style={{ fontSize: "18px" }}
          className="flex flex-col px-3 pt-7 gap-3 font-semibold"
        >
          {loading ? (
            <div className="justify-center items-center flex">
              <img src={loadingImg} alt="" className="w-14 h-14 animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <img src={img2} alt="" className="rounded-md h-52 w-96" />
              <div className="font-bold text-[18px]">{firstBlog.title}</div>
              <div className="-z-10 opacity-90">{firstBlog.shortDesc}</div>
            </div>
          )}
        </div>
        {!loading && (
          <span className="flex flex-row items-center gap-1.5 mt-4 px-3">
            <i className="hover:underline">Read More</i>
            <BiArrowFromLeft className="mt-0.5" />
          </span>
        )}
        <div>
          <div>
            <div
              style={{ fontSize: "22px" }}
              className="font-bold opacity-50 text-blue-900 mb-4 -z-50 px-3 pt-14"
            >
              Recent Posts
            </div>
            {blogs &&
              blogs.map((blog) => {
                return <RecentPosts blog={blog} key={blog.id} />;
              })}
            {/* {blogs &blogs.map((blog) => (
              <div>{blog && <RecentPosts blog={blog} key={blog.id} />}</div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
