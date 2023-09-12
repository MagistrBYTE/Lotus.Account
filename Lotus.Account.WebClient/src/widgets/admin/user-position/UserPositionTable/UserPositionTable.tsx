import React from 'react';
import { IUserPosition, UserPositionApi, UserPositionObjectInfo } from 'src/modules/admin/user-position';
import { TableView } from 'src/ui/components/DataView/TableView';

export const UserPositionTable: React.FC = () => 
{
  return (
    <TableView<IUserPosition>
      objectInfo={UserPositionObjectInfo}
      enableColumnResizing={true}
      onGetItems={UserPositionApi.getUserPositionsAsync}
      onAddItem={UserPositionApi.addUserPositionAsync}
      onUpdateItem={UserPositionApi.updateUserPositionAsync}
      onDeleteItem={UserPositionApi.removeUserPositionAsync}/>
  );
};