import React from 'react';
import { INotification } from 'src/modules/notification/domain/Notification';
import { Typography } from '@mui/material';
import { INotificationGroup } from 'src/modules/notification/domain/NotificationGroup';
import { NotificationCard } from '../NotificationCard';

export const NotificationGroup: React.FC<INotificationGroup> = ({groupKey, notifications}:INotificationGroup) => 
{
  return <>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <Typography variant='h6' margin={2} >
        {groupKey}
      </Typography>
    </div>
    {
      notifications.map((x, index)=>
      {
        return <NotificationCard key={index} {...x} />
      })
    }
  </>
}