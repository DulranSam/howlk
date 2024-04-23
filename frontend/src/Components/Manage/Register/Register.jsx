/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { loading, setLoading, status, setStatus, BASE, setIsLogged } =
    useContext(UserContext);
  const [creds, setCreds] = useState({
    username: "",
    password: "",
    mail:"",
    admin: false,
  });

  useEffect(()=>{
    console.log(`${creds.admin ? "Admin" : "Not"}`)
  },[creds.admin])

  const navigator = useNavigate();

  async function userRegister(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/register`, { creds });
      if (response.status === 201) {
        setStatus("Registration Complete, Please login to continue!");
        setTimeout(() => {
          navigator("/login");
          setStatus("");
        }, 1200);
      }
    } catch (err) {
      setStatus("Error registering user");
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
          <input
            onChange={handleChange}
            name="mail"
            placeholder="Enter mail..."
          ></input>
          <button
            onClick={(e) => {
              e.preventDefault();
              setCreds({ ...creds, admin: !creds.admin });
            }}
            disabled={loading}
          >
            {creds.admin ? <h2>Not an admin</h2> : <h1>Admin</h1>}
          </button>

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
