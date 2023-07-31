import React from 'react';
import { GroupApi } from 'src/modules/group/api/GroupApiService';
import { GroupProperties, IGroup } from 'src/modules/group/domain/Group';
import { TableViewEdit } from 'src/ui/components/DataView/TableViewEdit';

export const GroupTable: React.FC = () => 
{
  return (
    <TableViewEdit<IGroup> 
      propertiesInfo={GroupProperties}
      columns={[]}
      data={[]}
      enableColumnResizing={true}
      onGetItems={GroupApi.getGroupsAsync}
      onAddItemAsync={GroupApi.addGroupAsync}
      onUpdateItemAsync={GroupApi.updateGroupAsync}
      onDeleteItemAsync={GroupApi.removeGroupAsync}/>
  );
};