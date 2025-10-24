import { Box, Button, TextField, Typography, IconButton, InputAdornment,Snackbar } from "@mui/material"
import MuiAlert from "@mui/material/Alert";
import './SignIn.css'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import AppleIcon from '@mui/icons-material/Apple';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from '../../assets/png_facebook_logos_63880.png'
import axios from 'axios'
import { AuthContext } from "../../context/AuthContext";

function SignIn(){

    const [showPass, setShowPass] = useState(false);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    const { email,  password, setEmail, setPassword, login } = useContext(AuthContext)

    const navigate = useNavigate();
    
    const emailRegex = /^[\w.]+@[a-zA-Z]+\.[a-z]{2,5}$/;

    const handleSignIn = async (e) => {
        e.preventDefault();

        try{
            const res = await login( email, password);
            setSeverity("success");
            setMessage(res.msg );
            setOpen(true);
            setEmail("");
            setPassword("");
            setTimeout(() => navigate("/home"), 2500);
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
            <div className="sicontent">
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
                                <Typography sx={{color : "rgb(43, 73, 149)",fontFamily: "Epilogue"}}>Powered by <span style={{fontWeight: "800"}}> Facebook </span></Typography>
                            </Box>   
                       
                    </Box>
                    <Box className="siContainer" sx={{ flex: 1,display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",}}>
                        <Box style={{ textAlign : "center", padding : "100px 20px 20px 20px"}}>
                            <Typography variant="h3" component="p" style={{ color: "rgba(227, 235, 255, 1)", fontSize : "40px" , fontWeight : "700" ,fontFamily : "Times new roman"}}> Sign in</Typography>
                        </Box>
                        <Box style={{ width : "70%"}}>
                            <TextField style={{marginBottom : "20px"}} value={email} onChange={(e) => setEmail(e.target.value)} InputProps={{
                                sx: {
                                    borderRadius: "25px", 
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue"
                                }
                            }} fullWidth placeholder="Enter your email Id" />

                            <TextField style={{marginBottom : "20px"}} value={password} onChange={(e) => setPassword(e.target.value)} InputProps={{endAdornment: (
                                <InputAdornment position="end"> 
                                    <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                                        {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>),
                                sx: {
                                    borderRadius: "25px", 
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue"
                                }
                            }} 
                            fullWidth placeholder="Enter your Password" type={ showPass ? "text" : "password"} />
                        </Box>
                        <Box style={{padding : "20px"}}>
                            <Link style={{ fontFamily: "Epilogue", color : "rgba(227, 235, 255, 1)", textDecoration: "none", cursor:"pointer"}} to="/forgot-password"> Forgot Password ?</Link>
                        </Box>
                        <Box style={{textAlign: "center",justifyItems : "center"}}>
                            <Button onClick={handleSignIn} style={{ textTransform : "capitalize", fontFamily : "Epilogue" , backgroundColor : "rgba(227, 235, 255, 1)", color : "#0D1B4C", width:"150px", height:"50px", borderRadius: " 30px",fontSize:"15px"}}>Sign in</Button>
                        </Box>
                        <Box style={{textAlign: "center",justifyItems : "center", padding : "20px"}}>
                            <Typography> or Signin with</Typography>
                            <Box  style={{display: "flex", textAlign: "center", gap:"8px", padding : "20px"}}>
                                <Button disableRipple disableElevation style={{backgroundColor : "rgb(43, 73, 149)", color : "rgba(227, 235, 255, 1)",}}><GoogleIcon  /></Button>
                                <Button disableRipple disableElevation style={{backgroundColor : "rgb(43, 73, 149)", color : "rgba(227, 235, 255, 1)",}}><FacebookRoundedIcon /></Button>
                                <Button disableRipple disableElevation style={{backgroundColor : "rgb(43, 73, 149)", color : "rgba(227, 235, 255, 1)",}}><AppleIcon /></Button>
                            </Box>
                        </Box>
                        <Box style={{textAlign: "center",justifyItems : "center", padding : "20px"}}>
                            <Typography> don't have an account? <Link style={{ color : "rgba(227, 235, 255, 1)", textDecoration: "none", cursor:"pointer"}} to="/register">Sign up</Link></Typography>
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

export default SignIn