import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Locading from "./Loading";
import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import VerifyUser from "./VerifyUser";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Locading />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/verify" element={<VerifyUser />} />
        </Routes>
      </Router>
    </div>
  );
}
