import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function CreateBlogs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [desc, setDesc] = useState("");
  const history = useHistory();

  //check desc count.
  const validateDescCount = (value) => {
    const wordCount = value.trim().split(/\s+/).length;
    if (wordCount < 10) {
      return "Description must be at least 10 words";
    }
    return true;
  };

  async function onSubmit(data) {
    const newData = { ...data, description: desc };
    //fetching from an external api.
    await fetch("http://localhost:8000/api/blogs", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    toast("Blog Added Successfully!");
    history.push("/");
  }

  return (
    <div>
      <div className="pt-4">
        <div className="px-3 mb-5 text-2xl text-blue-900 font-semibold">
          Create Blogs
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            {/* //title. */}
            <div className="flex flex-col px-3">
              <label
                style={{ fontSize: "16px" }}
                htmlFor=""
                className="font-semibold"
              >
                Title: *
              </label>
              <input
                type="text"
                {...register("title", { required: true, min: 5 })}
                placeholder="Enter title..."
                className={
                  "border border-slate-500 shadow-md p-2 rounded-md focus:outline-blue-900"
                }
              />
              {errors.title && (
                <p className="font-semibold text-red-500">
                  This field is required!
                </p>
              )}
            </div>

            {/* //short desc. */}
            <div className="flex flex-col px-3">
              <label
                style={{ fontSize: "16px" }}
                htmlFor=""
                className="font-semibold"
              >
                Short Desc:
              </label>
              <input
                {...register("shortDesc")}
                type="text"
                placeholder="Enter short desc..."
                className="border border-slate-500 shadow-md p-2 rounded-md focus:outline-blue-900"
              />
            </div>

            {/* //description */}
            <div className="flex flex-col px-3">
              <label
                style={{ fontSize: "16px" }}
                htmlFor=""
                className="font-semibold"
              >
                Description: *
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  validate: validateDescCount,
                })}
                cols="30"
                rows="7"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className="border border-slate-500 shadow-md p-2 rounded-md focus:outline-blue-900"
              ></textarea>
              {errors.description && (
                <p className="font-semibold text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* //file. */}
            <div className="flex flex-col px-3">
              <input type="file" name="" id="" />
            </div>

            {/* //author. */}
            <div className="flex flex-col px-3">
              <label
                style={{ fontSize: "16px" }}
                htmlFor=""
                className="font-semibold"
              >
                Author: *
              </label>
              <input
                {...register("author", { required: true, min: 3 })}
                type="text"
                placeholder="Enter author's name"
                className="border border-slate-500 shadow-md p-2 rounded-md focus:outline-blue-900"
              />
              {errors.author && (
                <p className="font-semibold text-red-500">
                  This field is required!
                </p>
              )}
            </div>

            {/* //submit button. */}
            <div className="px-3 mt-3 mb-5">
              <button
                style={{ fontSize: "16px" }}
                type="submit"
                className="border border-transparent shadow-md p-2 px-4 rounded-md bg-blue-900 text-white font-semibold cursor-pointer hover:invert duration-300"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
