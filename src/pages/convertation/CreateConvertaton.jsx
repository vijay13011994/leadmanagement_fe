import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createConversationService } from '../../services/convertation.service';

export default function CreateConvertationDialog({open, setOpen, id}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
         fullWidth='xs' maxWidth='xs'
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async(event) => {
            try{
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                formJson.contact_id = id;
                const {msg} = await createConversationService(formJson);
                handleClose();
            }catch(e){
                alert(e)
            }
          },
        }}
      >
        <DialogTitle>Convertation</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="description"
            label="Description"
            type="text"
            multiline
            rows={3}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color='success' type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}