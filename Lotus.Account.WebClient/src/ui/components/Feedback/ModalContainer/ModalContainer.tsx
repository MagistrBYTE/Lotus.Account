import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import { localization } from 'src/resources/localization';
import { DialogAppBar } from '../../Display';

export const ModalContainer:React.FC = () =>
{
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenModal = () =>
  {
    setOpenDialog(true);
  }

  const handleCloseModal = () =>
  {
    setOpenDialog(false);
  }

  const handleCancelModal = () =>
  {

  }

  const handleOkModal = () =>
  {

  }
  
  useEffect(() => 
  {
    window.addEventListener('openModal', handleOpenModal);

    return () => 
    {
      window.removeEventListener('openModal', handleOpenModal);
    };
  }, [])  
  

  return (<Dialog
    fullScreen
    open={openDialog}
    onClose={handleCloseModal}>
    <DialogAppBar onClose={handleCloseModal}/>
    <DialogContent>
      <>Пример</>
    </DialogContent>
    <DialogActions>
      <Button variant='outlined' onClick={handleCancelModal}>{localization.actions.cancel}</Button>
      <Button variant='outlined' color='primary' autoFocus onClick={handleOkModal}>{localization.actions.confirm}</Button>
    </DialogActions>
  </Dialog>)
} 
