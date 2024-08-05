import { BiArrowFromLeft } from "react-icons/bi";
import placeholder from "../assets/placeholder.jpg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";

export default function RecentPosts({ blogs, setBlogs, blog, loading }) {
  function showAllImage(img) {
    return img ? (
      "http://localhost:8000/uploads/blogs/" + img
    ) : (
      <img src={placeholder} alt="" />
    );
  }

  //deleting blog with external api.
  async function deletePosts(id) {
    const res = await fetch("http://localhost:8000/api/blogs/" + id, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.status === true) {
      const newBlogs = blogs.filter((blog) => blog.id != id); //once blog has been deleted, create a new array of blogs without the deleted blog.

      setBlogs(newBlogs);
      toast("Blog Deleted Successfully!");
    } else {
      toast("Unable to delete!");
    }
  }

  return (
    <div>
      {!loading && (
        <div className="-z-50 px-3">
          <div className="flex flex-col gap-7 -z-10">
            <div className="px-3 flex flex-col gap-3">
              <img
                src={showAllImage(blog.image)}
                alt=""
                className="rounded-lg h-auto"
              />
              <div className="font-bold text-[18px]">{blog.title}</div>
              <p
                style={{ fontSize: "" }}
                className="text-black opacity-90 font-semibold flex flex-col"
              >
                {blog.shortDesc}
                <span className="flex flex-row justify-between mt-2">
                  <Link to={`/blog-details/${blog.id}`}>
                    <span className="flex flex-row items-center gap-1.5 mt-4">
                      <i className="hover:underline text-[15px]">Read More</i>
                      <BiArrowFromLeft className="mt-0.5" />
                    </span>
                  </Link>
                  <span className="flex flex-row gap-2 mr-2">
                    <Link to={`/edit-blog/${blog.id}`} className="mt-4">
                      <BiEdit size={20} className="cursor-pointer" />
                    </Link>
                    <BiTrash
                      onClick={() => deletePosts(blog.id)}
                      size={20}
                      className="cursor-pointer text-red-500 mt-4"
                    />
                  </span>
                </span>
              </p>
            </div>
            <hr className="mb-10" />
          </div>
        </div>
      )}
    </div>
  );
}
