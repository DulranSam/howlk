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
  const [courseData, setCourseData] = useState({});
  const [videoPlayer, setVideoPlayer] = useState(null);

  async function SpecificallyCourses() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/courses/theCourse`, {
        theID: theCourse,
      }); //2nd route in courses.js
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
      <h1>{theCourse}</h1>
      <div className="container">
        {courseData && courseData.length ? (
          <div>
            <div className="side">
              <span>
                <label>{courseData.title}</label>
                <label>{courseData.description}</label>
              </span>
            </div>
            <div className="video">
              <video
                ref={(ref) => setVideoPlayer(ref)}
                controls
                width="600"
                height="400"
              >
                <source src={courseData.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button onClick={togglePlayPause}>
                {videoPlayer && videoPlayer.paused ? "Play" : "Pause"}
              </button>
            </div>
          </div>
        ) : (
          <h1>No results found</h1>
        )}
      </div>
    </div>
  );
};

export default SpecificCourse;
