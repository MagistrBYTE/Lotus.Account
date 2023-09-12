import React from 'react';
import { Typography } from '@mui/material';
import { IUserNotificationGroup } from 'src/modules/account/user-notifications';
import { UserNotificationCard } from '../UserNotificationCard';

export const UserNotificationGroup: React.FC<IUserNotificationGroup> = ({groupKey, items }:IUserNotificationGroup) => 
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
        return <UserNotificationCard key={index} {...x} />
      })
    }
  </>
}