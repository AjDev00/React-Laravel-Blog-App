import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

export default function DeleteBlogs() {
  const params = useParams();
  const history = useHistory();

  async function deletePosts() {
    const res = await fetch("http://localhost:8000/api/blogs/" + params.id, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.status === true) {
      toast("Blog Deleted Successfully!");
      history.push("/");
    }
  }

  useEffect(() => {
    deletePosts();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
}
