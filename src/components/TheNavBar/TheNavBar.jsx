import React from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../contexts/auth';
import { Stack, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export const TheNavBar = () => {
  const { authenticated, logout } = React.useContext(AuthContext);

  const handleLogout = () => {
    logout();
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 2 }} />
        <Typography variant='h6' sx={{
            mr: 2,
            display: { xs: 'flex', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
        }}>
          CEDOMCA
        </Typography>
        {
          authenticated ? 
          <Stack direction='row' spacing={2} sx={{
            flexGrow: 1
          }}>
            <Button component={Link} color='inherit' to="/">Obras</Button>
            <Button component={Link} color='inherit' to="/fonts">Fontes</Button>
            <Button component={Link} color='inherit' to="/users">Usuários</Button>
          </Stack> 
          : null
        }
        {
          authenticated ?
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon/>}>
              Logout
            </Button>
          : null
        }
      </Toolbar>
    </AppBar>
  );
}
