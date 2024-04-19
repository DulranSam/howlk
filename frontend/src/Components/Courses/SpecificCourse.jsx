/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Axios from "axios";

const SpecificCourse = () => {
  const { theCourse } = useParams();
  const { loading, setLoading, BASE, status, setStatus } =
    useContext(UserContext);
  const [courseData, setCourseData] = useState([]);

  async function SpecificallyCourses() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/courses/theCourse`,{theID:theCourse}); //2nd route in courses.js
      if (response.status === 200) {
        setCourseData(response.data);
        setStatus("Done!");
        console.log(response.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setStatus("Not found");
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }
  

  useEffect(() => {
    SpecificallyCourses();
  }, []);

  return (
    <div>
      <div className="sub">
        {/* {loading ? <h1>Loading...</h1> : <h1>{theCourse}</h1>} */}
      </div>
      <h2>{theCourse}</h2>
      <div className="container">
        {courseData && courseData.length ? (
          JSON.stringify(courseData)
        ) : (
          <h1>No results found</h1>
        )}
      </div>
    </div>
  );
};

export default SpecificCourse;
