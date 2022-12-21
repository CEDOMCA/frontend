import * as React from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  List,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  FormControl,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Fab,
  Backdrop,
  CircularProgress,
  Snackbar,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import { useState, useEffect } from "react";
import { getFonts, deleteFont, getFontId, updateFontId, createFont } from '../../services/api';
import { ResourceListItem } from '../../components/ResourceListItem/ResourceListItem';
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Fonts() {
  const [searchString, setSearchString] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const [loadingData, setLoadingData] = useState(true);
  
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [fonts, setFonts] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputChars, setInputChars] = useState([
    { name: '', domain: '' }
  ]);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openSnackDelete, setOpenSnackDelete] = React.useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentId, setCurrentId] = useState("");

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

  const fetchFonts = async () => {
    try {
      const { data } = await getFonts();
      const fonts = data;
      setFonts(fonts);
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
    document.title = 'CEDOMCA | Lista de fontes'

    fetchFonts().then(() => setLoadingData(false));
  }, []);

  useEffect(() => {
    const filteredFonts = fonts.filter((font) =>
      font.name.toLowerCase().includes(searchString.toLowerCase())
    );

    setSearchResult(filteredFonts);
  }, [searchString, fonts])

  const handleClick = () => {
    let newfield = { name: '', domain: '' }
    setInputChars([...inputChars, newfield])
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setDescription("");
    setInputChars([{ name: '', domain: '' }])
  };

  const handleCharChanges = (index, event) => {
    let data = [...inputChars];
    data[index][event.target.name] = event.target.value;
    setInputChars(data);
  }

  const handleDeleteFont = async (id, event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await deleteFont(id);
      setLoading(false);
      handleClickSnackDelete();
      fetchFonts();
    } catch (err) {
      setLoading(false);
    }
  }
  const fetchFontId = async (id) => {
    try {
      setLoading(true);
      const { data } = await getFontId(id);
      setName(data.name);
      setDescription(data.description);
      var newInputChar = [];
      data.attributes.forEach(attr => {
        let newfield = { name: attr.name, domain: attr.domain }
        newInputChar.push(newfield)
      });
      setInputChars(newInputChar);
      setCurrentId(id);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleUpdateFont = (id, event) => {
    event.preventDefault();

    fetchFontId(id);
    setIsUpdate(true);
    setOpen(true);
  }

  const handleSubmitUpdate = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: name,
      description: description,
      attributes: inputChars
    };
    try {

      const res = await updateFontId(id, data);
      setLoading(false);
      handleClose();
      handleClickSnack();
      fetchFonts();
      setName("");
      setDescription("");
    } catch (err) {
      setLoading(false);
      console.log(err);

      let errorMsg = err.response.data.message.toString();
      let newErrorMsg = errorMsg.replaceAll(",", "\n\n");
    }
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: name,
      description: description,
      attributes: inputChars
    };
    try {

      const res = await createFont(data);
      setLoading(false);
      handleClose();
      handleClickSnack();
      fetchFonts();
      setName("");
      setDescription("");
    } catch (err) {
      setLoading(false);
      console.log(err);

      let errorMsg = err.response.data.message.toString();
      let newErrorMsg = errorMsg.replaceAll(",", "\n\n");
    }
  }

  const buildSkeletonList = () => (
    <>
      <ResourceListItem isLoading={loadingData}/>
      <ResourceListItem isLoading={loadingData}/>
      <ResourceListItem isLoading={loadingData}/>
    </>
  );

  const buildFontsList = () => (
    searchString === '' ? fonts.map((font) => (
      <ResourceListItem 
        primary={font.name}
        secondary={font.description}
        onClickDelete={(event) => handleDeleteFont(font.id, event)}
        onClickUpdate={(event) => handleUpdateFont(font.id, event)}
        isLoading={loadingData}
      />
    )) : searchResult.map((font) => (
      <ResourceListItem 
        primary={font.name}
        secondary={font.description}
        onClickDelete={(event) => handleDeleteFont(font.id, event)}
        onClickUpdate={(event) => handleUpdateFont(font.id, event)}
        isLoading={loadingData}
      />
    ))
  )

  return (
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
                placeholder="Pesquisar por nome da fonte"
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
            <Button
              startIcon={<AddIcon />}
              disabled={false}
              size="small"
              variant="contained"
              onClick={handleClickOpen}
              sx={{
                whiteSpace: 'nowrap',
                minWidth: 'max-content'
              }}
            >
              Adicionar nova fonte
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {
        !loadingData && fonts.length === 0 && 
          <Typography variant='h6' sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
            {'Nenhuma fonte foi cadastrada ainda :('}
          </Typography>
      }
      {
        !loadingData && fonts.length !== 0 && searchResult.length === 0 && 
          <Typography variant='h6' sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
            {'Nenhuma fonte encontrada :('}
          </Typography>
      }
      <List alignItems="center" sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {loadingData ? buildSkeletonList() : buildFontsList()}
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
            <Grid container alignItems="center" justifyContent="center" spacing={2} columns={12} sx={{ mt: 2 }}>
              <Grid item xs={6.5}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6.5}>
                <TextField
                  required
                  fullWidth
                  value={description}
                  id="description"
                  label="Descrição"
                  name="description"
                  onChange={e => setDescription(e.target.value)}
                />
              </Grid>

              <Grid item xs={11} sx={{ mt: 2 }}>
                {inputChars.map((input, index) => {
                  return (
                    <Grid container
                      spacing={2}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ mt: 2 }}>
                      <TextField
                        required
                        id="charName"
                        label="Nome da característica"
                        name="name"
                        value={input.name}
                        sx={{ width: '40%', mr: 2 }}
                        onChange={event => handleCharChanges(index, event)}
                      />

                      <FormControl>
                        <InputLabel id="demo-simple-select-label">Possíveis Valores</InputLabel>
                        <Select
                          sx={{ width: 300 }}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          label="Possíveis Valores"
                          name="domain"
                          value={input.domain}
                          onChange={event => handleCharChanges(index, event)}
                        >
                          <MenuItem value="numeric">Apenas números</MenuItem>
                          <MenuItem value="textual">Apenas letras</MenuItem>
                          <MenuItem value="alphanumeric">Apenas letras e números</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  );
                })}
                <Grid container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center">
                  <Fab color="primary" aria-label="add" sx={{ ml: 18, mt: 2 }} onClick={handleClick}>
                    <AddIcon />
                  </Fab> <Typography sx={{ ml: 2, mt: 2 }}>Adicionar nova característica</Typography>
                </Grid>

              </Grid>
            </Grid>
            
          </Box>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
          Fonte registrada com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar open={openSnackDelete} autoHideDuration={6000} onClose={handleCloseSnackDelete}>
        <Alert onClose={handleCloseSnackDelete} severity="success" sx={{ width: '100%' }}>
          Fonte apagada com sucesso!
        </Alert>
      </Snackbar>
      <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
        </Backdrop>
    </Paper>
  );
}