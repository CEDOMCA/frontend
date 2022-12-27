import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const EmailSentModal = (props) => {
    const { open, onClose } = props;
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Stack direction='row' alignItems='center' spacing={3}>
                    <CheckCircleIcon color='success'/>
                    <Typography variant='h6'>E-mail enviado com sucesso!</Typography> 
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Typography component='p' variant='body1'>
                    Um e-mail de recuperação de senha foi enviado para o endereço informado. Verifique sua caixa de entrada e de spam.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} component={Link} to='/signin'>
                    Voltar para a página inicial
                </Button>
            </DialogActions>
        </Dialog>
    )
}; 