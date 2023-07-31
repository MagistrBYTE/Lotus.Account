import { FilterFunctionEnum, IFilterFunctionDesc, TFilterFunction } from './FilterFunction';

/**
 * Группа функций фильтрации для числовых типов
 */
export const GroupFilterFunctionNumber:IFilterFunctionDesc[] = 
[
  FilterFunctionEnum.Equals,
  FilterFunctionEnum.NotEqual,
  FilterFunctionEnum.LessThan,
  FilterFunctionEnum.LessThanOrEqual,
  FilterFunctionEnum.GreaterThan,
  FilterFunctionEnum.GreaterThanOrEqual,
  FilterFunctionEnum.Between
];

/**
 * Группа функций фильтрации для строк
 */
export const GroupFilterFunctionString:IFilterFunctionDesc[] = 
[
  FilterFunctionEnum.Between,
  FilterFunctionEnum.NotEqual,
  FilterFunctionEnum.Contains,
  FilterFunctionEnum.EndsWith,
  FilterFunctionEnum.NotEmpty
];
