import express from 'express'
import cors from "cors"
import { connectDB } from './mongoose/mongodb.js';
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
import { hashedPassword, comparePassword } from './encryption/hashpass.js';
import { UserData } from './mongoose/mongooseSchema.js';
import { verifyToken } from './encryption/verifyToken.js';
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import { verifyResetToken } from './encryption/verifyResetToken.js';



dotenv.config()
const app = express();

const PORT = process.env.PORT;

connectDB();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET','POST','PUT', 'PATCH','DELETE'],
}))

app.listen(PORT, () => {
    console.log(`App is Running in the Port ${PORT}`)
})

app.get("/", (req,res) => {
    res.send("Api is Working ")
})

app.post("/api/registration", async (req, res) => {
    try {
        const {name , email, password, cpassword } = req.body
        const emailRegex = /^[\w.]+@[a-zA-Z]+\.[a-z]{2,5}$/;        

        if(!name || !email || !password || !cpassword ){
            return res.status(400).json({ msg : "All fields are required"})
        }else if(!emailRegex.test(email)){
            return res.status(400).send({ msg : "Enter a valid Email Id"})
        }
        else if(password !== cpassword){
            return res.status(400).send({ msg : "Password Not match"})
        }else{
            const hashed = hashedPassword(password)
            const user = await UserData.findOne({ user_email : email})
            if(user){
                return res.status(400).send({ msg : "Email is already exist"})
            }else{
                const newUser = new UserData({
                    user_name : name,
                    user_email : email,
                    user_password : hashed,
                })
                await newUser.save()
                return res.status(201).send({ msg : "User Registration successfully"})
            }
        }
    } catch (err) {
        res.status(500).json({ msg: `Error: ${err.message}` });
    }
})

app.post("/api/login", async (req,res) => {
    try{
    const { email , password } = req.body;
    const emailRegex = /^[\w.]+@[a-zA-Z]+\.[a-z]{2,5}$/;

    if(!email || !password){
        return res.status(400).send({ msg : "All fields are required"});
    }else if(!emailRegex.test(email)){
        return res.status(400).send({ msg : "Enter a valid Email Id"})
    }
    const user = await UserData.findOne({user_email : email})
    if(!user){
        return res.status(400).send({ msg : "Email not found! , Please Register"})
    }
    const isMatch = comparePassword(password, user.user_password)
    if(!isMatch){
        return res.status(400).send({ msg : "Invalid or Mismatch Password"})
    }

    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("logtoken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000 
    });

    return res.status(200).send({ msg : "Login Successfully", details : {name : user.user_name, email : user.user_email} })
    }catch(err){
        return res.status(500).send({ msg : "Something went wrong! Try again later"})
    }
})

app.get("/api/home", verifyToken, async (req,res) => {
    
    const { user_name, user_email } = req.user;
    res.json({ name: user_name, email: user_email });
})

app.post("/api/verifyemail", async(req, res) => {
    try{
        const { vemail } = req.body;
        const emailRegex = /^[\w.]+@[a-zA-Z]+\.[a-z]{2,5}$/;

        if(!vemail){
            return res.status(400).send({ msg : "All fields are required"});
        }else if(!emailRegex.test(vemail)){
            return res.status(400).send({ msg : "Enter a valid Email Id"})
        }
        const user = await UserData.findOne({user_email : vemail})
        if(!user){
            return res.status(400).send({ msg : "Email not found! , Please Register"})
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await UserData.updateOne({user_email : vemail}, {$set : {reset_otp : otp}} )

        const resetToken = jwt.sign({ email: vemail }, process.env.JWT_SECRET, { expiresIn: "15m" });

        res.cookie("resetToken", resetToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 15 * 60 * 1000 
        });


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "pksshashankan2003@gmail.com", 
                pass: "dtwp lqfo uxpq tnpf"    
            }
        });

        const mailOptions = {
            from: "pksshashankan2003@gmail.com",
            to: vemail,
            subject: "Attral Password Reset OTP - Test Email ",
            text: `Your OTP for password reset is: ${otp}. It will expire in 15 minutes.`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).send({ msg : "Email verified! Otp has sent to your email"});
    }catch(err){
        return res.status(500).send({ msg : "Something went wrong! Try Again"})
    }
})

app.get("/api/getEmailFromToken", verifyResetToken, async (req, res) => {
    const vemail = req.resetEmail;
    res.json({ email: vemail });
});

app.post("/api/verifyotp", async( req,res ) => {
    try{
        const {otp } = req.body;
        const token = req.cookies.resetToken;

        if (!token) return res.status(401).send({ msg: "Token missing" });
        
        if(!otp ){
            return res.status(400).send({ msg : "All fields are required"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserData.findOne({ user_email: decoded.email });
        const verifiedotp = user.reset_otp
        if(otp !== verifiedotp ){
            return res.status(400).send({ msg : "Enter a valid otp"})
        }
        return res.status(200).send({ msg : "otp has been verified"});
    }catch(err){
        return res.status(401).send({ msg: "Token expired or invalid" });
    }
})

app.patch("/api/resetpassword",verifyResetToken, async(req, res) => {
    try{
        const { npass , cpass} = req.body;
        const vemail = req.resetEmail;
        
        if(!npass || !cpass){
            return res.status(400).send({ msg : "All fields are required"});
        }else if(npass !== cpass){
            return res.status(400).send({ msg : "Password not matched"});
        }
        
        const user = await UserData.findOne({user_email : vemail});
        const hashed =  hashedPassword(npass)
        
        if(!user){
            return res.status(400).send({ msg : "Email not found! , Please Register"})
        }else{
            await UserData.updateOne({user_email : vemail},{$set :{user_password : hashed, reset_otp : ""}})
            res.clearCookie("logtoken", { httpOnly: true, secure: false, sameSite: "Lax" });
            return res.status(201).send({ msg : "Password Updated successfully"})
        }
    }catch(err){
        return res.status(500).send({ msg : "Something went wrong! Try again later"})
    }

})

app.post("/api/logout", (req, res) => {
    res.clearCookie("logtoken", {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        path: "/", 
    });

    return res.status(200).json({ msg: "Logged out successfully" });
});

