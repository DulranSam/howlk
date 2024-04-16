/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";

const SpecificCourse = () => {
  const { theCourse } = useParams();

  return (
    <div>
      <h1>{theCourse}</h1>
    </div>
  );
};

export default SpecificCourse;
