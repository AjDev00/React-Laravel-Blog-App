import "./App.css";
import AddNewBlogBtn from "./components/AddNewBlogBtn";
import Header from "./components/Header";
import InputSearch from "./components/InputSearch";
import { createContext, useState } from "react";
import NavBar from "./components/NavBar";
import Blogs from "./components/Blogs";

export const AppContext = createContext();

function App() {
  //Input params.
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");

  //Navbar params.
  const [nav, setNav] = useState(false);

  function handleShowInput() {
    setShowInput(true);
  }

  return (
    <div>
      <AppContext.Provider
        value={{ handleShowInput, input, setInput, nav, setNav }}
      >
        <Header />
        <NavBar />
        {showInput && <InputSearch />}
        <Blogs />
        <AddNewBlogBtn />
      </AppContext.Provider>
    </div>
  );
}

export default App;
