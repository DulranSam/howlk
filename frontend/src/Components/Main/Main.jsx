/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { Link } from "react-router-dom";

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
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to How.LK</h1>
      <div style={{ marginTop: "60px", marginLeft: "40px", padding: "20px" }}>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <div className="featured">
              <h1>Featured</h1>
              {data && data.length ? (
                data.map((x) => (
                  <div key={x._id}>
                    <h1>{x.heading}</h1>
                    <div className="pre-Desc">
                      <p>{x.preDesc}</p>
                    </div>
                    <div className="content" style={{listStyleType:"number"}}>
                      {x.content.map((item, index) => (
                        <ul key={index}><li>{item}</li></ul>
                      ))}
                    </div>
                    <div className="post-Desc">
                      <p>{x.postDesc}</p>
                    </div>
                    <p>{x.category}</p>
                    {/* <Link to={`/search/${x.heading}`}>{`Click here to learn about ${x.heading}`}</Link> */}
                  </div>
                ))
              ) : (
                <p>No results found!</p>
              )}
            </div>
            <div className="sides" style={{marginTop:"60px"}}>
              <h1>Side Hustles</h1>
              {data2 && data2.length ? (
                data2.map((item, index) => (
                  <div key={index}>
                    <h1>{item.heading}</h1>
                    <p>{item.preDesc}</p>
                    {item.content.map((x)=>{return x})}
                    <p>{item.postDesc}</p>
                    <p>{item.category}</p>
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
        <Link to={"/addContent"}>Add Resources</Link>
      </div>
    </div>
  );
};

export default Main;
