import React from 'react';
import { ListView } from 'src/ui/components/DataView/ListView/ListView';
import { INotification, NotificationProperties } from 'src/modules/notification/domain/Notification';
import { NotificationApi } from 'src/modules/notification/api/NotificationApiService';
import { NotificationCard } from '../NotificationCard';

export const NotificationList: React.FC = () => 
{
  return (
    <ListView 
      onGetItems={NotificationApi.getNotificationsAsync}
      propertiesInfo={NotificationProperties}
      renderList={(list)=>
      {
        const groups:INotification[] = list as INotification[];
        return (<>
          {
            groups.map((group)=>
            {
              return <NotificationCard key={group.id} {...group}/>
            })
          }
        </>)
      }}
    />
  );
};