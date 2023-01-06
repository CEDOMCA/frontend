import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
    Paper,
    AppBar,
    Toolbar,
    Stack,
    TextField,
    Button,
    Typography,
    List,
    Backdrop,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Slide,
    Snackbar,


} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { ResourceListItem } from '../../components/ResourceListItem/ResourceListItem';
import { getArts, deleteArt } from '../../services/api';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Arts() {
    const [searchString, setSearchString] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [, setHidden] = useState(false);
    const [arts, setArts] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [loading, setLoading] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [currentDeleteId, setCurrentDeleteId] = useState("");
    const [openSnackDelete, setOpenSnackDelete] = React.useState(false);
    //const [open, setOpen] = useState(false);

    const handleDeleteArt = async (id, event) => {
        event.preventDefault();
        setCurrentDeleteId("");
        setOpenConfirm(false);
        setLoading(true);

        try {
            await deleteArt(id);
            setLoading(false);
            handleClickSnackDelete();
            fetchArts();

        } catch (err) {
            setLoading(false);
        }
    };

    const fetchArts = async () => {
        try {
            const { data } = await getArts();
            const arts = data;
            setArts(arts);
            if (arts.len === 0) {
                setHidden(false);
            } else {
                setHidden(true);
            }
        } catch (err) {
            setHidden(false);
        }
    };

    useEffect(() => {
        document.title = 'CEDOMCA | Lista de obras';

        fetchArts().then(() => setLoadingData(false));
    }, []);

    useEffect(() => {
        const filteredArts = arts.filter((art) =>
            art.title.toLowerCase().includes(searchString.toLowerCase()),
        );

        setSearchResult(filteredArts);
    }, [searchString, arts]);

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setCurrentDeleteId("");
    }

    const showConfirmDelete = (index, event) => {
        event.preventDefault();
        setOpenConfirm(true);
        setCurrentDeleteId(index);
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

    const buildSkeletonList = () => (
        <>
            <ResourceListItem isLoading={loadingData} />
            <ResourceListItem isLoading={loadingData} />
            <ResourceListItem isLoading={loadingData} />
        </>
    );

    const buildArtsList = () =>
        searchString === ''
            ? arts.map((art) => (
                <ResourceListItem
                    key={art.id}
                    primary={art.title}
                    secondary={art.font}
                    onClickDelete={(event) => showConfirmDelete(art.id, event)}
                    //onClickUpdate={(event) => handleUpdateArt(art.id, event)}
                    isLoading={loadingData}
                />
            ))
            : searchResult.map((art) => (
                <ResourceListItem
                    key={art.id}
                    primary={art.title}
                    secondary={art.font}
                    onClickDelete={(event) => showConfirmDelete(art.id, event)}
                    //onClickUpdate={(event) => handleUpdateArt(art.id, event)}
                    isLoading={loadingData}
                />
            ));

    return (
        <Paper sx={{ maxWidth: 980, margin: 'auto', marginTop: 5, overflow: 'hidden' }}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
                <Toolbar>
                    <Stack
                        direction="row"
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Pesquisar por obras"
                            InputProps={{
                                disableUnderline: true,
                                sx: { fontSize: 'default' },
                                startAdornment: <SearchIcon color="inherit" sx={{ display: 'block' }} />,
                            }}
                            variant="standard"
                            onChange={(event) => setSearchString(event.target.value)}
                        />
                        <Button
                            startIcon={<AddIcon />}
                            disabled={false}
                            size="small"
                            variant="contained"
                            //onClick={handleClickOpen}
                            sx={{
                                whiteSpace: 'nowrap',
                                minWidth: 'max-content',
                            }}
                        >
                            Adicionar nova obra
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            {!loadingData && arts.length === 0 && (
                <Typography variant="h6" sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                    {'Nenhuma Obra foi cadastrada ainda :('}
                </Typography>
            )}
            {!loadingData && arts.length !== 0 && searchResult.length === 0 && (
                <Typography variant="h6" sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                    {'Nenhuma Obra encontrada :('}
                </Typography>
            )}
            <List alignItems="center" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {loadingData ? buildSkeletonList() : buildArtsList()}
            </List>
            <Dialog
                open={openConfirm}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseConfirm}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Deseja excluir esta fonte?"}</DialogTitle>
                <DialogContent />
                <DialogActions>
                    <Button onClick={handleCloseConfirm} >Cancelar</Button>
                    <Button onClick={(event) => handleDeleteArt(currentDeleteId, event)} color="error">Excluir</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openSnackDelete} autoHideDuration={6000} onClose={handleCloseSnackDelete}>
                <Alert onClose={handleCloseSnackDelete} severity="success" sx={{ width: '100%' }}>
                    Fonte apagada com sucesso!
                </Alert>
            </Snackbar>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Paper>
    )
}