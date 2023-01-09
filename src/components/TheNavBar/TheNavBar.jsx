import AdbIcon from '@mui/icons-material/Adb';
import LogoutIcon from '@mui/icons-material/Logout';
import { Stack, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { TheNavBarTabs } from './TheNavBarTabs';

export const TheNavBar = () => {
  const { authenticated, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    setOpen(false);
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
          <Button color="inherit" onClick={handleClickOpen} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        ) : null}
      </Toolbar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Sair"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que deseja sair?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleLogout}>OK</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};
