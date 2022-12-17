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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Fab from '@mui/material/Fab';
import { width } from '@mui/system';
import { useState, useEffect } from "react";
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Fonts() {
  const [open, setOpen] = React.useState(false);
  const [counter, setCounter] = useState(1);
  const [fonts, setFonts] = useState([]);
  const [hidden, setHidden] = useState(false);

  const fetchProducts = async () => {
    try {
    axios.defaults.withCredentials = true
    const { data } = await axios.get("https://web-production-8fea.up.railway.app/fonts");
    const fonts = data;
    setFonts(fonts);
    console.log(data);
    if (fonts.len === 0) {
      setHidden(false);
    } else {
      setHidden(true);
    }
    } catch (err) {
      setHidden(false);
    }
    
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClick = () => {
    setCounter(counter + 1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCounter(1);
  };

  const renderNewChar = () => {
    return(
      <Grid container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{mt: 2}}>
                    <TextField
                      required
                      id="charName"
                      label="Nome da característica"
                      name="charName"
                      sx = {{width: '40%', mr: 2}}
                    />

                    <FormControl>
                      <InputLabel id="demo-simple-select-label">Possíveis Valores</InputLabel>
                      <Select
                        sx = {{width: 300}}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Possíveis Valores"
                      >
                        <MenuItem value="">
                          Apenas números
                        </MenuItem>
                        <MenuItem value="">Apenas letras</MenuItem>
                        <MenuItem value="">Apenas letras e números</MenuItem>
                      </Select>
                    </FormControl>
                </Grid>
    );
  }

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
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center" hidden={hidden}>
        Não existe fontes registradas no momento.
      </Typography>
      <List alignItems="center" sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {fonts.map((font) => (
        <>
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
          sx={{mr: 15}}
          primary={font.name}
          secondary={
            <React.Fragment >
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Descrição:
              </Typography>
              {font.description}
            </React.Fragment>
          }
        />
      </ListItem>
      {fonts.at(-1) === font ?  (<></>) : (<Divider component="li" />)}
      </>
      ))}
      
    </List>
        <Dialog
          open={open}
          fullWidth
          maxWidth={"lg"}
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
              width: 'auto',
            }}
          >
            <Grid container alignItems="center" justifyContent="center" spacing={2} columns = {12} sx={{ mt: 2 }}>
            <Grid item xs={6.5}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6.5}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Descrição"
                  name="description"
                />
              </Grid>

              <Grid item xs={11} sx={{mt: 2}}>
                  {Array.from(Array(counter)).map((c, index) => {
                    return renderNewChar();
                  })}
                  <Grid container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center">
                <Fab color="primary" aria-label="add" sx={{ml: 18, mt: 2}} onClick={handleClick}>
                    <AddIcon /> 
                  </Fab> <Typography sx={{ml:2, mt:2}}>Adicionar nova característica</Typography>
                </Grid>
                  
              </Grid>
            </Grid>
            
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