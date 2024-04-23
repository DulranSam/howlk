/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { UserContext } from "../../../App";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    loading,
    setLoading,
    status,
    setStatus,
    BASE,
    setUser,
    user,
    setIsLogged,
    setAdmin,
  } = useContext(UserContext);
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
          navigator("/");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2>{loading && "Loading..."}</h2>
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={userLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              onChange={handleChange}
              name="username"
              placeholder="Enter username..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter password..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">{status}</p>
          <Link to="/register" className="text-blue-500 hover:underline">
            {" "}
            Not registered?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
