import React from 'react';
import { INotification, INotificationGroup } from 'src/modules/notification/domain/Notification';
import { Typography } from '@mui/material';
import { NotificationCard } from '../NotificationCard';

export const NotificationGroup: React.FC<INotificationGroup> = ({groupKey, items }:INotificationGroup) => 
{
  return <>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <Typography variant='h6' margin={2} >
        {groupKey}
      </Typography>
    </div>
    {
      items.map((x, index)=>
      {
        return <NotificationCard key={index} {...x} />
      })
    }
  </>
}