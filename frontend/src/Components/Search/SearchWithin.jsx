/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const SearchWithin = () => {
  const { loading, setLoading} =
    useContext(UserContext);

  const [within, setWithin] = useState("");

  const navigator = useNavigate();

  async function SearchWithin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      navigator(`/searched/${within}`)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Search Within</h1>
      <form onSubmit={SearchWithin}>
        <input
          onChange={(e) => {
            setWithin(e.target.value);
          }}
          placeholder="Search Here..."
        ></input>
        <button type="submit" disabled={loading}>
          Search...
        </button>
      </form>

    </div>
  );
};

export default SearchWithin;
