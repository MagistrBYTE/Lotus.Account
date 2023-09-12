import React, { useState } from 'react';
import { IPropertyDescriptor } from 'src/shared/objectInfo/PropertyDescriptor';
import { FilterFunctionEnum, IFilterFunctionDesc } from 'src/shared/types/FilterFunction';
import { UserGroupFilterFunctionEnum } from 'src/shared/types/FilterFunctionGroups';
import { IFilterProperty } from 'src/shared/types/FilterProperty';
import { capitalizeFirstLetter } from 'src/shared/utils/base/string';
import { OneSelect } from 'src/ui/components/Editor';
import { IOneSelectProps } from 'src/ui/components/Editor/OneSelect';
import { SelectFilterFunction } from 'src/ui/components/Editor/SelectFilterFunction';

export interface IFilterOneSelectProps extends IOneSelectProps<string>
{
  /**
   * Дескриптор свойства по которому идет фильтрация
   */
  propertyDescriptor: IPropertyDescriptor;

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

export const FilterOneSelect:React.FC<IFilterOneSelectProps> = (props:IFilterOneSelectProps) => 
{
  const { propertyDescriptor, initialFilterProperty, onSetFilterProperty, ...oneSelectProps} = props;

  const initFilterValue = initialFilterProperty === undefined ? undefined : initialFilterProperty.value;
  const initFilterFn = initialFilterProperty === undefined ? FilterFunctionEnum.Equals : initialFilterProperty.function

  const [filterValue, setFilterValue] = useState<string|undefined>(initFilterValue); 
  const [filterFunction, setFilterFunction] = useState<IFilterFunctionDesc>(initFilterFn); 

  const handleFilterValue = (selectedValue: string) => 
  {
    setFilterValue(selectedValue);

    const filterProperty: IFilterProperty =
    {
      propertyName: capitalizeFirstLetter(propertyDescriptor.fieldName),
      function: filterFunction,
      propertyType: propertyDescriptor.propertyType,
      isArray: propertyDescriptor.isArray,
      value: filterValue?.toString()
    };

    onSetFilterProperty(propertyDescriptor.fieldName, filterProperty);
  };

  return (
    <OneSelect<string> {...oneSelectProps} 
      initialSelectedValue={initFilterValue}
      value={filterValue} 
      onSetSelectedValue={handleFilterValue}
      rightElement=
        {
          <SelectFilterFunction
            initialFunctionFn={filterFunction}
            groupFilterFunctions={UserGroupFilterFunctionEnum}
            onSelectFilterFunction={setFilterFunction}/>
        } />
  )
};
