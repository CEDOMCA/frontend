import { Box, Divider, ListItem, ListItemText, Typography } from "@mui/material";
import { ResourceListItemActions } from "./ResourceListItemActions";

export const ResourceListItem = (props) => {
    const { primary, secondary, onClickDelete, onClickUpdate } = props;

    return (
        <Box>
            <ListItem 
                secondaryAction={
                    <ResourceListItemActions 
                        onClickDelete={onClickDelete} 
                        onClickUpdate={onClickUpdate}
                    />
                }
            >
                <Box 
                    sx={{
                        maxWidth: '90%',
                        width: '100%',
                    }}
                >
                    <ListItemText 
                        primary={
                            <Typography variant='h6'>{primary}</Typography>
                        }
                        secondary={
                            <Typography variant='subtitle1'>{secondary}</Typography>
                        }
                    />

                </Box>
            </ListItem>
            <Divider/>
        </Box>            
    );
};