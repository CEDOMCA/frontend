import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState, useEffect } from "react";
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import { getUsers, deleteUser, updateUserId, getUserId } from '../../services/api';
import id from 'date-fns/esm/locale/id/index.js';


const pages = ['Obras', 'Fontes', 'Usuários'];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AdminUsers() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [counter, setCounter] = useState(1);
  const [users, setUsers] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [errors, setErrors] = useState({});
  //const role = 'visitor';
  const [message, setMessage] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [form, setForm] = useState({});
  const allCountry = Country.getAllCountries();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  // vindo de fonts 
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputChars, setInputChars] = useState([
    { name: '', domain: '' }
  ]);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openSnackDelete, setOpenSnackDelete] = React.useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentId, setCurrentId] = useState("");

  //vindo de fonts
  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const handleClickSnackDelete = () => {
    setOpenSnackDelete(true);
  };

  const handleCloseSnackDelete = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackDelete(false);
  };

  const fetchProducts = async () => {
    try {
      const { data } = await getUsers();
      const users = data;
      setUsers(users);
      console.log(data);
      if (users.len === 0) {
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

  const fetchUserId = async (id) => {
    try {
      setLoading(true);
      const { data } = await getUserId(id);
      console.log(data);
      const countryObj = Country.getAllCountries().find((c) => c.name === data.country)
      console.log(countryObj)
      const stateObj = State.getStatesOfCountry(countryObj.isoCode).find((s) => s.name === data.state)
      console.log(stateObj)
      const cityObj = City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode).find((c) => c.name === data.city)
      console.log(cityObj)
      setName(data.fullName);
      setBirthDate(data.birthDate);
      setCountry(countryObj);
      setCity(cityObj);
      setState(stateObj);
      setRole(data.role);
      console.log("AQUI", data.fullName, data.birthDate, data.city, data.country, data.state, data.role)
      setCurrentId(id);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleUpdateUser = (id) => {
    fetchUserId(id);
    setOpen(true);
  }

  const handleSubmitUpdate = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      fullName: name,
      birthDate: birthDate,
      country: country.name,
      state: state.name,
      city: city.name,
      role: role,
      id: id
    };
    try {

      const res = await updateUserId(id, data);
      setLoading(false);
      handleClose();
      handleClickSnack();
      fetchProducts();
    } catch (err) {
      setLoading(false);
      console.log(err);

      let errorMsg = err.response.data.message.toString();
      let newErrorMsg = errorMsg.replaceAll(",", "\n\n");
    }
  }

  const handleDelete = async (id, e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await deleteUser(id);
      setLoading(false);
      handleClickSnackDelete();
      fetchProducts();
    } catch (err) {
      setLoading(false);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setDescription("");
    setInputChars([{ name: '', domain: '' }])
  };
  //

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const findFormErrors = () => {
    const {
      name, birthDate, email, password, confirmPassword,
    } = form;
    const newErrors = {};
    // name errors
    if (!name || name === '') newErrors.name = 'Nome obrigatório';
    // rating errors
    if (!email || email === '') newErrors.email = 'Email obrigatório';
    else if (!email.includes('@')) newErrors.email = 'Email inválido'
    // comment errors
    if (!password || password === '') newErrors.password = 'Senha obrigatório';
    else if (password.length > 18) newErrors.password = 'Senha muito longa! Sua senha deve conter entre 8 e 18 caracteres';
    else if (password.length < 8) newErrors.password = 'Senha muito curta! Sua senha deve conter entre 8 e 18 caracteres';

    if (!confirmPassword || confirmPassword === '') newErrors.confirmPassword = 'Confirmar senha obrigatório';
    else if (confirmPassword !== password) newErrors.confirmPassword = 'As senhas devem ser igual';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors)
    } else {
      console.log(country)
      setOpen(true)
      const options = {
        fullName: name,
        role: role,
        birthdate: birthDate,
        country: country.name,
        state: state.name,
        city: city.name, 
        id: id,
        
      };
      try {

        const res = await axios.post('https://web-production-8fea.up.railway.app/users', options);
        setOpen(false)
        navigate('/', { replace: true })
      } catch (err) {
        setOpen(false)
        console.log(err);
        setShow(true);
        let errorMsg = err.response.data.message.toString();
        let newErrorMsg = errorMsg.replaceAll(",", "\n\n")
        setMessage(newErrorMsg);
        setTimeout(function () {
          setShow(false);
        }, 7000);
      }
    }
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
                <SearchIcon color="inherit" sx={{ display: 'block' }} />
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
          {users.map((user) => (
            <ListItem alignItems="center" secondaryAction={
              <Grid container
                direction="column"
                justifyContent="center"
                alignItems="flex-start">
                <Button size="small" variant="text" startIcon={<DeleteIcon />} color="error" onClick={(e) => handleDelete(user.id, e)}>
                  Excluir usuário
                </Button>
                <Button size="small"
                  variant="text"
                  startIcon={<EditIcon />}
                  disabled={false}
                  onClick={(e) => handleUpdateUser(user.id)}>
                  Editar usuário
                </Button>
              </Grid>
            }>
              <ListItemText
                primary={"Nome: " + user.fullName}
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
                    {" " + user.email}
                  </React.Fragment>
                }
              />
            </ListItem>
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
              {"Editar usuário"}
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
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2} columns={12}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="fullName"
                      required
                      fullWidth
                      id="fullName"
                      value={name}
                      label="Nome completo"
                      autoFocus
                      onChange={(e) => setName(e.target.value)}
                      {...(errors.name && { error: true, helperText: errors.name })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Data de nascimento *"
                        inputFormat="DD/MM/YYYY"
                        value={birthDate}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(e) => setBirthDate(e)}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={4} >
                    <FormControl>
                      <InputLabel id="demo-simple-select-outlined-label">País</InputLabel>
                      <Select
                        sx={{ width: 170 }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={country}
                        onChange={(e) => 
                        {
                          console.log('aqui', e.target.value)
                          setCountry(e.target.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>-</em>
                        </MenuItem>
                        {allCountry.map((country) => (
                          <MenuItem value={country}>
                            {country.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} >
                    <FormControl>
                      <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                      <Select
                        sx={{ width: 170 }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>-</em>
                        </MenuItem>
                        {State.getStatesOfCountry(country.isoCode).map((state) => (
                          <MenuItem value={state}>
                            {state.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} >
                    <FormControl>
                      <InputLabel id="demo-simple-select-outlined-label">Cidade</InputLabel>
                      <Select
                        sx={{ width: 170 }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <MenuItem value="">
                          <em>-</em>
                        </MenuItem>
                        {City.getCitiesOfState(country.isoCode, state.isoCode).map((city) => (
                          <MenuItem value={city}>
                            {city.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6.5}>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">Papel do usuário *</InputLabel>
                      <Select
                        sx={{ width: 300 }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Possíveis Valores"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <MenuItem value="visitor">
                          Visitante
                        </MenuItem>
                        <MenuItem value="admin">Adiministrador</MenuItem>
                        <MenuItem value="super">Super</MenuItem>
                      </Select>
                    </FormControl>

                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={event => handleSubmitUpdate(event, currentId)}
                >
                  Confirmar edição
                </Button>
              </Box>

            </Box>
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