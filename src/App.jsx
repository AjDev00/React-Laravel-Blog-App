import "./App.css";
import AddNewBlogBtn from "./components/AddNewBlogBtn";
import Header from "./components/Header";
import InputSearch from "./components/InputSearch";
import { createContext, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Blogs from "./components/Blogs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import CreateBlogs from "./components/CreateBlogs";
import BlogDetails from "./components/BlogDetails";
import EditBlog from "./components/EditBlog";

export const AppContext = createContext();

function App() {
  //Input params.
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");

  function handleShowInput() {
    setShowInput(!showInput);
    // setInput("");
  }

  //Navbar params.
  const [nav, setNav] = useState(false);

  //show all blogs params.
  const [blogs, setBlogs] = useState();

  //toggle light and dark mode.
  const [toggleSwitch, setToggleSwitch] = useState(false);

  function handleToggleSwitch() {
    setToggleSwitch(!toggleSwitch);
  }

  useEffect(() => {
    console.log(`Dark mode is now ${toggleSwitch ? "enabled" : "disabled"}`);
    if (toggleSwitch) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [toggleSwitch]);

  return (
    <div className="dark:bg-slate-900 dark:text-white dark:duration-500 duration-500 min-h-screen">
      <AppContext.Provider
        value={{
          handleShowInput,
          input,
          setInput,
          nav,
          setNav,
          blogs,
          setBlogs,
          toggleSwitch,
          handleToggleSwitch,
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/">
              <Header />
              <NavBar />
              <div className="md:hidden">{showInput && <InputSearch />}</div>
              <Blogs />
              <AddNewBlogBtn />
            </Route>
            <Route path="/create-blogs">
              <CreateBlogs />
            </Route>
            <Route path="/blog-details/:id">
              <BlogDetails />
            </Route>
            <Route path="/edit-blog/:id">
              <EditBlog />
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
