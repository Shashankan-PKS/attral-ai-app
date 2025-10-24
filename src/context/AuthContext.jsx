import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:4000/api/login", { email, password }, { withCredentials: true });
    setUserData(res.data.details)
    return res.data
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:4000/api/logout", {}, { withCredentials: true });
      setUserData(null);
      navigate("/login");
    } catch (err) {
      console.log("Logout failed:", err);
    }
  }

  return (
    <AuthContext.Provider value={{ email, password, setEmail, setPassword, login, logout, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
