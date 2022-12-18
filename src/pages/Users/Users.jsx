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
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Fab from '@mui/material/Fab';
import { width } from '@mui/system';
import { useState, useEffect } from "react";
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import dayjs from 'dayjs';







const pages = ['Obras', 'Fontes', 'Usuários'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AdminUsers() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [counter, setCounter] = useState(1);
  const [fonts, setFonts] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [errors, setErrors] = useState({});
  const role = 'visitor';
  const [message, setMessage] = useState('');
  const [birthdate, setBirthDate] = useState('');
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = React.useState(dayjs('2000-08-18T21:11:54'));
  const [form, setForm] = useState({});
  const allCountry = Country.getAllCountries();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);





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
        fullName: form.name,
        birthDate: form.birthDate,
        email: form.email,
        password: form.password,
        country: country.name,
        state: state.name,
        city: city.name,
        role,
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

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


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
    return (
      <Grid
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <FormControl>
          <InputLabel id="demo-simple-select-label">Papel do usuário *</InputLabel>
          <Select
            sx={{ width: 300 }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Possíveis Valores"
          >
            <MenuItem value="">
              Visitante
            </MenuItem>
            <MenuItem value="">Adiministrador</MenuItem>
            <MenuItem value="">Super</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    );
  }


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
          <ListItem alignItems="center" secondaryAction={
            <Grid container
              direction="column"
              justifyContent="center"
              alignItems="flex-start">
              <Button size="small" variant="text" startIcon={<DeleteIcon />} color="error">
                Excluir usuário
              </Button>
              <Button size="small"
                variant="text"
                startIcon={<EditIcon />}
                disabled={false}
                onClick={handleClickOpen} >
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
                      label="Nome completo"
                      autoFocus
                      onChange={(e) => setField('name', e.target.value)}
                      {...(errors.name && { error: true, helperText: errors.name })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        required
                        label="Data de nascimento *"
                        inputFormat="DD/MM/YYYY"
                        value={form.birthDate}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(e) => setField('birthDate', e)}
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
                        onChange={(e) => setCountry(e.target.value)}
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
                        onChange={(e) => setState(e.target.value)}
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
                    {Array.from(Array(counter)).map((c, index) => {
                      return renderNewChar();
                    })}


                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
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