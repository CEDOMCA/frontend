import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const pages = ['Obras', 'Fontes', 'Usuários'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AdminUsers() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
    
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Paper sx={{ maxWidth: 980, margin: 'auto', marginTop: 5, overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }}/>
            </Grid>
            <Grid item sm={3.0}>
              <TextField
                fullWidth
                placeholder="Pequisar por nome do usuário"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center" hidden>
        Não existem usuários registradas no momento.
      </Typography>
      <List alignItems="center" sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="center" secondaryAction={
          <Grid container
          direction="column"
          justifyContent="center"
          alignItems="flex-start">
            <Button size="small" variant="text" startIcon={<DeleteIcon />} color="error">
            Excluir usuário
            </Button>
            <Button size="small" variant="text" startIcon={<EditIcon />} >
            Editar usuário
            </Button>
          </Grid>  
          }>
        <ListItemText
          primary="Nome:"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                E-mail:
              </Typography>
              {" .............."}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="center" secondaryAction={
                  <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start">
                    <Button size="small" variant="text" startIcon={<DeleteIcon />} color="error">
                    Excluir usuário
                    </Button>
                    <Button size="small" variant="text" startIcon={<EditIcon />} >
                    Editar usuário
                    </Button>
                  </Grid> 
                  }>
        <ListItemText
          primary="Nome:"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                E-mail:
              </Typography>
              {" .............."}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="center" secondaryAction={
                  <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={1}>
                    <Button size="small" variant="text" startIcon={<DeleteIcon />} color="error">
                    Excluir usuário
                    </Button>
                    <Button size="small" variant="text" startIcon={<EditIcon />} >
                    Editar usuário
                    </Button>
                  </Grid>
                    
                  }>
        <ListItemText
          primary="Nome: ..."
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                E-mail:
              </Typography>
              {' ..............'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
    </Paper>
    </div>
    
    
    
  );
}
export default AdminUsers;