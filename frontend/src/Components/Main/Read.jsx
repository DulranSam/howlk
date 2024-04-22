/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Axios from "axios";

const Read = () => {
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const { more } = useParams();
  const [gotBack, setGotBack] = useState([]);

  async function fetchMore() {
    try {
      setLoading(true);
      await Axios.post(`${BASE}/mains/read`, more).then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setGotBack(response.data);
        } else if (response.status === 404) {
          setGotBack([]);
        } else {
          setStatus("Error!");
        }
      });
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
      <h1>{more}</h1>
      <div className="container">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            {gotBack && gotBack.length ? (
              gotBack.map((x) => (
                <div key={x._id} className="featured-item">
                  <Link to={`/read/${x.heading}`}>{x.heading}</Link>
                  <p className="pre-desc">{x.preDesc}</p>
                  <ul className="content-list">
                    {x.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="post-desc">{x.postDesc}</p>
                  <p className="category">{x.category}</p>
                  {/* <Link to={`/search/${x.heading}`}>{`Click here to learn about ${x.heading}`}</Link> */}
                </div>
              ))
            ) : (
              <p>No results found!</p>
            )}
          </div>
        )}
      </div>
      {/* <p>{status}</p> */}
    </div>
  );
};

export default Read;
