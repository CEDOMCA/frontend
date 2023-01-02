import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Stack } from '@mui/material';

export const ResourceListItemActions = (props) => {
  const { onClickDelete, onClickUpdate, isLoading } = props;

  return (
    !isLoading && (
      <Stack direction="column">
        <Button size="small" variant="text" startIcon={<EditIcon />} onClick={onClickUpdate}>
          Editar
        </Button>
        <Button
          size="small"
          variant="text"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={onClickDelete}
        >
          Excluir
        </Button>
      </Stack>
    )
  );
};
