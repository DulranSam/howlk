/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "./Components/Main/Main";
import Starters from "./Components/Starters/Starters";
import { createContext, useState } from "react";
import AddContent from "./Components/AddContent/AddContent";
import Unknown from "./Components/Misc/Unknown";
import Courses from "./Components/Courses/Courses";
import AddCourses from "./Components/Courses/AddCourses.jsx/AddCourses";
import IDWise from "./Components/IDWise/IDWise";
import Search from "./Components/Search/Search";
import Navbar from "./Components/Nav/Navbar";
import SpecificCourse from "./Components/Courses/SpecificCourse";
export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(true);

  const BASE = "http://localhost:8000";

  const theStates = {
    loading,
    setLoading,
    status,
    setStatus,
    user,
    setUser,
    BASE,
    isLogged,
    setIsLogged,
  };

  return (
    <>
      <UserContext.Provider value={theStates}>
        <BrowserRouter>
          <Search />
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/starters" element={<Starters />}></Route>
            <Route path="/search/:search" element={<IDWise />}></Route>
            <Route path="/addContent" element={<AddContent />}></Route>
            <Route path="/courses" element={isLogged && <Courses />}></Route>
            <Route
              path="/courses/:theCourse"
              element={<SpecificCourse />}
            ></Route>
            <Route path="/addcourses" element={<AddCourses />}></Route>
            <Route path="*" element={<Unknown />}></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
