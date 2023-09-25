import React from 'react';
import { IUserRole, UserRoleApi, useUserRoleObjectInfo } from 'src/modules/admin/user-role';
import { TableView } from 'src/ui/components/DataView/TableView';

export const UserRoleTable: React.FC = () => 
{
  const objectInfo = useUserRoleObjectInfo();

  return ( 
    <TableView<IUserRole> 
      objectInfo={objectInfo}
      enableColumnResizing={true}
      enableEditing={true}
      enableRowActions={true}
      positionActionsColumn='last'
      enableColumnFilterModes={true}
      onGetItems={UserRoleApi.getUserRolesAsync}
      onAddItem={UserRoleApi.addUserRoleAsync}
      onUpdateItem={UserRoleApi.updateUserRoleAsync}
      onDeleteItem={UserRoleApi.removeUserRoleAsync}/>
  );
};