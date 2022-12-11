import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Fonts() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return(
        <Paper sx={{ maxWidth: 980, margin: 'auto', marginTop: 5, overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
          <Grid item xs>
          <Tooltip >
            <Button
                startIcon={<AddIcon />}
                disabled={false}
                size="medium"
                variant="contained"
                onClick={handleClickOpen}
            >
                Adicionar nova fonte
            </Button>
            
           </Tooltip>
           </Grid>

            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }}/>
            </Grid>
            <Grid item sm={2.5}>
              <TextField
                fullWidth
                placeholder="Pequisar por nome da fonte"
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
        Não existe fontes registradas no momento.
      </Typography>
      <List alignItems="center" sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="center" secondaryAction={
                  <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start">
                    <Button size="small" variant="text" startIcon={<DeleteIcon />} color="error">
                    Excluir fonte
                    </Button>
                    <Button size="small" variant="text" startIcon={<EditIcon />} >
                    Editar fonte
                    </Button>
                  </Grid>  
                  }>
        <ListItemText
          primary="Fonte institucional"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Descrição:
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
                    Excluir fonte
                    </Button>
                    <Button size="small" variant="text" startIcon={<EditIcon />} >
                    Editar fonte
                    </Button>
                  </Grid> 
                  }>
        <ListItemText
          primary="Fonte bibliográfica"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Descrição:
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
                    Excluir fonte
                    </Button>
                    <Button size="small" variant="text" startIcon={<EditIcon />} >
                    Editar fonte
                    </Button>
                  </Grid>
                    
                  }>
        <ListItemText
          primary="Fonte musical escrita"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Descrição
              </Typography>
              {' ..............'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
        <Dialog
          open={open}
          fullWidth
          maxWidth={"md"}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <Grid container
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Button onClick={handleClose}>
                      <KeyboardArrowLeft />
                    Back
              </Button> 
              {"Cadastrar nova fonte"}
              <Button variant="contained" onClick={handleClose}>
                    Cadastrar
              </Button> 
            </Grid>
          </DialogTitle>
          <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              
            </FormControl>
            
          </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
    </Paper>
    );
}