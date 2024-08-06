import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import loadingImg from "../assets/loading.svg";

export default function EditBlog() {
  //react hook form params.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  //form field params.
  const [desc, setDesc] = useState("");
  const [descErr, setDescErr] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [authorErr, setAuthorErr] = useState("");

  //image params.
  const [imageId, setImageId] = useState("");
  const [imgErr, setImgErr] = useState("");

  //others...
  const history = useHistory();
  const params = useParams();

  //inserting user's title, shortDesc, desc and author into the database with an external api.
  async function onSubmit(data) {
    const newData = { ...data, description: desc, image_id: imageId };
    const res = await fetch("http://localhost:8000/api/blogs/" + params.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const dataApi = await res.json();

    //check for form errors.
    if (dataApi.status === false) {
      setAuthorErr(dataApi.error.author[0]);
      setDescErr(dataApi.error.description[0]);
      setTitleErr(dataApi.error.title[0]);
    } else {
      toast("Blog Updated Successfully!");
      history.push("/");
    }
  }

  //uploading user's image into the database with an external api.
  async function handleFileChange(e) {
    const file = e.target.files[0]; //selects the first file selected by the user.
    const formData = new FormData(); //creating an instance of an in-built JS function that allows constructing key/value pairs representing form fields and their values.
    formData.append("image", file); //appended the key with the value(image as the key and the user's file as the value).

    const res = await fetch("http://localhost:8000/api/save-temp-image", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();

    //check for errors.
    if (result.status === false) {
      setImgErr(result.error.image);
      e.target.value = null;
      //   console.log(result.error.image);
    }

    setImageId(result.image.id);
  }

  //updating user's details with external api.
  async function updateBlog() {
    const res = await fetch("http://localhost:8000/api/blogs/" + params.id);
    const data = await res.json();

    setBlog(data.data);
    setDesc(data.data.description);
    setLoading(false);
    reset(data.data);
  }

  useEffect(() => {
    updateBlog();
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
        <div className="pt-4 md:px-44">
          <div className="flex flex-row-reverse justify-between items-center">
            {/* //back button. */}
            <div className="px-3 mb-5">
              <button
                style={{ fontSize: "16px" }}
                onClick={() => history.go(-1)}
                className="border border-transparent dark:text-white shadow-md p-2 px-4 rounded-md bg-slate-500 text-black font-semibold cursor-pointer hover:invert duration-300"
              >
                {/* <BiArrowBack /> */}
                back
              </button>
            </div>

            {/* //header. */}
            <div className="px-3 mb-5 dark:text-white text-2xl text-blue-900 font-semibold">
              Edit Blog
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-7">
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
                    "dark:focus:outline-none dark:text-black border border-slate-500 shadow-md p-2 rounded-md focus:outline-blue-900"
                  }
                />
                {titleErr ? (
                  <div className="font-semibold text-red-500">{titleErr}</div>
                ) : (
                  errors.title && (
                    <p className="font-semibold text-red-500">
                      This field is required!
                    </p>
                  )
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
                  className="border border-slate-500 dark:text-black dark:focus:outline-none shadow-md p-2 rounded-md focus:outline-blue-900"
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
                  {...register("description", { required: true, min: 10 })}
                  cols="30"
                  rows="7"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  className="border border-slate-500 dark:text-black dark:focus:outline-none shadow-md p-2 rounded-md focus:outline-blue-900"
                ></textarea>
                {descErr ? (
                  <div className="font-semibold text-red-500">{descErr}</div>
                ) : (
                  errors.description && (
                    <p className="font-semibold text-red-500">
                      This field is required!
                    </p>
                  )
                )}
              </div>

              {/* //file. */}
              <div className="flex flex-col px-3">
                <input onChange={handleFileChange} type="file" name="" id="" />
                {imgErr ? (
                  <div className="font-semibold text-red-500">{imgErr}</div>
                ) : (
                  ""
                )}
                <div className="mt-5">
                  {blog.image && (
                    <img
                      src={`http://localhost:8000/uploads/blogs/${blog.image}`}
                      alt=""
                      className="h-auto rounded-lg"
                    />
                  )}
                </div>
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
                  className="border border-slate-500 dark:text-black dark:focus:outline-none shadow-md p-2 rounded-md focus:outline-blue-900"
                />
                {authorErr ? (
                  <div className="font-semibold text-red-500">{authorErr}</div>
                ) : (
                  errors.author && (
                    <p className="font-semibold text-red-500">
                      This field is required!
                    </p>
                  )
                )}
              </div>

              {/* //submit button. */}
              <div className="px-3 mt-3 mb-5">
                <button
                  style={{ fontSize: "16px" }}
                  type="submit"
                  className="border border-transparent shadow-md p-2 px-4 rounded-md bg-blue-900 text-white font-semibold cursor-pointer hover:invert duration-300"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
