/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./Main.css";

const Main = () => {
  const { loading, setLoading, BASE, status, setStatus, admin, user } =
    useContext(UserContext);
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
      <h1 className="title">
        {user?.username ? (
          <h3>{`Welcome back ${user.username}`}</h3>
        ) : (
          <div>
            <h3>Welcome to Hustle.LK 🚀 </h3>{" "}
            <div className="our-goal">
              <p>
                Our goal is to bring light to undiscovered ways of making extra
                💸 and spread awareness!
              </p>
            </div>
          </div>
        )}
      </h1>

      <div className="content-container">
        {admin && (
          <Link to={"/addContent"} className="add-resources-link">
            Add Resources
          </Link>
        )}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <div className="featured">
              <h2>Featured</h2>
              {data && data.length ? (
                data.map((x) => (
                  <div key={x._id} className="featured-item">
                    <Link to={`/read/${x.heading}`}>{x.heading}</Link>
                    <p className="mini-desc">{x.miniDesc}</p>
                    {/* <p className="category">{x.category}</p> */}
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
                  <div key={item._id} className="featured-item">
                    <Link to={`/read/${item.heading}`}>{item.heading}</Link>
                    <p className="mini-desc">{item.miniDesc}</p>
                    {/* <p className="category">{item.category}</p> */}
                  </div>
                ))
              ) : (
                <p>No results found!</p>
              )}
            </div>
          </div>
        )}
      <div className="discord" style={{margin:"40px"}}>   {!user && <h1>Login to join our discord server 🚀</h1>}
        <Link to={"https://discord.gg/y73z2Vjw"}>{user && `${`Click here to join the discord community 🚀`}`}</Link></div>
        {/* <p>{status}</p> */}
      </div>
    </div>
  );
};

export default Main;
