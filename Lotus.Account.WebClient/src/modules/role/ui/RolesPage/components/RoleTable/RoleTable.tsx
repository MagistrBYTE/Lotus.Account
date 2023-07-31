import React from 'react';
import { RoleApi } from 'src/modules/role/api/RoleApiService';
import { IRole } from 'src/modules/role/domain/Role';
import { useRolePropertiesInfo } from 'src/modules/role/hooks/useRolePropertiesInfo';
import { TableViewEdit } from 'src/ui/components/DataView/TableViewEdit';

export const RoleTable: React.FC = () => 
{
  const propertiesInfo = useRolePropertiesInfo();

  return ( 
    <TableViewEdit<IRole> 
      propertiesInfo={propertiesInfo}
      columns={[]}
      data={[]}
      enableColumnResizing={true}
      onGetItems={RoleApi.getRolesAsync}
      onAddItemAsync={RoleApi.addRoleAsync}
      onUpdateItemAsync={RoleApi.updateRoleAsync}
      onDeleteItemAsync={RoleApi.removeRoleAsync}/>
  );
};