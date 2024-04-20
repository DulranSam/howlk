/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Axios from "axios";

const SearchedUp = () => {
  const { loading, setLoading, setStatus, BASE } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const { within } = useParams();

  async function connectWithData() {
    try {
      //
      setLoading(true);
      await Axios.post(`${BASE}/search`, within).then((response) => {
        if (response.status === 200) {
          setResult(response.data);
        }
      });
    } catch (err) {
      if (err.status === 404) {
        setStatus("No results found");
      }
      console.error(err);
    } finally {
      setLoading(false);
      //
    }
  }

  useEffect(() => {
    connectWithData();
  }, []);

  return (
    <div>
      <h1>Results</h1>
      {loading && <h1>Loading...</h1>}

      <div className="results" style={{ margin: "40px" }}>
        {result && result.length ? (
          JSON.stringify(result)
        ) : (
          <h1>No results found</h1>
        )}
        <p>{JSON.stringify(result)}</p> {/**Temp */}
      </div>
    </div>
  );
};

export default SearchedUp;
