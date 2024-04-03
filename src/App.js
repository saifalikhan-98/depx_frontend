import React from "react";
import { SignIn } from "./Pages/SigninPage";
import { SignUp } from "./Pages/Register";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}