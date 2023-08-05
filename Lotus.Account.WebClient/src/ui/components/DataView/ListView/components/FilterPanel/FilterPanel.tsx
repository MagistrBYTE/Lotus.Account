import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { IPropertiesInfo } from 'src/shared/reflection/PropertiesInfo';
import { PropertyTypeEnum } from 'src/shared/reflection/PropertyType';
import { IFilterProperty } from 'src/shared/filtering/FilterProperty';
import { FilterInputText } from '../FilterInputText';
import { FilterInputNumber } from '../FilterInputNumber';
import { capitalizeFirstLetter } from 'src/core/utils/base/string';

export interface IFilterPanelProps
{
  propertiesInfo: IPropertiesInfo;

  initialFilterProperties:IFilterProperty[];

  setFilterProperties: React.Dispatch<React.SetStateAction<IFilterProperty[]>>
}

export const FilterPanel:React.FC<IFilterPanelProps> = (props:IFilterPanelProps) => 
{
  const { propertiesInfo, initialFilterProperties, setFilterProperties } = props;

  const [filterPropertiesByName, setFilterPropertiesByName] = useState<Record<string, IFilterProperty>>();

  const properties = propertiesInfo.getProperties();

  const handleSetFilterProperty = (name: string, filterProperty: IFilterProperty) =>
  {
    const newFilterPropertiesByName = {...filterPropertiesByName};
    newFilterPropertiesByName[name] = filterProperty;

    setFilterPropertiesByName(newFilterPropertiesByName);

    const newFilterProperties:IFilterProperty[] = [];
    for (const key in newFilterPropertiesByName)
    {
      newFilterProperties.push(newFilterPropertiesByName[key]);
    }

    console.log(newFilterProperties);  
    setFilterProperties(newFilterProperties);
  }

  return (
    <Stack display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
      {
        properties.map((property, index) =>
        {
          switch(property.propertyType)
          {
            case PropertyTypeEnum.String : return <FilterInputText 
              key={property.name} 
              property={property} 
              initialFilterProperty={initialFilterProperties.find(x => x.propertyName === capitalizeFirstLetter(property.fieldName))}
              setFilterProperty={handleSetFilterProperty} /> 
            case PropertyTypeEnum.Integer : return <FilterInputNumber key={property.name} property={property} /> 
          }

          // eslint-disable-next-line consistent-return
          return (<></>);
        })
      }
    </Stack>
  )
};
