import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Avatar, Button } from "@mui/material";
import { AuthContext } from "../../context/AuthContext.jsx"
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar.jsx";

function Home(){
  //const navigate = useNavigate()
  const [error, setError] = useState("");

  const {userData, setUserData, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/home", { withCredentials: true });
        return setUserData(res.data);
      } catch (err) {
        return setError(err.response?.data?.msg);
        //navigate("/login")
      }
    };

    fetchUser();
  }, []);

  const firstLetter = userData?.name?.charAt(0)?.toUpperCase();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      {!error ? (
        <Navbar />
      ) : (<p style={{ color: "red",fontFamily : "Epilogue" }}>{error}</p>)}

      {userData ? (
        <>
          <h2 style={{ fontFamily: "Epilogue", color: "rgb(43, 73, 149)" }}>Welcome, {userData.name} 👋</h2> 
          <h3 style={{ fontFamily: "Epilogue", color: "rgb(43, 73, 149)" }}> your Email id : {userData.email}</h3>
        </>
      ) : (null)}
      

      
    </div>
  );
};

export default Home