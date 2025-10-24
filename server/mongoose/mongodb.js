import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect('mongodb://localhost/UserAuthentication')
    .then(() => 
        console.log("DB connected")
    )
    .catch((err) => {
        console.log( `Error: ${err}` )
    })
}