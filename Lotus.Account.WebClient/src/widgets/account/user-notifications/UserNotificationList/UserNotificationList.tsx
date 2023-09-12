import React from 'react';
import { ListView } from 'src/ui/components/DataView';
import { IUserNotification, UserNotificationApi, UserNotificationObjectInfo } from 'src/modules/account/user-notifications';
import { UserNotificationCard } from '../UserNotificationCard';

export const UserNotificationList: React.FC = () => 
{
  return (
    <ListView 
      onGetItems={UserNotificationApi.getUserNotificationsAsync}
      objectInfo={UserNotificationObjectInfo}
      renderList={(list)=>
      {
        const groups:IUserNotification[] = list as IUserNotification[];
        return (<>
          {
            groups.map((group)=>
            {
              return <UserNotificationCard key={group.id} {...group}/>
            })
          }
        </>)
      }}
    />
  );
};