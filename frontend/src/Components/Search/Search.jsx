/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const [search, setSearch] = useState("");
  const navigator = useNavigate();

  async function SearchUp(e) {
    e.preventDefault();
    setStatus("");
    try {
      setLoading(true);
      navigator(`/search/${search}`)
    } catch (err) {
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
      <p>{status}</p>
    </div>
  );
};

export default Search;
