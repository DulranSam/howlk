/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { loading, setLoading, status, setStatus,  user , setUser,setIsLogged} =
    useContext(UserContext);
  const navigator = useNavigate();

  async function fetchMe() {
    try {
      setLoading(true);
      if (!user) {
        navigator("/");
        setStatus("No user");
      }
    } catch (err) {
      console.log("No user");
    } finally {
      setLoading(false);
    }
  }


  async function LogOut(e){e.preventDefault();if(user.username){setUser({});setIsLogged(false);navigator("/")}}

  useEffect(() => {
    fetchMe();
  }, [user.username]);

  return (
    <div>
      <h1>Profile</h1>
      <h2>{loading && "Loading..."}</h2>
      <div className="profile">
        <h1>{user.username}</h1>
        {/* <p>{user.password}</p> */}
        <img src={user.pfp}></img>
      </div>
      <button onClick={LogOut}>Log Out</button>
      {/* <p>{status}</p> */}
    </div>
  );
};

export default Profile;
