import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import SignUpTest from './pages/SignUp/SignUpTest';
import Main from './pages/Main/Main';

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn/>}/>
      <Route path="/main" element={<Main/>}/>
      <Route path="/test" element={<SignUpTest/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  )
}