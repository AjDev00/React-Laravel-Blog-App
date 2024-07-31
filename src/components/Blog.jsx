import img2 from "../assets/pic-2.webp";
import RecentPosts from "./RecentPosts";

export default function Blog() {
  return (
    <div>
      <div>
        <div
          style={{ fontSize: "18px" }}
          className="flex flex-col px-3 pt-7 gap-3 font-semibold"
        >
          <img src={img2} alt="" className="rounded-md h-52 w-96" />
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae
            est ad ipsa veritatis temporibus.
          </div>
        </div>
        <div>
          <div>
            <RecentPosts />
          </div>
        </div>
      </div>
    </div>
  );
}
