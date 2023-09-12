import React from 'react';
import { IUserPermission, UserPermissionApi, UserPermissionObjectInfo } from 'src/modules/admin/user-permission';
import { TableView } from 'src/ui/components/DataView';

export const UserPermissionTable: React.FC = () => 
{
  return (
    <TableView<IUserPermission> 
      objectInfo={UserPermissionObjectInfo}
      enableColumnResizing={true}
      onGetItems={UserPermissionApi.getUserPermissionsAsync}
      onAddItem={UserPermissionApi.addUserPermissionAsync}
      onUpdateItem={UserPermissionApi.updateUserPermissionAsync}
      onDeleteItem={UserPermissionApi.removeUserPermissionAsync}/>
  );
};