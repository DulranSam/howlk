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
  const [output, setOutput] = useState([]);

  async function FetchIDWise() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/search`, search);
      if (response.status === 200) {
        setOutput(response.data);
        console.log(response.data);
        //
      }
    } catch (err) {
      if (err.status === 404) {
        setStatus("No results found");
      }
      console.error(err);
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
              JSON.stringify(output)
            ) : (
              <h1>No results found </h1>
            )}
          </div>

          <p>{status}</p>
        </div>
      )}
    </div>
  );
};

export default IDWise;
