import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import HomeView from './pages/Home/HomeView';

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn/>}/>
      <Route exact path="/signup" element={<SignUp/>}/>
      <Route exact path="/home" element={<HomeView/>}/>
    </Routes>
  )
}