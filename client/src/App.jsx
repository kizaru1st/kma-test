import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import SignUp from "./Pages/Auth/SignUp";
import SignIn from "./Pages/Auth/SignIn";
import UpdateProfile from "./Pages/UpdateProfile";

export default function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="/update" element={<UpdateProfile />} />
            {/* Prevent User Access */}
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
