import React from 'react';
import { Typography, Chip, Button, Card, CardActions, CardContent, CardHeader, IconButton, Menu, MenuItem } from '@mui/material';
import { SquareChip } from 'src/ui/components/Display/SquareChip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IUserNotification, UserNotificationImportanceHelper } from 'src/modules/account/user-notifications';
import { localization } from 'src/resources/localization';

export const UserNotificationCard: React.FC<IUserNotification> = ({topic, sender, importance, created, id, isRead, content}:IUserNotification) => 
{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => 
  {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => 
  {
    setAnchorEl(null);
  };  

  return <Card sx={{ minWidth: 280, margin: 2 }}>
    {importance &&
    <CardHeader 
      title={importance && <Chip label={UserNotificationImportanceHelper.convertToText(importance)} color={UserNotificationImportanceHelper.convertToColor(importance)} size='small' />}
      subheader={<SquareChip label={localization.notification.topic + ':'} text={topic} variant='filled'/>}
      action={
        <>
          <IconButton aria-label="settings" onClick={handleOpenMenu}>
            <MoreVertIcon  />   
          </IconButton>
          <Menu
            id="menu-notification-card"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            {isRead && <MenuItem onClick={handleCloseMenu}>{localization.notification.readCancel}</MenuItem>}
            <MenuItem onClick={handleCloseMenu}>{localization.notification.toArchive}</MenuItem>
            <MenuItem onClick={handleCloseMenu}>{localization.notification.fromArchive}</MenuItem>
          </Menu>
        </>
      }
    >
    </CardHeader>
    }
    {!importance &&
    <CardHeader 
      title={<SquareChip label={localization.notification.topic + ':'} text={topic} variant='filled'/>}>
    </CardHeader>
    }
    <CardContent>
      <Typography variant='body2'>
        {content}
      </Typography>
    </CardContent>
    <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <SquareChip label={localization.notification.sender + ':'} text={sender}/>
      <Button disabled={isRead} size='small'>{localization.notification.read}</Button>
    </CardActions>
  </Card>
}