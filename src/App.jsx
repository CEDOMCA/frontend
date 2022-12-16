import './App.css';
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import TheNavBar from './components/TheNavBar/TheNavBar'
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Main from './pages/Main/Main';
import { AuthContext } from './contexts/auth';
import { deleteSession } from './services/api';
import Cookies from 'js-cookie';

export default function App() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(Cookies.get('connect.sid'))
    setLoading(false)
  }, [])

  const logout = () => {
    try {
      deleteSession();
      navigate('/', { replace: true })
    } catch (err) {
      console.log(err)
    }
  };

  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext);
    if (loading) {
      return <div />
    }
    if (!authenticated) {
      return <Navigate to="/" />
    }
    return children
  }
  return (
      <AuthContext.Provider value={{ authenticated: !!token, loading, logout }}>
        <TheNavBar />
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/main" element={<Private><Main /></Private>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthContext.Provider>
  )
}