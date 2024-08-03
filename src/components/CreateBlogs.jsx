import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BiArrowBack } from "react-icons/bi";

export default function CreateBlogs() {
  const [desc, setDesc] = useState("");
  const [descErr, setDescErr] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [authorErr, setAuthorErr] = useState("");
  const [imageId, setImageId] = useState("");
  const [imgErr, setImgErr] = useState("");
  const history = useHistory();
  //react hook form params.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //inserting user's title, shortDesc, desc and author into the database with an external api.
  async function onSubmit(data) {
    const newData = { ...data, description: desc, image_id: imageId };
    const res = await fetch("http://localhost:8000/api/blogs", {
      method: "POST",
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
      toast("Blog Added Successfully!");
      history.push("/");
    }
    // console.log(dataApi.error.description[0]);
    // console.log(dataApi.error.title[0]);
    // console.log(dataApi.error.author[0]);
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

  return (
    <div>
      <div className="pt-4">
        {/* //back button. */}
        <div className="px-3 mb-5">
          <button
            style={{ fontSize: "16px" }}
            onClick={() => history.go(-1)}
            className="border border-transparent shadow-md p-2 px-4 rounded-md bg-slate-500 text-black font-semibold cursor-pointer hover:invert duration-300"
          >
            <BiArrowBack />
          </button>
        </div>

        {/* //header. */}
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
                {...register("description", { required: true, min: 10 })}
                cols="30"
                rows="7"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className="border border-slate-500 shadow-md p-2 rounded-md focus:outline-blue-900"
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
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
