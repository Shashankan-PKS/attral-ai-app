import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ResetPassContext = createContext();

export const ResetPassProvider = ({ children }) => {

    const [vemail, setVEmail ] = useState("");
    const [verror, setVError] = useState("");
    const [otp, setOtp] = useState("");
    const [npass, setNPass] = useState("");
    const [cpass, setCPass] = useState("");
    

    const verifyEmail = async (vemail) => {
        const res = await axios.post("http://localhost:4000/api/verifyemail", { vemail }, { withCredentials: true });
        return res.data; // ✅ return response
    }

    const verifyotp = async (vemail, otp ) => {
        const res = await axios.post("http://localhost:4000/api/verifyotp", { vemail, otp }, { withCredentials: true });
        return res.data;
    }

    const changePassword = async ( npass,cpass) => {
        const res = await axios.patch("http://localhost:4000/api/resetpassword", { npass,cpass }, { withCredentials: true });
        return res.data;
    }

    return (
        <>
            <ResetPassContext.Provider value={{vemail, setVEmail, verifyEmail, verror,setVError,otp,setOtp, verifyotp, npass, setNPass, cpass, setCPass, changePassword}}>
                {children}
            </ResetPassContext.Provider>
        </>
    )
}



