import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Main from './pages/Main/Main';
import Fonts from './pages/Fonts/Fonts';

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn/>}/>
      <Route path="/main" element={<Main/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/fonts" element={<Fonts/>}/>
    </Routes>
  )
}