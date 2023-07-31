import { Badge, IconButton } from '@mui/material';
import React from 'react';
import MessageIcon from '@mui/icons-material/Message';

export interface IMessageItemProps
{
    isVisibleCaption: boolean;
    onClick?: ()=>void;
}

export const MessageItem: React.FC<IMessageItemProps> = ({isVisibleCaption, onClick}:IMessageItemProps) => 
{
  return <>
    <IconButton
      size="small"
      aria-label="show 17 new Messages"
      color="inherit"
      onClick={onClick}>
      <Badge badgeContent={17} color="error">
        <MessageIcon />
      </Badge>
    </IconButton>
    {isVisibleCaption && <span>Messages</span>}
  </>
};