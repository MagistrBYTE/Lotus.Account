import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@mui/material';
import { SelectFilterFunction } from 'src/ui/components/Editor/SelectFilterFunction';
import { ILabelProps, Label } from 'src/ui/components/Display/Label';
import { HorizontalStack } from 'src/ui/components/Layout';
import { IPropertyDescriptor } from 'src/shared/objectInfo/PropertyDescriptor';
import { IFilterFunctionDesc, FilterFunctionEnum } from 'src/shared/types/FilterFunction';
import { UserGroupFilterFunctionNumber } from 'src/shared/types/FilterFunctionGroups';
import { IFilterProperty } from 'src/shared/types/FilterProperty';
import { capitalizeFirstLetter } from 'src/shared/utils/base/string';

export interface IFilterInputNumberProps extends ILabelProps 
{
  /**
   * Дескриптор свойства по которому идет фильтрация
   */
  property: IPropertyDescriptor;

  /**
   * Функция обратного вызова для установки выбранного фильтра
   * @param fieldName Имя поля
   * @param filterProperty Фильтрация свойства
   * @returns 
   */
  onSetFilterProperty: (fieldName: string, filterProperty: IFilterProperty) => void;

  /**
   * Изначальное значение фильтра свойства
   */
  initialFilterProperty?:IFilterProperty;
}

export const FilterInputNumber:React.FC<IFilterInputNumberProps> = (props:IFilterInputNumberProps) => 
{
  const { property, initialFilterProperty, onSetFilterProperty, ...labelProps} = props;

  const [filterValue, setFilterValue] = useState<number|null>(); 
  const [filterFunction, setFilterFunction] = useState<IFilterFunctionDesc>(FilterFunctionEnum.Equals); 

  const handleFilterValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => 
  {
    setFilterValue(Number(event.target.value));

    const filterProperty: IFilterProperty =
    {
      propertyName: capitalizeFirstLetter(property.fieldName),
      function: filterFunction,
      propertyType: property.propertyType,
      isArray: property.isArray,
      value: filterValue?.toString()
    };

    onSetFilterProperty(property.fieldName, filterProperty);    
  };

  return (
    <Label {...labelProps} >
      <HorizontalStack fullWidth>  
        <TextField value={filterValue} onChange={handleFilterValue} type='number'/>
        <SelectFilterFunction 
          initialFunctionFn={filterFunction}
          groupFilterFunctions={UserGroupFilterFunctionNumber}
          onSelectFilterFunction={setFilterFunction}/>
      </HorizontalStack>
    </Label>
  )
};
