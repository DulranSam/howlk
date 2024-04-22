/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { UserContext } from "../../../App";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, setLoading, status, setStatus, BASE, setUser,user, setIsLogged,setAdmin } =
    useContext(UserContext);
  const [creds, setCreds] = useState({ username: "", password: "" });
  const navigator = useNavigate();

  async function userLogin(e) {
    e.preventDefault();
    try {
      setStatus("");
      setLoading(true);
      const response = await Axios.post(`${BASE}/login`, creds);
      if (response.status === 200) {
        console.log(response.data.user.username);
        setUser(response?.data?.user);
        if (response?.data?.admin === true) {
          setAdmin(true);
        }
        setIsLogged(true);
        setStatus(`${response.data.user.username} Logged in!`);
        setTimeout(() => {
          navigator("/")
        }, 1200);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
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
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={userLogin}>
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
            Login
          </button>
        </form>
        <h2>{status}</h2>
      </div>
    </div>
  );
};

export default Login;
