import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/api';
import { AuthContext } from '../../contexts/auth';

const theme = createTheme();

export default function SignUp() {
  const role = 'visitor';
  const [message, setMessage] = useState('');
  const [birthdate, setBirthDate] = useState('');
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = React.useState(dayjs('2000-08-18T21:11:54'));
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = useState(false);
  const allCountry = Country.getAllCountries();
  const navigate = useNavigate();

  const { authenticated } = React.useContext(AuthContext);
  React.useEffect(() => {
    if (authenticated) {
      navigate('/main', { replace: true });
    }
  }, [authenticated])

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
        await createUser(options);
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastre sua conta
          </Typography>
          <Collapse in={show}>
            <Alert severity="error"><p>{message}</p></Alert>
          </Collapse>
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
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  onChange={(e) => setField('email', e.target.value)}
                  {...(errors.email && { error: true, helperText: errors.email })}
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
                  <InputLabel id="demo-simple-select-label">País</InputLabel>
                  <Select
                    sx={{ width: 170 }}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="País"
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
                  <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                  <Select
                    sx={{ width: 170 }}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Estado"
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
                  <InputLabel id="select">Cidade</InputLabel>
                  <Select
                    sx={{ width: 170 }}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Cidade"
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setField('password', e.target.value)}
                  {...(errors.password && { error: true, helperText: errors.password })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar senha"
                  type="password"
                  id="confirmPassword"
                  onChange={(e) => setField('confirmPassword', e.target.value)}
                  {...(errors.confirmPassword && { error: true, helperText: errors.confirmPassword })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar-se
            </Button>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href="/" variant="body2">
                  Já possui uma conta? Faça login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
