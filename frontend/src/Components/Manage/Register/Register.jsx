/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { UserContext } from "../../../App";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const [creds, setCreds] = useState({ username: "", password: "" });
  const navigator = useNavigate();

  async function userRegister(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await Axios.post(`${BASE}/register`, creds).then((response) => {
        if (response.status === 200) {
          navigator("/login");
          setStatus("Registration Complete , Please login to continue!")
        }
      });
    } catch (err) {
      if (err.status === 404) {
        setStatus("Wrong Credentials");
      } else {
        setStatus("Error");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="Register">
        <h1>Register</h1>
        <form onSubmit={userRegister}>
          <input
            onChange={handleChange}
            name="username"
            placeholder="Enter username..."
          ></input>
          <input
            onChange={handleChange}
            name="password"
            placeholder="Enter password..."
          ></input>
          <button type="submit" disabled={loading}>
            Register
          </button>
        </form>
        <h2>{status}</h2>
      </div>
    </div>
  );
};

export default Register;
