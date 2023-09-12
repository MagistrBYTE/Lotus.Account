import React, { useState } from 'react';
import { IPropertyDescriptor } from 'src/shared/objectInfo/PropertyDescriptor';
import { IFilterFunctionDesc, FilterFunctionEnum } from 'src/shared/types/FilterFunction';
import { UserGroupFilterFunctionString } from 'src/shared/types/FilterFunctionGroups';
import { IFilterProperty } from 'src/shared/types/FilterProperty';
import { capitalizeFirstLetter } from 'src/shared/utils/base/string';
import { IInputTextProps, InputText } from 'src/ui/components/Editor/InputText';
import { SelectFilterFunction } from 'src/ui/components/Editor/SelectFilterFunction';

export interface IFilterInputTextProps extends IInputTextProps
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

export const FilterInputText:React.FC<IFilterInputTextProps> = (props:IFilterInputTextProps) => 
{
  const { propertyDescriptor, initialFilterProperty, onSetFilterProperty, ...inputProps} = props;

  const initFilterValue = initialFilterProperty === undefined ? undefined : initialFilterProperty.value;

  const [filterValue, setFilterValue] = useState<string|undefined>(initFilterValue); 
  const [filterFunction, setFilterFunction] = useState<IFilterFunctionDesc>(initialFilterProperty === undefined ? FilterFunctionEnum.Contains : initialFilterProperty.function); 

  const handleFilterValue = (value: string) => 
  {
    setFilterValue(value);

    const filterProperty: IFilterProperty =
    {
      propertyName: capitalizeFirstLetter(propertyDescriptor.fieldName),
      function: filterFunction,
      propertyType: propertyDescriptor.propertyType,
      isArray: propertyDescriptor.isArray,
      value: value
    };

    onSetFilterProperty(propertyDescriptor.fieldName, filterProperty);
  };

  return (
    <InputText {...inputProps}
      initialValue={initFilterValue}
      value={filterValue} 
      onSetValue={handleFilterValue}
      rightElement=
        {
          <SelectFilterFunction
            initialFunctionFn={filterFunction}
            groupFilterFunctions={UserGroupFilterFunctionString}
            onSelectFilterFunction={setFilterFunction}/>      
        }
    />
  )
};
