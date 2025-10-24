import { Box, Button, TextField, Typography, IconButton, InputAdornment,Snackbar  } from "@mui/material"
import MuiAlert from "@mui/material/Alert";
import './ForgotPassword.css'
import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from '../../assets/png_facebook_logos_63880.png'
import { ResetPassContext } from "../../context/ResetPasswordContext";
import axios from "axios";

function VerifyOtp(){

    const {vemail, setVEmail, otp, setOtp, verifyotp} = useContext(ResetPassContext)
    const navigate = useNavigate()
    
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    
    
    useEffect(() => {
        const fetchEmail = async () => {
            try {
            const res = await axios.get(
                "http://localhost:4000/api/getEmailFromToken", { withCredentials: true });
            setVEmail(res.data.email);
            return
            } catch (err) {
            console.log(err); // for debugging
            navigate("/forgot-password"); // redirect if token invalid
            }
        };

        fetchEmail();
    }, []);


    const handleSubmit = async () => {
        try{
            const res = await verifyotp(vemail,otp);
            setSeverity("success");
            setMessage(res.msg );
            setOpen(true);
            setTimeout(() => navigate("/change-password"), 2500);
        }catch(err){
            const errorMsg = err.response?.data?.msg ;
            setMessage(errorMsg );
            setSeverity("error");
            setOpen(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };


    return(
        <>
            <div className="fpcontent">
                <Box sx={{display : "flex",alignItems: "center",justifyContent: "center" , height:"80vh" }}>
                    <Box sx={{ flex: 1, display: "flex",flexDirection : "column",textAlign: "center",alignItems: "center",justifyContent: "space-between",height: "90vh",
                        "@media (max-width:950px)": {
                            display: "none", 
                        },
                        }}>
                        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <img src={logo} alt="Logo" style={{width : "800px",  maxWidth: "90%" }}/>
                        </Box>
                        <Box  sx={{ paddingBottom: "10px" }}>
                            <Typography sx={{color : "rgb(25, 42, 86)",fontFamily: "Epilogue"}}>Powered by <span sx={{fontWeight: "800"}}> Techbrain Networks </span></Typography>
                        </Box>    
                        
                    </Box>
                    <Box className="fpContainer" sx={{ flex: 1,display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",}}>
                        <Box sx={{ textAlign : "center", padding : "100px 20px 20px 20px"}}>
                            <Typography variant="h4" component="p" sx={{ color: "rgba(227, 235, 255, 1)", fontSize : "40px" , fontWeight : "700" ,fontFamily : "Times new roman","@media (max-width:550px)": {
                                fontSize : "25px"
                            },}}> Enter the 6-digit code  </Typography>
                            <Typography sx={{fontFamily: "Epilogue", color : "rgba(227, 235, 255, 1)",padding : "10px"}}> Otp has been sent to your email : {vemail} </Typography>

                        </Box>
                        <Box sx={{ width : "70%", "@media (max-width:550px)": {
                            width : "90%"
                        },"@media (max-width:420px)": {
                            width : "100%"
                        },}}>

                            <TextField sx={{marginBottom : "20px"}} value={otp} InputProps={{
                                sx: {
                                    borderRadius: "30px",
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue"
                                }
                            }} 
                            fullWidth placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />
                        </Box>
                        <Box sx={{padding : "20px"}}>
                            <Link style={{ fontFamily: "Epilogue", color : "rgba(227, 235, 255, 1)", textDecoration: "none", cursor:"pointer"}} to="/"> Resend Otp ?</Link>
                        </Box>
                        <Box sx={{textAlign: "center",justifyItems : "center", padding : "20px"}}>
                            <Typography sx={{ color : "rgba(239, 244, 255, 1)",padding : "10px", fontFamily: "Epilogue", fontSize : "15px"}}>Timer for entering the OTP code</Typography>
                            <Button onClick={handleSubmit} sx={{ textTransform : "capitalize", fontFamily : "Epilogue" , backgroundColor : "rgba(227, 235, 255, 1)", color : "#0D1B4C", width:"150px", height:"50px", borderRadius: " 30px",fontSize:"15px"}}>Submit</Button>
                        </Box>
                    </Box>
                </Box>

                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={handleClose}
                        severity={severity}
                        sx={{ width: "100%" }}
                    >
                        {message}
                    </MuiAlert>
                </Snackbar>
                
            </div>
        </>
    )
}

export default VerifyOtp