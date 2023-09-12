import React, { Ref, forwardRef, useImperativeHandle, useState } from 'react';
import { VerticalStack } from 'src/ui/components/Layout';
import { IObjectInfo } from 'src/shared/objectInfo/ObjectInfo';
import { PropertyTypeEnum } from 'src/shared/objectInfo/PropertyType';
import { IFilterProperty, hasFilterPropertyValue } from 'src/shared/types/FilterProperty';
import { capitalizeFirstLetter } from 'src/shared/utils/base/string';
import { FilterInputNumber } from './components/FilterInputNumber';
import { FilterInputText } from './components/FilterInputText';
import { FilterMultiSelect } from './components/FilterMultiSelect';
import { FilterOneSelect } from './components/FilterOneSelect';

export interface IFormFilterRefType 
{
  getFilters: () => IFilterProperty[];
  clearFilters: () => void;
}

export interface IFormFilterProps
{
  /**
   * Свойства объекта
   */
  objectInfo: IObjectInfo;

  /**
   * Изначальное значение фильтров
   */
  initialFilterProperties:IFilterProperty[];
}

export const FormFilter = React.forwardRef((props:IFormFilterProps, ref: Ref<IFormFilterRefType>) => 
{
  const { objectInfo, initialFilterProperties } = props;

  const [filterProperties, setFilterProperties] = useState<IFilterProperty[]>(initialFilterProperties);

  const properties = objectInfo.getProperties();

  const handleSetFilterProperty = (fieldName: string, filterProperty: IFilterProperty) =>
  {
    let newFilterProperties = [...filterProperties];

    const hasValue = hasFilterPropertyValue(filterProperty);

    const findFilterProperty = newFilterProperties.find((x) => x.propertyName === filterProperty.propertyName);
    if(findFilterProperty)
    {
      if(hasValue)
      {
        findFilterProperty.function = filterProperty.function;
        findFilterProperty.isSensativeCase = filterProperty.isSensativeCase;
        findFilterProperty.value = filterProperty.value;
        findFilterProperty.values = filterProperty.values;
      }
      else
      {
        newFilterProperties = filterProperties.filter(x => x.propertyName !== filterProperty.propertyName);
      }
    }
    else
    {
      newFilterProperties.push(filterProperty);
    }

    setFilterProperties(newFilterProperties);
  }

  const clearFilters = () => 
  {
    setFilterProperties([]);
  }

  const getFilters = ():IFilterProperty[] => 
  {
    return (filterProperties);
  }

  useImperativeHandle(ref, () => ({ getFilters,  clearFilters}));

  return (
    <VerticalStack gap={1}>
      {
        properties.map((property, index) =>
        {
          if(!property.filtering) return <span key={index}></span>;

          if(property.filtering && property.filtering.variant === 'select')
          {
            return <FilterOneSelect
              isTopLabel
              options={property.options!}
              key={property.name}
              label={property.name}
              propertyDescriptor={property}
              initialFilterProperty={filterProperties.find(x => x.propertyName === capitalizeFirstLetter(property.fieldName))}
              onSetFilterProperty={handleSetFilterProperty} />
          }
          if(property.filtering && property.filtering.variant === 'multi-select')
          {
            return <FilterMultiSelect
              isTopLabel
              fullWidth
              options={property.options!}
              key={property.name}
              label={property.name}
              propertyDescriptor={property}
              initialFilterProperty={filterProperties.find(x => x.propertyName === capitalizeFirstLetter(property.fieldName))}
              onSetFilterProperty={handleSetFilterProperty} />
          }               

          switch(property.propertyType)
          {
            case PropertyTypeEnum.String : 
              return <FilterInputText
                isTopLabel
                key={property.name}
                label={property.name}
                propertyDescriptor={property} 
                initialFilterProperty={filterProperties.find(x => x.propertyName === capitalizeFirstLetter(property.fieldName))}
                onSetFilterProperty={handleSetFilterProperty} /> 
            case PropertyTypeEnum.Integer : 
            {
              return <FilterInputNumber
                isTopLabel
                key={property.name}
                label={property.name}
                property={property} 
                initialFilterProperty={filterProperties.find(x => x.propertyName === capitalizeFirstLetter(property.fieldName))}
                onSetFilterProperty={handleSetFilterProperty} />
            }
          }

          // eslint-disable-next-line consistent-return
          return (<></>);
        })
      }
    </VerticalStack>
  )
});
