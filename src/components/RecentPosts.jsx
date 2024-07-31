import img1 from "../assets/pic-1.webp";
import img3 from "../assets/pic-3.webp";

export default function RecentPosts() {
  return (
    <div>
      <div className="-z-50 px-3 pt-7">
        <div
          style={{ fontSize: "22px" }}
          className="font-bold opacity-50 text-blue-900 mb-2"
        >
          Recent Post
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-3 hover:border hover:border-transparent hover:shadow-md hover:rounded-md duration-300">
              <img src={img1} alt="" className="w-40 rounded-md h-32" />
              <p
                style={{ fontSize: "" }}
                className="text-blue-900 opacity-90 font-semibold"
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="flex flex-col gap-3 hover:border hover:border-transparent hover:shadow-md hover:rounded-md duration-300">
              <img src={img3} alt="" className="w-40 rounded-md h-32" />
              <p className="text-blue-900 opacity-90 font-semibold">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-3 hover:border hover:border-transparent hover:shadow-md hover:rounded-md duration-300">
              <img src={img1} alt="" className="w-40 rounded-md h-32" />
              <p
                style={{ fontSize: "" }}
                className="text-blue-900 opacity-90 font-semibold"
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="flex flex-col gap-3 hover:border hover:border-transparent hover:shadow-md hover:rounded-md duration-300">
              <img src={img3} alt="" className="w-40 rounded-md h-32" />
              <p className="text-blue-900 opacity-90 font-semibold">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-3 hover:border hover:border-transparent hover:shadow-md hover:rounded-md duration-300">
              <img src={img1} alt="" className="w-40 rounded-md h-32" />
              <p
                style={{ fontSize: "" }}
                className="text-blue-900 opacity-90 font-semibold"
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="flex flex-col gap-3 hover:border hover:border-transparent hover:shadow-md hover:rounded-md duration-300">
              <img src={img3} alt="" className="w-40 rounded-md h-32" />
              <p className="text-blue-900 opacity-90 font-semibold">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
