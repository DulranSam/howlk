/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { Link } from "react-router-dom";

const Main = () => {
  const { loading, setLoading, BASE, status, setStatus } =
    useContext(UserContext);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  async function fetch() {
    try {
      setLoading(true);
      const response = await Axios.get(`${BASE}/mains`);
      if (response.status === 200) {
        console.log(response.data);
        setData(response.data);
      }
    } catch (err) {
      if (err.status === 404) {
        setStatus("No results found!");
      } else {
        setStatus("Error!");
      }
    } finally {
      setLoading(false);
    }
  }

  async function fetch2() {
    try {
      setLoading(true);
      const response = await Axios.get(`${BASE}/mains/sides`);
      if (response.status === 200) {
        setData2(response.data);
      }
    } catch (err) {
      if (err.status === 404) {
        setStatus("No results found!");
      } else {
        setStatus("Error!");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch();
    fetch2();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to How.LK</h1>
      <div
        style={{
          marginTop: "120px",
          marginLeft: "40px",
          padding: "20px",
        }}
      >
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <div className="featured">
              <h1>Featured</h1>
              {data && data.length
                ? data.map((x) => {
                    <div key={x._id}>
                      <h1>{x.heading}</h1>
                      <div className="pre-Desc">
                        <p>{x.preDesc}</p>
                      </div>
                      <div className="content">
                        {x.content.map((x) => {
                          return x;
                        })}
                      </div>
                      <div className="post-Desc">
                        <p>{x.postDesc}</p>
                      </div>
                      <p>{x.category}</p>
                    </div>;
                  })
                : "No results found!"}
              <Link
                to={`/${"theID"}`}
              >{`Click here to learn about ${"the name"}`}</Link>
            </div>

            <div className="sides">
              <h1>Side Hustles</h1>
              {data2 && data2.length
                ? JSON.stringify(data2)
                : "No results found!"}
              <Link
                to={`/${"theID"}`}
              >{`Click here to learn about ${"the name"}`}</Link>
            </div>
          </div>
        )}
        {/* <p>{status}</p> */}
        <Link to={"/addContent"}>Add Resources</Link>
      </div>
    </div>
  );
};

export default Main;
