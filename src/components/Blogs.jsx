import { useEffect, useState } from "react";
import Blog from "./Blog";

export default function Blogs() {
  const [firstBlog, setFirstBlog] = useState({});
  const [loading, setLoading] = useState(true);

  async function readFirstBlog() {
    const res = await fetch("http://localhost:8000/api/first-blog");
    const data = await res.json();

    setFirstBlog(data.data);
    setLoading(false);
    console.log(data);
  }

  useEffect(() => {
    readFirstBlog();
  }, []);

  return (
    <div>
      <div>{firstBlog && <Blog firstBlog={firstBlog} loading={loading} />}</div>
    </div>
  );
}
