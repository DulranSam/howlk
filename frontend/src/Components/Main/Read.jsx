/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Axios from "axios";

const Read = () => {
  const { loading, setLoading, BASE } = useContext(UserContext);
  const { more } = useParams();
  const [data, setData] = useState({});

  async function fetchMore() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/mains/read`, { more });
      if (response.status === 200) {
        console.log(response.data);
        setData(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMore();
  }, []);

  return (
    <div>
      <div className="container">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            {data ? (
              <div key={data._id} className="featured-item">
                <h1>{data.heading}</h1>
                <p className="pre-desc">{data.preDesc}</p>

                {/* Render data.content if it's an array */}
                <div>
                  {" "}
                  <ul className="content-list">{data.content}</ul>
                </div>

                <p className="post-desc">{data.postDesc}</p>
                {/* Render data.category if it's present */}
                <p className="category">{data.category==="main" ? "Main Hustle" : "Side Hustle"}</p>
              </div>
            ) : (
              <p>No results found!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Read;
