import './App.css';
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import TheNavBar from './components/TheNavBar/TheNavBar'
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Main from './pages/Main/Main';
import Fonts from './pages/Fonts/Fonts';
import { AuthContext } from './contexts/auth';
import { deleteSession } from './services/api';

export default function App() {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("uid"));
    setLoading(false);
  }, [])

  const logout = () => {
    try {
      deleteSession();
      localStorage.removeItem("uid");
      setId('');
      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div />
    }

    if (!authenticated) {
      return <Navigate to="/" />
    }
    return children
  }
  return (
      <AuthContext.Provider value={{ authenticated: !!id, setId, loading, logout }}>
        <TheNavBar />
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/main" element={<Private><Main /></Private>} />
          <Route path="/fonts" element={<Private><Fonts /></Private>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthContext.Provider>
  )
}