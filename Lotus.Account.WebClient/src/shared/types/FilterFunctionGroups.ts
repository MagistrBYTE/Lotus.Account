import { FilterFunctionEnum, IFilterFunctionDesc } from './FilterFunction';

/**
 * Группа функций фильтрации для числовых типов
 */
export const UserGroupFilterFunctionNumber:IFilterFunctionDesc[] = 
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
export const UserGroupFilterFunctionString:IFilterFunctionDesc[] = 
[
  FilterFunctionEnum.Equals,
  FilterFunctionEnum.Contains,
  FilterFunctionEnum.StartsWith,
  FilterFunctionEnum.EndsWith,
  FilterFunctionEnum.NotEqual,
  FilterFunctionEnum.NotEmpty
];

/**
 * Группа функций фильтрации для перечисления
 */
export const UserGroupFilterFunctionEnum:IFilterFunctionDesc[] = 
[
  FilterFunctionEnum.Equals,
  FilterFunctionEnum.NotEqual
];

/**
 * Группа функций фильтрации для массива
 */
export const UserGroupFilterFunctionArray:IFilterFunctionDesc[] = 
[
  FilterFunctionEnum.IncludeAll,
  FilterFunctionEnum.IncludeAny,
  FilterFunctionEnum.IncludeEquals,
  FilterFunctionEnum.IncludeNone
];
