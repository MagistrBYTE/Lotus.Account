import React from 'react';
import { PositionApi } from 'src/modules/position/api/PositionApiService';
import { IPosition, PositionProperties } from 'src/modules/position/domain/Position';
import { TableViewEdit } from 'src/ui/components/DataView/TableViewEdit';

export const PositionTable: React.FC = () => 
{
  return (
    <TableViewEdit<IPosition>
      propertiesInfo={PositionProperties}
      columns={[]}
      data={[]}
      enableColumnResizing={true}
      onGetItems={PositionApi.getPositionsAsync}
      onAddItemAsync={PositionApi.addPositionAsync}
      onUpdateItemAsync={PositionApi.updatePositionAsync}
      onDeleteItemAsync={PositionApi.removePositionAsync}/>
  );
};