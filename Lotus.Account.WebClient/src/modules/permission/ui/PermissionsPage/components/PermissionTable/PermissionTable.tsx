import React from 'react';
import { PermissionApi } from 'src/modules/permission/api/PermissionApiService';
import { IPermission, PermissionProperties } from 'src/modules/permission/domain/Permission';
import { TableViewEdit } from 'src/ui/components/DataView/TableViewEdit';

export const PermissionTable: React.FC = () => 
{
  return (
    <TableViewEdit<IPermission> 
      propertiesInfo={PermissionProperties}
      columns={[]}
      data={[]}
      enableColumnResizing={true}
      onGetItems={PermissionApi.getPermissionsAsync}
      onAddItemAsync={PermissionApi.addPermissionAsync}
      onUpdateItemAsync={PermissionApi.updatePermissionAsync}
      onDeleteItemAsync={PermissionApi.removePermissionAsync}/>
  );
};