import { Badge, IconButton } from '@mui/material';
import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { paths } from 'src/app/routes/paths';
import { useNavigate } from 'react-router-dom';
import { localization } from 'src/shared/localization';
import { useNotificationState } from '../../store/NotificationSelector';

export interface NotificationInfoButtonProps
{
    isVisibleCaption: boolean;
    onClick?: ()=>void;
}

export const NotificationInfoButton: React.FC<NotificationInfoButtonProps> = ({isVisibleCaption}:NotificationInfoButtonProps) => 
{
  const navigate = useNavigate();
  const notificationState = useNotificationState();

  return <>
    <IconButton
      size="small"
      color="inherit"
      onClick={()=>{navigate(paths.notifications())}}>
      <Badge badgeContent={notificationState.countNotRead} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
    {isVisibleCaption && <span>{localization.notification.notification}</span>}
  </>
};