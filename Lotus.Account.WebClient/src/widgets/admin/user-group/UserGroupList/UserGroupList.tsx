import React from 'react';
import { ListView } from 'src/ui/components/DataView';
import { IUserGroup, UserGroupApi, UserGroupObjectInfo } from 'src/modules/admin/user-group';
import { UserGroupCard } from '../UserGroupCard';

export const UserGroupList: React.FC = () => 
{
  return (
    <ListView 
      onGetItems={UserGroupApi.getUserGroupsAsync}
      objectInfo={UserGroupObjectInfo}
      renderList={(list)=>
      {
        const groups:IUserGroup[] = list as IUserGroup[];
        return (<>
          {
            groups.map((group, index)=>
            {
              return <UserGroupCard key={index} {...group}/>
            })
          }
        </>)
      }}
    />
  );
};