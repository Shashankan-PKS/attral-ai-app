import { AppBar, Avatar, Box, Button, Chip, IconButton, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material"
import { AuthContext } from "../../../context/AuthContext.jsx";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useTheme } from '@mui/material/styles';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar(){


    const {userData, setUserData, logout } = useContext(AuthContext);
    const [ openNav, setOpenNav ] = useState();
    const opennavbar = Boolean(openNav);
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));


    const handleListOpen = () =>{
        setOpenNav(true)
    }

    const handleListClose = () => {
        setOpenNav(false)
    }

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


    return(
        <>
            <AppBar sx={{ bgcolor : "whitesmoke"}} >
                <Box sx={{ display : "flex", justifyContent : "space-between", width : "100%", alignItems : "center"}}>
                    <Box sx={{display : "flex", gap: 1, alignItems : "center",ml : "20px" ,"@media (max-width:350px)": {
                            ml : "10px"
                        },}}>
                        <Box>
                            {isXs && 
                                <IconButton
                                    disableRipple
                                    >
                                        <MenuIcon sx={{ color: 'rgb(43, 73, 149)', fontSize : "25px", fontWeight : '500',"@media (max-width: 350px)": {
                                            width: 20,
                                            height: 20,
                                            
                                        },}} />
                                </IconButton>
                            }
                        </Box>
                        <Typography sx={{ fontFamily: "Times New Roman",fontSize: {xs: "35px", sm:"48px"} ,fontWeight: 700,color: "rgba(49, 89, 191, 1)", letterSpacing: "4px","@media (max-width:350px)": {
                            fontSize : "25px"
                        },}}>
                            Facebook
                        </Typography>
                        <Box >
                            <Chip label="Version 1.0.0" sx={{
                                fontFamily: "Times New Roman",fontSize: {xs: "10px", sm:"14px"},fontWeight: 700,
                                color: "white",backgroundColor: "rgba(55, 89, 174, 1)",height: {xs: "20px", sm:"26px"}, "& .MuiChip-label": {px: 1.5,},"@media (max-width:350px)": {
                            fontSize : "8px",
                            height : "14px"
                        },
                            }}/>
                        </Box>
                    </Box>
                    <Box sx={{ paddingRight : "20px"}}>
                        <IconButton size="small"
                        onClick={handleListOpen}
                        sx={{ ml: 2 }}
                        aria-controls={opennavbar ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={opennavbar ? 'true' : undefined}>
                            <Avatar sx={{ bgcolor : "rgba(46, 88, 194, 1)", color : "rgba(227, 235, 255, 1)",fontFamily: "Epilogue", fontWeight : "600","@media (max-width: 600px)": {
                            width: 28,
                            height: 28,
                            fontSize: "0.8rem",
                            }, }}>{firstLetter}</Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={openNav}
                            id="account-menu"
                            open={opennavbar}
                            onClose={handleListOpen}
                            onClick={handleListClose}
                            slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 7,
                                backgroundColor : "rgba(234, 239, 255, 1)",
                                color : "rgb(43, 73, 149)", 
                                "@media (max-width:580px)": {
                                    mt: 5,
                                },
                                "@media (max-width:350px)": {
                                    mt: 4,
                                },
                                
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: 3,
                                    mr: 10,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 25,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'rgba(234, 239, 255, 1)',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                    "@media (max-width:580px)": {
                                        right: 20,
                                    },
                                    
                                },
                                },
                            },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        >
                            <MenuItem sx={{fontFamily : "Epilogue",fontWeight : "500",padding : "15px","@media (max-width:350px)": {
                            fontSize : "14px",
                            padding : "10px"
                        },}} onClick={handleListClose}>
                                <PersonIcon sx={{mr : 1,"@media (max-width:350px)": {
                                    fontSize : "17px",
                                    
                                },}} /> My account
                            </MenuItem>
                            <MenuItem onClick={logout} sx={{fontFamily : "Epilogue",fontWeight : "500",padding : "15px","@media (max-width:350px)": {
                                fontSize : "14px",
                                padding : "10px"
                            },}}>
                                <Logout sx={{mr : 1,"@media (max-width:350px)": {
                                    fontSize : "17px"
                                },}} /> Logout
                            </MenuItem>   
                        </Menu>
                    </Box>
                </Box>
            </AppBar>
            
        </>
    )
}

export default Navbar