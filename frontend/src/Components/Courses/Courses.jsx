/* eslint-disable no-unused-vars */
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

const Courses = () => {
  const { loading, setLoading, status, setStatus, BASE } = useContext(UserContext);
  const [resources, setResources] = useState([]);

  async function fetchCourses() {
    try {
      setLoading(true);
      const outcome = await Axios.get(`${BASE}/courses`);
      if (outcome.status === 200) {
        setResources(outcome.data);
        console.log(outcome.data);
      }
    } catch (err) {
      if (err.response.status === 404) {
        setStatus("No results found!");
      }
      console.error(err);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div style={{ margin: "40px" }}>
      <h1>Courses</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className="data">
            {resources && resources.length > 0 ? (
              resources.map((x) => (
                <div key={x._id} className="comp" style={{margin:"40px",paddingTop:"60px"}}>
                  <h1>{x.title}</h1>
                  <h2>{x.description}</h2>
                  <Link to={`/courses/${x.title}`}>{`Learn more about ${x.title}`}</Link>
                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
          <p>{status}</p>
          <Link to={"/addcourses"}>Add Courses</Link>
        </div>
      )}
    </div>
  );
};

export default Courses;
