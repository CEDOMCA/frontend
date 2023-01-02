import MailLockIcon from '@mui/icons-material/MailLock';
import { Typography, Container, CssBaseline, Box, Avatar, TextField, Button, Link, CircularProgress } from "@mui/material";
import { useEffect } from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFirstRender } from '../../hooks/useFirstRender';
import { EmailSentModal } from './EmailSentModal';
import { recoverPassword } from './recover-password.api';

export const RecoverPassword = () => {
    const firstRender = useFirstRender();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [requestingToApi, setRequestingToApi] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setRequestingToApi(true);
        await recoverPassword(email);
        setRequestingToApi(false);

        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        navigate('/', { replace: true });
    }

    useEffect(() => {
        if (firstRender) return;

        if (!email.includes('@')) {
            setIsValidEmail(false);
        } else {
            setIsValidEmail(true);
        }

    }, [email]);

    return (
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
                    <MailLockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Recuperar senha
                </Typography>
                <Typography component="p" variant="body1" sx={{ mt: 2 }}>
                    Informe seu e-mail cadastrado para enviarmos as instruções de recuperação de senha.
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        error={!isValidEmail}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        helperText={!isValidEmail ? 'Informe um e-mail válido' : ''}
                    />
                    <Button 
                        disabled={
                            requestingToApi ||
                            email.length === 0
                        }
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        sx={{ mt: 3, mb: 2 }}
                        startIcon={requestingToApi && <CircularProgress size={20} />}
                    >
                        Confirmar
                    </Button>
                    <Link href="/signin" variant="body2">
                        Já possui uma conta? Faça login
                    </Link>
                </Box>
            </Box>
            <EmailSentModal open={openModal} onClose={handleCloseModal}/>
        </Container>
    );
};