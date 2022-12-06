import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import SignUpTest from './pages/SignUp/SignUpTest';

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn/>}/>
      <Route exact path="/test" element={<SignUpTest/>}/>
      <Route exact path="/signup" element={<SignUp/>}/>
    </Routes>
  )
}