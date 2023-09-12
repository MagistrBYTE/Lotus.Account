import React from 'react';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface IDialogAppBarProps
{
  /**
   * Заголовок диалога
   */
  title?: string;

  /**
   * Функция обратного вызова для закрытия диалога
   * @returns 
   */
  onClose: ()=>void;
}

export const DialogAppBar:React.FC<IDialogAppBarProps> = ({title, onClose, ...props}:IDialogAppBarProps) => 
{
  return (
    <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        {title}
      </Toolbar>
    </AppBar>
  );
};
