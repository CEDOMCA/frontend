import AdbIcon from '@mui/icons-material/Adb';
import LogoutIcon from '@mui/icons-material/Logout';
import { Stack, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { TheNavBarTabs } from './TheNavBarTabs';

export const TheNavBar = () => {
  const { authenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const handleLogoClick = () => {
    window.location.href = "/";
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Stack
          direction="row"
          onClick={handleLogoClick}
          sx={{
            cursor: 'pointer',
          }}
        >
          <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 2 }} />
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CEDOMCA
          </Typography>
        </Stack>
        {authenticated ? (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexGrow: 1,
            }}
          >
            <TheNavBarTabs />
          </Stack>
        ) : null}
        {authenticated ? (
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};
