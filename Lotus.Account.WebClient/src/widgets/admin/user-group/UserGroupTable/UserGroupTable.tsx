import React from 'react';
import { IUserGroup, UserGroupApi, UserGroupObjectInfo } from 'src/modules/admin/user-group';
import { TableView } from 'src/ui/components/DataView/TableView';

export const UserGroupTable: React.FC = () => 
{
  return (
    <TableView<IUserGroup> 
      objectInfo={UserGroupObjectInfo}
      enableColumnResizing={true}
      enableEditing={true}
      enableRowActions={true}
      positionActionsColumn='last'
      enableColumnFilterModes={true}
      onGetItems={UserGroupApi.getUserGroupsAsync}
      onAddItem={UserGroupApi.addUserGroupAsync}
      onUpdateItem={UserGroupApi.updateUserGroupAsync}
      onDeleteItem={UserGroupApi.removeUserGroupAsync}/>
  );
};