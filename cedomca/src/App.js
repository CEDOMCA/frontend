import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage/>}/>
    </Routes>
  )
}