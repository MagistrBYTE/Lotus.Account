import { MRT_ColumnDef, MRT_ColumnFiltersState, MRT_FilterOption } from 'material-react-table';
import { capitalizeFirstLetter } from 'src/core/utils/base/string';
import { IFilterObjects, IFilterProperty } from '../filtering/FilterProperty';
import { FilterFunctionEnum } from '../filtering/FilterFunction';
import { convertToFilterFunctionDesc } from '../filtering/utilMaterialReactTable';
import { IPropertyDescriptor } from './PropertyDescriptor';
import { IPropertiesInfo } from './PropertiesInfo';
import { PropertyTypeEnum } from './PropertyType';

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

export const convertPropertiesInfoToColumns = <TItem extends Record<string, any>>(propertiesInfo: IPropertiesInfo):MRT_ColumnDef<TItem>[] =>
{
  const properties = propertiesInfo.getProperties();

  const columns = properties.map((x)=>
  {
    const column = convertPropertyDescriptorToColumn<TItem>(x);
    return column;
  });

  return columns;
}

export const convertColumnsFilterToFilterObjects = (propertiesInfo: IPropertiesInfo, columnFilters: MRT_ColumnFiltersState, 
  columnFiltersFns: Record<string, MRT_FilterOption>|undefined):IFilterObjects =>
{
  const properties = propertiesInfo.getProperties();

  const filteringAll: IFilterObjects = columnFilters.map((column) => 
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