import React, { useState } from 'react';
import { SelectFilterFunction } from 'src/ui/components/Editor/SelectFilterFunction';
import { MultiSelect } from 'src/ui/components/Editor';
import { IMultiSelectProps } from 'src/ui/components/Editor/MultiSelect';
import { IPropertyDescriptor } from 'src/shared/objectInfo/PropertyDescriptor';
import { FilterFunctionEnum, IFilterFunctionDesc } from 'src/shared/types/FilterFunction';
import { UserGroupFilterFunctionArray } from 'src/shared/types/FilterFunctionGroups';
import { IFilterProperty } from 'src/shared/types/FilterProperty';
import { capitalizeFirstLetter } from 'src/shared/utils/base/string';

export interface IFilterMultiSelectProps extends IMultiSelectProps<string>
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

export const FilterMultiSelect:React.FC<IFilterMultiSelectProps> = (props:IFilterMultiSelectProps) => 
{
  const { propertyDescriptor, initialFilterProperty, onSetFilterProperty, ...multiSelectProps} = props;

  const initFilterValue = initialFilterProperty === undefined ? undefined : initialFilterProperty.values;
  const initFilterFn = initialFilterProperty === undefined ? FilterFunctionEnum.IncludeAny : initialFilterProperty.function;

  const [filterValue, setFilterValue] = useState<string[]>(initFilterValue ?? []); 
  const [filterFunction, setFilterFunction] = useState<IFilterFunctionDesc>(initFilterFn); 

  const handleFilterValue = (selectedValues: string[]) => 
  {
    setFilterValue(selectedValues);

    const filterProperty: IFilterProperty =
    {
      propertyName: capitalizeFirstLetter(propertyDescriptor.fieldName),
      function: filterFunction,
      propertyType: propertyDescriptor.propertyType,
      isArray: propertyDescriptor.isArray,
      values: selectedValues
    };

    onSetFilterProperty(propertyDescriptor.fieldName, filterProperty);
  };

  return (
    <MultiSelect<string> {...multiSelectProps}
      initialSelectedValues={initFilterValue}
      value={filterValue} 
      onSetSelectedValues={handleFilterValue}
      rightElement=
        {
          <SelectFilterFunction
            groupFilterFunctions={UserGroupFilterFunctionArray}
            initialFunctionFn={filterFunction}
            onSelectFilterFunction={setFilterFunction}/>
        } />
  )
};
