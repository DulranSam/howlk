/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";

const Search = () => {
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const [search, setSearch] = useState("");
  const [outcome, setOutcome] = useState([]);

  let searchCounter = 0;

  async function SearchUp(e) {
    e.preventDefault();
    setStatus("");
    try {
      setLoading(true);
      const request = await Axios.post(`${BASE}/search`, search);
      if (request.status === 200) {
        setOutcome(request.data);
        setStatus("Searching!");
        searchCounter++;
      }
    } catch (err) {
      if (err.status === 404) {
        setStatus("No results found");
      }
      console.error(err);
    } finally {
      setLoading(false);
      searchRef.current.value = "";
    }
  }

  const searchRef = useRef();

  return (
    <div>
      <div className="search">
        <form onSubmit={SearchUp}>
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search..."
            type="text"
            ref={searchRef}
          ></input>
          <button type="submit" disabled={loading}>
            Search
          </button>
        </form>
      </div>
      <div className="data">
        {outcome && outcome.length ? (
          JSON.stringify(outcome)
        ) : searchCounter !== 0 ? (
          <h1>No results found</h1>
        ) : null}
      </div>
      {/* <p>{status}</p> */}
    </div>
  );
};

export default Search;
