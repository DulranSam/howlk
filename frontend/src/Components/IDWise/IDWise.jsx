/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Axios from "axios";

const IDWise = () => {
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const { search } = useParams();
  const [output, setOutput] = useState({});

  async function FetchIDWise() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/search/${search}`);
      console.log(response.data);
      if (response.status === 200) {
        setOutput(response.data);
        console.log(response.data);
        //
      }
    } catch (err) {
     setStatus(err.response.data.error);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    FetchIDWise();
  }, []);

  return (
    <div>
      <div className="main-container">
        <h1>Search</h1>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <div className="output">
            {output && output.length ? (
              output.Output
            ) : (
              <h1>No results found </h1>
            )}
          </div>
          <h1>{search}</h1>
          <p>{status}</p>
        </div>
      )}
    </div>
  );
};

export default IDWise;
