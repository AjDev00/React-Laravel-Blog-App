import "./App.css";
import AddNewBlogBtn from "./components/AddNewBlogBtn";
import Header from "./components/Header";
import InputSearch from "./components/InputSearch";
import { createContext, useState } from "react";
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

export const AppContext = createContext();

function App() {
  //Input params.
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");

  //Navbar params.
  const [nav, setNav] = useState(false);

  function handleShowInput() {
    setShowInput(!showInput);
  }

  return (
    <div>
      <AppContext.Provider
        value={{ handleShowInput, input, setInput, nav, setNav }}
      >
        <Router>
          <Switch>
            <Route exact path="/">
              <Header />
              <NavBar />
              {showInput && <InputSearch />}
              <Blogs />
              <AddNewBlogBtn />
            </Route>
            <Route path="/create-blogs">
              <CreateBlogs />
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
