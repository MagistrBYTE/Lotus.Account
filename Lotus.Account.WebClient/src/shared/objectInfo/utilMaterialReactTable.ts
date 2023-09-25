import { MRT_ColumnDef, MRT_ColumnFiltersState, MRT_FilterOption } from 'material-react-table';
import { FilterFunctionEnum } from '../types/FilterFunction';
import { IFilterObject, IFilterProperty } from '../types/FilterProperty';
import { capitalizeFirstLetter } from '../utils/base/string';
import { convertToFilterFunctionDesc } from '../utils/utilsFilterFunction';
import { IObjectInfo } from './ObjectInfo';
import { PropertyTypeEnum } from './PropertyType';
import { IPropertyDescriptor } from './PropertyDescriptor';

export const getDefaultFilterFunction = (property: IPropertyDescriptor):MRT_FilterOption =>
{
  switch(property.propertyType)
  {
    case PropertyTypeEnum.String: return 'contains'; 
    case PropertyTypeEnum.Enum: return 'arrIncludesSome'; 
  }

  return 'equals';
}

export const convertPropertyDescriptorToColumn = <TItem extends Record<string, any>>(property: IPropertyDescriptor):MRT_ColumnDef<TItem> =>
{
  const column:MRT_ColumnDef<TItem> =
  {
    // @ts-ignore 
    accessorKey: property.fieldName,
    header: property.name,
    

    // Фильтрация
    enableColumnFilter: (property.filtering && property.filtering.enabled) ?? false,
    filterVariant: property.filtering && property.filtering.variant,
    filterFn: getDefaultFilterFunction(property),
    filterSelectOptions: property.options,

    // Сортировка
    enableSorting: (property.sorting && property.sorting.enabled) ?? false,

    // Редактирование
    enableEditing: (property.editing && property.editing.enabled) ?? false 
  }

  return column;
}

export const convertObjectInfoToColumns = <TItem extends Record<string, any>>(objectInfo: IObjectInfo):MRT_ColumnDef<TItem>[] =>
{
  const properties = objectInfo.getProperties();

  const columns = properties.map((x)=>
  {
    const column = convertPropertyDescriptorToColumn<TItem>(x);
    return column;
  });

  return columns;
}

export const convertColumnsFilterToFilterObjects = (objectInfo: IObjectInfo, columnFilters: MRT_ColumnFiltersState, 
  columnFiltersFns: Record<string, MRT_FilterOption>|undefined):IFilterObject =>
{
  const properties = objectInfo.getProperties();

  const filteringAll: IFilterObject = columnFilters.map((column) => 
  {
    const filter: IFilterProperty = 
    { 
      propertyName: '', 
      propertyType: PropertyTypeEnum.Boolean, 
      function: FilterFunctionEnum.Equals, 
      value: '' 
    };

    const property = properties.find((x) => x.fieldName === column.id)

    if (property?.filtering && property?.filtering.enabled && columnFiltersFns) 
    {
      const filterFn = columnFiltersFns[column.id];

      filter.propertyName = capitalizeFirstLetter(column.id);
      filter.propertyType = property.propertyType!;
      filter.function = convertToFilterFunctionDesc(filterFn);

      if(filter.function === FilterFunctionEnum.IncludeAll || 
        filter.function === FilterFunctionEnum.IncludeAny  || 
        filter.function === FilterFunctionEnum.IncludeEquals ||
        filter.function === FilterFunctionEnum.IncludeNone)
      {
        filter.values = (column.value as string[]);
      }
      else
      {
        filter.value = (column.value as any).toString();
      }
      filter.function = convertToFilterFunctionDesc(filterFn);
    }

    return filter;
  });

  const filtering = filteringAll.filter((x) => x.propertyName !== '');

  return filtering;
}