import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { AuthContext } from '../../contexts/auth';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';

function TheNavBar() {
  const { authenticated, logout } = React.useContext(AuthContext);
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleLogout = () => {
    logout();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 2 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                //flex: 1,
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
            {authenticated ? (
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{
                  mr: "auto"
                }}
              >
                <ToggleButton value="Obras" href="/"> Obras </ToggleButton>
                <ToggleButton value="Fontes" href="/fonts"> Fontes</ToggleButton>
                <ToggleButton value="Usuários" href="/users">Usuários</ToggleButton>
              </ToggleButtonGroup>) : (<></>)}

            {authenticated ? (<Button color="inherit" onClick={handleLogout}>
              <LogoutIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
            </Button>) : (<></>)}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>

  );
}
export default TheNavBar;
