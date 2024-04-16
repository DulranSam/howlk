/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Axios from "axios";

const SpecificCourse = () => {
  const { theCourse } = useParams();
  const { loading, setLoading, BASE, status, setStatus } =
    useContext(UserContext);

  async function SpecificallyCourses() {
    try {
      setLoading(true);
      const response = await Axios.post(
        `${BASE}/courses/${{ courses: theCourse }}`
      );
      if (response.status === 200) {
        setStatus("Done!");
      }
    } catch (err) {
      if(err.status===404){
        setStatus("Not found")
      }
      console.error(err);
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
        {loading ? <h1>Loading...</h1> : <h1>{theCourse}</h1>}
      </div>
      <h2>{theCourse}</h2>
      <h1>{status}</h1>
    </div>
  );
};

export default SpecificCourse;
