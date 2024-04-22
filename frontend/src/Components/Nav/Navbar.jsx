/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { UserContext } from "../../App";

const Navbar = () => {
  const { admin, isLogged } = useContext(UserContext);

  return admin ? (
    <div className="nav">
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {/* <li>
          <Link to={"/starters"}>Starters</Link>
        </li> */}
        <li>
          <Link to={"/addContent"}>Add Content</Link>
        </li>
        <li>
          <Link to={"/courses"}>Courses</Link>
        </li>
        <li>
          <Link to={"/addcourses"}>Add Courses</Link>
        </li>
      </ul>
    </div>
  ) : (
    <div className="nav">
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {!isLogged && (
          <div>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
          </div>
        )}
        <li>
          <Link to={"/courses"}>Courses</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
