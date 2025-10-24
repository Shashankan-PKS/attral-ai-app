import { Box, Button, TextField, Typography, IconButton, InputAdornment,Snackbar  } from "@mui/material"
import MuiAlert from "@mui/material/Alert";
import './ForgotPassword.css'
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from '../../assets/png_facebook_logos_63880.png'
import { ResetPassContext } from "../../context/ResetPasswordContext";

function ForgotPassword(){

    const { vemail, setVEmail, verifyEmail } = useContext(ResetPassContext);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    const navigate = useNavigate()


    const handleSubmit = async () => {
        try{
            const res = await verifyEmail(vemail);
            setSeverity("success");
            setMessage(res.msg );
            setOpen(true);
            setVEmail("");
            setTimeout(() => navigate("/verifyOtp"), 2500);
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
                            <Typography sx={{color : "rgb(43, 73, 149)",fontFamily: "Epilogue"}}>Powered by <span sx={{fontWeight: "800"}}> Facebook </span></Typography>
                        </Box>    
                        
                    </Box>
                    <Box className="fpContainer" sx={{ flex: 1,display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center", width : "500px",
                        "@media (max-width:550px)": {
                            width : "400px"
                        },"@media (max-width:420px)": {
                            width : "300px"
                        },"@media (max-width:320px)": {
                            width : "100%"
                        },
                    }}>
                        <Box sx={{ textAlign : "center", padding : "100px 20px 20px 20px"}}>
                            <Typography variant="h4" component="p" sx={{ color: "rgba(227, 235, 255, 1)", fontSize : "40px" , fontWeight : "700" ,fontFamily : "Times new roman","@media (max-width:550px)": {
                            fontSize : "25px"
                        },}} > Password Assistance </Typography>
                        </Box>
                        <Box sx={{ width : "70%", "@media (max-width:550px)": {
                            width : "90%"
                        },"@media (max-width:420px)": {
                            width : "95%"
                        },}}>
                            <TextField sx={{marginBottom : "20px"}} value={vemail} InputProps={{
                                sx: {
                                    borderRadius: "30px", 
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue"
                                }
                            }} fullWidth placeholder="Enter your email ID" onChange={(e) => setVEmail(e.target.value)} />

                        </Box>
                        <Box sx={{ display : "flex" ,flexDirection : "column" ,gap : "10px" , textAlign: "center",justifyItems : "center", padding : "20px"}}>
                            <Button onClick={handleSubmit} sx={{ textTransform : "capitalize", fontFamily : "Epilogue" , backgroundColor : "rgba(227, 235, 255, 1)", color : "rgb(43, 73, 149)", width:"150px", height:"50px", borderRadius: " 30px",fontSize:"15px"}}> Verify </Button>
                            <Button disableRipple disableElevation onClick={() => navigate('/login')} sx={{ textTransform : "capitalize", fontFamily : "Epilogue", backgroundColor : "rgb(43, 73, 149)", color : "rgb(199, 213, 255)"}}>Back</Button>
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

export default ForgotPassword