import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
    Paper,
    AppBar,
    Toolbar,
    Stack,
    TextField,
    Button
} from '@mui/material';
//import { ResourceListItem } from '../../components/ResourceListItem/ResourceListItem';

export default function Arts() {
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
                        //onChange={(event) => setSearchString(event.target.value)}
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
        </Paper>
    )
}