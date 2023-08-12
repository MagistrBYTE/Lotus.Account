import React from 'react';
import { ListView } from 'src/ui/components/DataView/ListView/ListView';
import { NotificationApi } from 'src/shared/account/notification/api/NotificationApiService';
import { NotificationProperties, INotification } from 'src/shared/account/notification/domain/Notification';
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