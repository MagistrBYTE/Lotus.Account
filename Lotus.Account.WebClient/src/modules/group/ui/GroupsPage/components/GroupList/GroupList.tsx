import React from 'react';
import { GroupApi } from 'src/modules/group';
import { GroupProperties, IGroup } from 'src/modules/group/domain/Group';
import { ListView } from 'src/ui/components/DataView/ListView/ListView';
import { GroupCard } from '../GroupCard';

export const GroupList: React.FC = () => 
{
  return (
    <ListView 
      onGetItems={GroupApi.getGroupsAsync}
      propertiesInfo={GroupProperties}
      renderList={(list)=>
      {
        const groups:IGroup[] = list as IGroup[];
        return (<>
          {
            groups.map((group)=>
            {
              return <GroupCard key={group.id} {...group}/>
            })
          }
        </>)
      }}
    />
  );
};