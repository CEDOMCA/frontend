import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { createSession } from '../../services/api';

const theme = createTheme();

export default function SignIn() {
  const [,] = useState('');
  const [,] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { authenticated, setId } = useContext(AuthContext);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })

    if (errors[field]) setErrors({
      ...errors,
      [field]: null
    })
  }
  const findFormErrors = () => {
    const { email, password } = form;
    const newErrors = {};
    // rating errors
    if (!email || email === '') newErrors.email = 'Email obrigatório';
    else if (!email.includes('@')) newErrors.email = 'Email inválido';
    // comment errors
    if (!password || password === '') newErrors.password = 'Senha obrigatório';
    else if (password.length > 18)
      newErrors.password = 'Senha muito longa! Sua senha deve conter entre 8 e 18 caracteres';
    else if (password.length < 8)
      newErrors.password = 'Senha muito curta! Sua senha deve conter entre 8 e 18 caracteres';


    return newErrors;
  };




  useEffect(() => {
    if (authenticated) {
      navigate('/main', { replace: true });
    }
  }, [authenticated]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log('ÁQUUIIII', newErrors);
    } else {
      try {
        setOpen(true);
        const response = await createSession(form.email, form.password);
        localStorage.setItem('uid', response.data.id);
        setId(response.data.id);
        setOpen(false);
        navigate('/main', { replace: true });
      } catch (err) {
        if (err.response.data.message) {
          setError(err.response.data.message);
        }
        setOpen(false);
      }
    }


  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Fazer login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              onChange={(e) => setField('email', e.target.value)}
              {...(errors.email && { error: true, helperText: errors.email })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setField('password', e.target.value)}
              {...(errors.password && { error: true, helperText: errors.password })}
            />
            {error && <Alert severity="warning">{error}</Alert>}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Entrar
            </Button>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Stack direction='column'>
              <Link href="/signup" variant="body2">
                Não tem uma conta? Cadastre-se
              </Link>
              <Link href="/recover-password" variant="body2">
                Esqueceu sua senha?
              </Link>
            </Stack>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
