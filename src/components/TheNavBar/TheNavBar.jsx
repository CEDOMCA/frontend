import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import Button from '@mui/material/Button';
import { AuthContext } from '../../contexts/auth';

function TheNavBar() {
  const { authenticated, logout } = React.useContext(AuthContext)
  const handleLogout = () => {
    logout();
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CEDOMCA
          </Typography>
          {authenticated ? (<Button color="inherit" onClick={handleLogout}>Logout</Button> ) : (<></>)}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TheNavBar;
