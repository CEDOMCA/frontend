import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage/>}/>
      <Route exact path="/register" element={<HomePage/>}/>
    </Routes>
  )
}