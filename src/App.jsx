import './App.css';
import { useContext, useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { TheNavBar } from './components/TheNavBar/TheNavBar';
import { AuthContext } from './contexts/auth';
import Arts from './pages/Arts/Arts';
import { ChangePassword } from './pages/ChangePassword/ChangePassword';
import Fonts from './pages/Fonts/Fonts';
import Main from './pages/Main/Main';
import { RecoverPassword } from './pages/RecoverPassword/RecoverPassword';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Users from './pages/Users/Users';
import { deleteSession } from './services/api';

export default function App() {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem('uid'));
    setLoading(false);
  }, []);

  const logout = () => {
    try {
      deleteSession();
      localStorage.removeItem('uid');
      setId('');
      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div />;
    }

    if (!authenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };
  return (
    <AuthContext.Provider value={{ authenticated: !!id, setId, loading, logout }}>
      <TheNavBar />
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route
          path="/main"
          element={
            <Private>
              <Main />
            </Private>
          }
        />
        <Route
          path="/fonts"
          element={
            <Private>
              <Fonts />
            </Private>
          }
        />

        <Route
          path="/arts"
          element={
            <Private>
              <Arts />
            </Private>
          }
        />

        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/users"
          element={
            <Private>
              <Users />
            </Private>
          }
        />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthContext.Provider>
  );
}
