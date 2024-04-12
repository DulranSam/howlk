/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

const Courses = () => {
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const [resources, setResources] = useState([]);

  async function FetchCourses() {
    try {
      const outcome = await Axios.get(`${BASE}/courses`);
      if (outcome.status === 200) {
        setResources(outcome.data);
        console.log(outcome.data);
      }
    } catch (err) {
      if (err.status === 404) {
        setStatus("No results found!");
      }
      console.error(err);
    }
  }

  useEffect(() => {
    FetchCourses();
  }, []);

  return (
    <div style={{margin:"40px"}}>
      <h1>Courses</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className="data">
            {resources && resources.length
              ? JSON.stringify(resources)
              : "No results found"}
          </div>
          <p>{JSON.stringify(resources)}</p>
          <p>{status}</p>
          <Link to={"/addcourses"}>Add Courses</Link>
        </div>
      )}
    </div>
  );
};

export default Courses;
