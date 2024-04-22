/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
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
      await Axios.post(`${BASE}/more`, more).then((response) => {
        if (response.status === 200) {
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

  return (
    <div>
      <h1>{more}</h1>
      <div className="container">
        {gotBack && gotBack.length ? (
          JSON.stringify(gotBack)
        ) : (
          <h1>No results found</h1>
        )}
      </div>
      {/* <p>{status}</p> */}
    </div>
  );
};

export default Read;
