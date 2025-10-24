import { Box, Button, TextField, Typography, IconButton, InputAdornment,Snackbar } from "@mui/material"
import MuiAlert from "@mui/material/Alert";
import './Signup.css'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import AppleIcon from '@mui/icons-material/Apple';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from '../../assets/png_facebook_logos_63880.png'
import axios from 'axios'


function Signup(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("")
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [cpassError, setCPassError] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [cshowPass, setCShowPass] = useState(false)
    const [open, setOpen] = useState(false); // Snackbar open state
    const [message, setMessage] = useState(""); // Snackbar message
    const [severity, setSeverity] = useState("success"); // success | error | warning | info

    const emailRegex = /^[\w.]+@[a-zA-Z]+\.[a-z]{2,5}$/;          
    const re = /^[A-Za-z\s]*$/;

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post("http://localhost:4000/api/registration", { name, email, password, cpassword });
            setMessage("Registered successfully!");
            setSeverity("success");
            setOpen(true);
            setName("");
            setEmail("");
            setPassword("");
            setCPassword("");
            setTimeout(() => navigate("/login"), 2500);
        } catch (err) {
            const errorMsg =
                err.response?.data?.msg || "Something went wrong. Try again.";
            setMessage(errorMsg);
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
            <div className="sucontent">
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
                            <Typography sx={{color : "rgb(25, 42, 86)",fontFamily: "Epilogue"}}>Powered by <span style={{fontWeight: "800"}}> Facebook </span></Typography>
                        </Box>    
                        
                    </Box>
                    <Box className="suContainer" sx={{ flex: 1,display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",}}>
                        <Box style={{ textAlign : "center",padding: "20px"}}>
                            <Typography variant="h3" component="p" style={{ color: "rgba(227, 235, 255, 1)", fontSize : "40px" , fontWeight : "700" ,fontFamily : "Times new roman"}}> Sign up</Typography>
                        </Box>
                        <Box style={{ width : "70%"}}>
                            <TextField style={{marginBottom : "20px", fontFamily: "Epilogue"}} value={name} error={nameError} InputProps={{
                                sx: {
                                    borderRadius: "25px", 
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue"
                                }
                            }} fullWidth placeholder="Enter your Full Name" onChange={(e) => setName(e.target.value)} 
                            helperText= { nameError ? "Enter the Valid name" : ""}/>
                            <TextField style={{marginBottom : "20px",  fontFamily: "Epilogue"}} value={email} error={emailError} InputProps={{
                                sx: {
                                    borderRadius: "25px",
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue"
                                }
                            }} fullWidth placeholder="Enter your email Id" onChange={(e) => setEmail(e.target.value)}
                            helperText= { emailError ? "Enter the Valid email" : ""} />
                            <TextField style={{marginBottom : "20px",  fontFamily: "Epilogue"}} value={password} InputProps={{endAdornment: (
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
                            }} fullWidth placeholder="Create Password" type={ showPass ? "text" : "password"} 
                            onChange={(e) => setPassword(e.target.value)}/>
                            <TextField style={{marginBottom : "20px", fontFamily: "Epilogue"}} error={cpassError} InputProps={{endAdornment: (
                                <InputAdornment position="end"> 
                                    <IconButton onClick={() => setCShowPass(!cshowPass)} edge="end">
                                        {cshowPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>),
                                sx: {
                                    borderRadius: "25px",
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue"
                                }
                            }} fullWidth placeholder="Confirm Password" type={ cshowPass ? "text" : "password"}
                            onChange={(e) => setCPassword(e.target.value)} helperText={cpassError ? "Password Do not Match " : ""}/>
                            <Box style={{textAlign: "center",justifyItems : "center"}}>
                                <Button onClick={handleSignUp} style={{ textTransform : "capitalize", fontFamily : "Epilogue" , backgroundColor : "rgba(227, 235, 255, 1)", color : "#0D1B4C", width:"150px", height:"50px", borderRadius: " 30px",fontSize:"15px"}}>Sign Up</Button>
                            </Box>
                            <Box style={{textAlign: "center",justifyItems : "center", padding : "20px"}}>
                                <Typography> or Signup with</Typography>
                                <Box  style={{display: "flex", textAlign: "center", gap:"1px", padding : "20px"}}>
                                    <Button disableRipple disableElevation style={{backgroundColor : "rgb(43, 73, 149)", color : "rgba(227, 235, 255, 1)",}}><GoogleIcon  /></Button>
                                    <Button disableRipple disableElevation style={{backgroundColor : "rgb(43, 73, 149)", color : "rgba(227, 235, 255, 1)",}}><FacebookRoundedIcon /></Button>
                                    <Button disableRipple disableElevation style={{backgroundColor : "rgb(43, 73, 149)", color : "rgba(227, 235, 255, 1)",}}><AppleIcon /></Button>
                                </Box>
                            </Box>
                            <Box style={{textAlign: "center",justifyItems : "center", padding : "20px"}}>
                                <Typography> Already have an account? <Link style={{ color : "rgba(227, 235, 255, 1)", textDecoration: "none", cursor:"pointer"}} to="/login">Sign in</Link></Typography>
                            </Box>
                            
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

export default Signup