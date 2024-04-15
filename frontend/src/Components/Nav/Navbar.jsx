import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="nav">
      <ul>
        <li><Link to={"/"}>Home</Link></li>
        <li><Link to={"/starters"}>Starters</Link></li>
        <li><Link to={"/addContent"}>Add Content</Link></li>
        <li><Link to={"/courses"}>Courses</Link></li>
        <li><Link to={"/addcourses"}>Add Courses</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
