import img1 from "../assets/pic-1.webp";
import img3 from "../assets/pic-3.webp";
import { BiArrowFromLeft } from "react-icons/bi";

export default function RecentPosts({ blog }) {
  return (
    <div>
      <div className="-z-50 px-3">
        <div className="flex flex-col gap-7 -z-10">
          <div className="px-3 flex flex-col gap-3">
            <img src={img1} alt="" className="rounded-lg" />
            <div className="font-bold text-[18px]">{blog.title}</div>
            <p
              style={{ fontSize: "" }}
              className="text-black opacity-90 font-semibold flex flex-col"
            >
              {blog.shortDesc}
              <span className="flex flex-row items-center gap-1.5 mt-4">
                <i className="hover:underline">Read More</i>
                <BiArrowFromLeft className="mt-0.5" />
              </span>
            </p>
          </div>
          <hr className="mb-10" />
        </div>
      </div>
    </div>
  );
}
