import * as React from 'react';
import { 
  AppBar,
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  MenuItem, 
  Paper, 
  Grid, 
  TextField, 
  List, 
  Dialog, 
  DialogContent, 
  Slide, 
  FormControl, 
  InputLabel, 
  Select, 
  DialogTitle,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import { useState, useEffect } from "react";
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import { getUsers, deleteUser, updateUserId, getUserId } from '../../services/api';
import id from 'date-fns/esm/locale/id/index.js';
import { ResourceListItem } from '../../components/ResourceListItem/ResourceListItem';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AdminUsers() {
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [open, setOpen] = React.useState(false);

  const [users, setUsers] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [errors, setErrors] = useState({});
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
  const [currentId, setCurrentId] = useState("");

  //vindo de fonts
  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleClickSnackDelete = () => {
    setOpenSnackDelete(true);
  };

  const fetchUsers = async () => {
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
    document.title = 'CEDOMCA | Lista de usuários';
    
    fetchUsers().then(() => setLoadingData(false));
  }, []);

  useEffect(() => {
    const searchedUsers = users.filter((user) =>
      user.fullName.toLowerCase().includes(searchString.toLowerCase())
    );
    setSearchResult(searchedUsers);
  }, [searchString, users]);

  const fetchUserId = async (id) => {
    try {
      setLoading(true);
      const { data } = await getUserId(id);
      const countryObj = Country.getAllCountries().find((c) => c.name === data.country)
      const stateObj = State.getStatesOfCountry(countryObj.isoCode).find((s) => s.name === data.state)
      const cityObj = City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode).find((c) => c.name === data.city)
      setName(data.fullName);
      setBirthDate(data.birthDate);
      setCountry(countryObj);
      setCity(cityObj);
      setState(stateObj);
      setRole(data.role);
      setCurrentId(id);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleUpdateUser = (id, event) => {
    event.preventDefault();
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
      fetchUsers();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  const handleDeleteUser = async (id, event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await deleteUser(id);
      setLoading(false);
      handleClickSnackDelete();
      fetchUsers();
    } catch (err) {
      setLoading(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
    setName("");
    setDescription("");
    setInputChars([{ name: '', domain: '' }])
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

  const buildSkeletonList = () => (
    <>
      <ResourceListItem isLoading={loadingData}/>
      <ResourceListItem isLoading={loadingData}/>
      <ResourceListItem isLoading={loadingData}/>
    </>
  );

  const buildUsersList = () => (
    searchString === '' ? users.map((user) => (
      <ResourceListItem 
        primary={user.fullName}
        secondary={user.email}
        onClickDelete={(event) => handleDeleteUser(user.id, event)}
        onClickUpdate={(event) => handleUpdateUser(user.id, event)}
        isLoading={loadingData}
      />
    )) : searchResult.map((user) => (
      <ResourceListItem 
        primary={user.fullName}
        secondary={user.email}
        onClickDelete={(event) => handleDeleteUser(user.id, event)}
        onClickUpdate={(event) => handleUpdateUser(user.id, event)}
        isLoading={loadingData}
      />
    ))
  )

  return (
    <div>

      <Paper sx={{ maxWidth: 980, margin: 'auto', marginTop: 5, overflow: 'hidden' }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Stack direction='row' sx={{
              flexGrow: 1,
            }}>
              <TextField
                  fullWidth
                  placeholder="Pesquisar por nome do usuário"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                    startAdornment: (
                      <SearchIcon color="inherit" sx={{ display: 'block' }} />
                    )
                  }}
                  variant="standard"
                  onChange={(event) => setSearchString(event.target.value)}
              />
            </Stack>
          </Toolbar>
        </AppBar>
        {
        !loadingData && users.length === 0 && 
          <Typography variant='h6' sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
            {'Nenhum usuário foi cadastrado ainda :('}
          </Typography>
      }
      {
        !loadingData && users.length !== 0 && searchResult.length === 0 && 
          <Typography variant='h6' sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
            {'Nenhum usuário encontrado :('}
          </Typography>
      }
        <List alignItems="center" sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {loadingData ? buildSkeletonList() : buildUsersList()}
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
                      <InputLabel id="demo-simple-select-outlined-label">País *</InputLabel>
                      <Select
                        sx={{ width: 170 }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="País * "
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
                      <InputLabel id="demo-simple-select-outlined-label">Estado *</InputLabel>
                      <Select
                        sx={{ width: 170 }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={state}
                        label="Estado * "
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
                      <InputLabel id="demo-simple-select-outlined-label">Cidade *</InputLabel>
                      <Select
                        sx={{ width: 170 }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Cidade * "
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
        </Dialog>
      </Paper>

    </div>


  );
}
export default AdminUsers;