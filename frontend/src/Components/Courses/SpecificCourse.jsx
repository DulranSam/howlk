/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Axios from "axios";

const SpecificCourse = () => {
  const { theCourse } = useParams();
  const { loading, setLoading, BASE, status, setStatus } = useContext(
    UserContext
  );
  const [courseData, setCourseData] = useState([]);
  const [videoPlayer, setVideoPlayer] = useState(null);

  async function fetchCourseData() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/courses/theCourse`, {
        theID: theCourse,
      }); //2nd route in courses.js
      if (response.status === 200) {
        setCourseData(response.data);
        setStatus("Done!");
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
    fetchCourseData();
  }, []);

  // Function to play or pause the video
  const togglePlayPause = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };

  return (
    <div>
      <div className="sub">{loading && <h1>Loading...</h1>}</div>

      <div className="container">
        {courseData.map((course, index) => (
          <div key={course._id}>
            <div className="side">
              <h1>{course.title}</h1>
              <span>
                <h2>{course.description}</h2>
              </span>
            </div>
            <div className="video">
              <video
                ref={(ref) => setVideoPlayer(ref)}
                controls
                width="600"
                height="400"
              >
                <source src={course.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button onClick={togglePlayPause}>
                {videoPlayer && videoPlayer.paused ? "Play" : "Pause"}
              </button>
            </div>
          </div>
        ))}
        <p>{status}</p>
      </div>
    </div>
  );
};

export default SpecificCourse;
