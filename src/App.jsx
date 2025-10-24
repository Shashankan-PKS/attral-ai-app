import './App.css'
import { Routes, Route } from "react-router-dom";
import Register from './pages/signup/Signup.jsx'
import Login from './pages/signin/Signin.jsx'
import Home from './pages/home/Home.jsx';
import ForgotPassword from './pages/forgotpassword/ForgotPassword.jsx';
import ChangePassword from './pages/forgotpassword/ChangePassword.jsx';
import { ResetPassProvider } from './context/ResetPasswordContext.jsx';
import VerifyOtp from './pages/forgotpassword/verifyOtp.jsx';
import GetStarted from './pages/getstarted/GetStarted.jsx';


function App() {

  return (
    <>
    <ResetPassProvider>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      </ResetPassProvider>
    </>
  )
}

export default App
