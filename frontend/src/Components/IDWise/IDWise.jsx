/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Axios from "axios";

const IDWise = () => {
  const { loading, setLoading, status, setStatus, BASE } = useContext(UserContext);
  const { search } = useParams();
  const [data, setData] = useState({});

  async function fetchIDWise() {
    try {
      setLoading(true);
      const decodedSearch = decodeURIComponent(search); // Decode the search parameter
      const response = await Axios.post(`${BASE}/search/${decodedSearch}`);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err) {
      setStatus(err.response.data.error);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIDWise();
  }, []);

  return search !== "" ? (
    <div>
      <div className="main-container">
        <h1>Search</h1>
      </div>
      {loading ? "Loading..." : <p>{data.Output}</p>}
      <p>{status}</p>
    </div>
  ) : navigator("/");
};

export default IDWise;
