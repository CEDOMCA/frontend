import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
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
    Grid,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Collapse
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { ResourceListItem } from '../../components/ResourceListItem/ResourceListItem';
import { getArts, deleteArt, getFonts, createArt, getArtId, updateArtId } from '../../services/api';

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
    const [open, setOpen] = useState(false);
    const [fonts, setFonts] = useState([]);
    const [errors, setErrors] = useState({});
    const [openSnack, setOpenSnack] = React.useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [errorFile, setErrorFile] = useState(false);
    const fileRef = React.useRef();
    const [currentId, setCurrentId] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [font, setFont] = useState("");

    const awaitPromise = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        setErrorFile(false);
    };

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
    const fetchFonts = async () => {
        setLoading(true);
        try {
            const { data } = await getFonts();
            const fonts = data;
            setFonts(fonts);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const findFormErrors = () => {
        const newErrors = {};

        if (!code || code === '') newErrors.code = 'Código obrigatório';

        if (!title || title === '') newErrors.title = 'Título obrigatório';

        if (!font || font === '') newErrors.font = 'Fonte obrigatório';

        if (!isFilePicked) {
            setErrorFile(true);
            changeErrorState();
        }

        return newErrors;
    };

    const changeErrorState = async () => {
        await awaitPromise(2000);
        setErrorFile(false);
    }
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

    const handleClickOpen = () => {
        setOpen(true);
        fetchFonts();
    };

    const handleClose = () => {
        setCode("");
        setTitle("");
        setFont("");
        setErrors([]);
        setSelectedFile();
        fileRef.current.value = "";
        setIsFilePicked(false);
        setOpen(false);
        setErrorFile(false)
        setIsUpdate(false);
    };

    const handleClickSnack = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setLoading(true);

            const formData = new FormData();
            formData.append('File', selectedFile);
            console.log(formData);

            const attr = {
                name: selectedFile.name,
                value: "arquivo"
            }

            const data = {
                code: code,
                title: title,
                font: font,
                attributes: attr
            };
            try {
                await createArt(data);
                setLoading(false);
                handleClose();
                handleClickSnack();
                fetchArts();
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
    };

    const fetchArtId = async (id) => {
        try {
            setLoading(true);
            const { data } = await getArtId(id);
            setCode(data.code);
            setTitle(data.title);
            setFont(data.font);
            setCurrentId(id);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    const handleUpdateArt = (id, event) => {
        event.preventDefault();

        fetchArtId(id);
        setIsUpdate(true);
        fetchFonts()
        setOpen(true);
    };

    const handleSubmitUpdate = async (e, id) => {
        e.preventDefault();


        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setLoading(true);

            const formData = new FormData();
            formData.append('File', selectedFile);
            console.log(formData);

            const attr = {
                name: selectedFile.name,
                value: "arquivo"
            }

            const data = {
                code: code,
                title: title,
                font: font,
                attributes: attr
            };
            try {
                await updateArtId(id, data);
                setLoading(false);
                handleClose();
                handleClickSnack();
                fetchArts();
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
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
                    onClickUpdate={(event) => handleUpdateArt(art.id, event)}
                    isLoading={loadingData}
                />
            ))
            : searchResult.map((art) => (
                <ResourceListItem
                    key={art.id}
                    primary={art.title}
                    secondary={art.font}
                    onClickDelete={(event) => showConfirmDelete(art.id, event)}
                    onClickUpdate={(event) => handleUpdateArt(art.id, event)}
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
                            onClick={handleClickOpen}
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
                open={open}
                fullWidth
                maxWidth={'lg'}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Button onClick={handleClose}>
                            <KeyboardArrowLeft />
                            Voltar
                        </Button>
                        {isUpdate ? "Editar obra" : "Cadastrar obra"}
                        {isUpdate ? (<Button variant="contained" onClick={event => handleSubmitUpdate(event, currentId)}>
                            Editar
                        </Button>) : (<Button variant="contained" onClick={handleSubmit}>
                            Cadastrar
                        </Button>)}
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
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                            columns={12}
                            sx={{ mt: 2 }}
                        >
                            <Grid item xs={4}>
                                <TextField
                                    name="code"
                                    required
                                    fullWidth
                                    id="code"
                                    label="Código"
                                    sx={{ mt: 2 }}
                                    value={code}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => setCode(e.target.value)}
                                    {...(errors.code && {
                                        error: true,
                                        helperText: errors.code,
                                    })}
                                />

                                <TextField
                                    required
                                    fullWidth
                                    id="title"
                                    label="Título"
                                    name="title"
                                    sx={{ mt: 2 }}
                                    value={title}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => setTitle(e.target.value)}
                                    {...(errors.title && {
                                        error: true,
                                        helperText: errors.title,
                                    })}
                                />

                                <FormControl sx={{ mt: 2 }}
                                    {...(errors.font && {
                                        error: true,
                                        helperText: errors.font,
                                    })}>
                                    <InputLabel id="demo-simple-select-label" >Tipos de fonte</InputLabel>
                                    <Select
                                        sx={{ width: 385 }}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="Possíveis Valores"
                                        name="font"
                                        value={font}
                                        onChange={(e) => setFont(e.target.value)}

                                    >
                                        {fonts.map(font => (
                                            <MenuItem key={font.id} value={font.name}>{font.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container
                                direction="column"
                                justifyContent="center"
                                alignItems="center" xs={4}>
                                <Typography>Adicionar a fonte digitalizada</Typography>
                                <CloudUploadIcon color="primary" sx={{ fontSize: 150 }} />
                                <Button
                                    variant="contained"
                                    component="span"
                                    color="primary"
                                    label='Selecionar arquivo'>
                                    <input type="file" onChange={changeHandler} ref={fileRef}
                                    />
                                </Button>
                                <Collapse in={errorFile}>
                                    <Alert severity="error" sx={{ mt: 2 }}>
                                        Arquivo obrigatório
                                    </Alert>
                                </Collapse>

                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions />
            </Dialog>
            <Dialog
                open={openConfirm}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseConfirm}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Deseja excluir esta obra?"}</DialogTitle>
                <DialogContent />
                <DialogActions>
                    <Button onClick={handleCloseConfirm} >Cancelar</Button>
                    <Button onClick={(event) => handleDeleteArt(currentDeleteId, event)} color="error">Excluir</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                    Obra registrada com sucesso!
                </Alert>
            </Snackbar>
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