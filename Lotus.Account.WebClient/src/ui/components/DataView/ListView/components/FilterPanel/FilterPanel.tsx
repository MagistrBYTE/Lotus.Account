import React, {  } from 'react';
import { Stack } from '@mui/material';
import { IPropertiesInfo } from 'src/shared/reflection/PropertiesInfo';
import { PropertyTypeEnum } from 'src/shared/reflection/PropertyType';
import { FilterInputText } from '../FilterInputText';
import { FilterInputNumber } from '../FilterInputNumber';

export interface IFilterPanelProps
{
  propertiesInfo: IPropertiesInfo;
}

export const FilterPanel:React.FC<IFilterPanelProps> = (props:IFilterPanelProps) => 
{
  const { propertiesInfo } = props;

  const propsDesc = propertiesInfo.getProperties();

  return (
    <Stack display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
      {
        propsDesc.map((property) =>
        {
          switch(property.propertyType)
          {
            case PropertyTypeEnum.String : return <FilterInputText property={property} /> 
            case PropertyTypeEnum.Integer : return <FilterInputNumber property={property} /> 
          }

          // eslint-disable-next-line consistent-return
          return (<></>);
        })
      }
    </Stack>
  )
};
