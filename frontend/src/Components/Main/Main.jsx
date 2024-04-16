/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./Main.css";

const Main = () => {
  const { loading, setLoading, BASE, status, setStatus } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await Axios.get(`${BASE}/mains`);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err) {
      if (err.response.status === 404) {
        setStatus("No results found!");
      } else {
        setStatus("Error!");
      }
    } finally {
      setLoading(false);
    }
  }

  async function fetchData2() {
    try {
      setLoading(true);
      const response = await Axios.get(`${BASE}/mains/sides`);
      if (response.status === 200) {
        setData2(response.data);
      }
    } catch (err) {
      if (err.response.status === 404) {
        setStatus("No results found!");
      } else {
        setStatus("Error!");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Welcome to How.LK</h1>
      <div className="content-container">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <div className="featured">
              <h2>Featured</h2>
              {data && data.length ? (
                data.map((x) => (
                  <div key={x._id} className="featured-item">
                    <h3>{x.heading}</h3>
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
            <div className="side-hustles">
              <h2>Side Hustles</h2>
              {data2 && data2.length ? (
                data2.map((item, index) => (
                  <div key={index} className="side-hustle-item">
                    <h3>{item.heading}</h3>
                    <p className="pre-desc">{item.preDesc}</p>
                    <ul className="content-list">
                      {item.content.map((x, index) => (
                        <li key={index}>{x}</li>
                      ))}
                    </ul>
                    <p className="post-desc">{item.postDesc}</p>
                    <p className="category">{item.category}</p>
                    {/* <Link to={`/search/${item.heading}`}>{`Click here to learn about ${item.heading}`}</Link> */}
                  </div>
                ))
              ) : (
                <p>No results found!</p>
              )}
            </div>
          </div>
        )}
        {/* <p>{status}</p> */}
        <Link to={"/addContent"} className="add-resources-link">Add Resources</Link>
      </div>
    </div>
  );
};

export default Main;
