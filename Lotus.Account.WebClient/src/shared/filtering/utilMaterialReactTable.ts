import { MRT_FilterOption } from 'material-react-table';
import { IFilterFunctionDesc, FilterFunctionEnum } from './FilterFunction';

export const convertToFilterFunctionDesc = (filterFn: MRT_FilterOption):IFilterFunctionDesc =>
{
  switch(filterFn)
  {
    case 'equals': return FilterFunctionEnum.Equals;
    case 'equalsString': return FilterFunctionEnum.Equals; 
    case 'notEquals': return FilterFunctionEnum.NotEqual; 
    case 'lessThan': return FilterFunctionEnum.LessThan; 
    case 'greaterThan': return FilterFunctionEnum.GreaterThan; 
    case 'greaterThanOrEqualTo': return FilterFunctionEnum.LessThanOrEqual; 
    case 'between': return FilterFunctionEnum.Between; 
    case 'betweenInclusive': return FilterFunctionEnum.Between;     
    case 'contains':  return FilterFunctionEnum.Contains;
    case 'startsWith': return FilterFunctionEnum.StartsWith;  
    case 'endsWith': return FilterFunctionEnum.EndsWith;
    case 'notEmpty': return FilterFunctionEnum.NotEmpty;
    case 'includeAny': return FilterFunctionEnum.IncludeAny;
    case 'includeAll': return FilterFunctionEnum.IncludeAll;
    case 'includeEquals': return FilterFunctionEnum.IncludeEquals;
    case 'includeNone': return FilterFunctionEnum.IncludeNone;         
    default: return FilterFunctionEnum.Equals; 
  }
}

export const convertFromFilterFunctionDesc = (filterFn: IFilterFunctionDesc):MRT_FilterOption =>
{
  switch(filterFn)
  {
    case FilterFunctionEnum.Equals: return 'equals'; 
    case FilterFunctionEnum.NotEqual: return 'notEquals';
    case FilterFunctionEnum.LessThan: return 'lessThan';
    case FilterFunctionEnum.LessThanOrEqual: return 'lessThanOrEqualTo';
    case FilterFunctionEnum.GreaterThan: return 'greaterThan';
    case FilterFunctionEnum.GreaterThanOrEqual: return 'greaterThanOrEqualTo';
    case FilterFunctionEnum.Between: return 'between';  
    case FilterFunctionEnum.Contains:  return 'contains';
    case FilterFunctionEnum.StartsWith: return 'startsWith';   
    case FilterFunctionEnum.EndsWith: return 'endsWith';
    case FilterFunctionEnum.NotEmpty: return 'notEmpty'; 
    case FilterFunctionEnum.IncludeAny: return 'includeAny'; 
    case FilterFunctionEnum.IncludeAll: return 'includeAll'; 
    case FilterFunctionEnum.IncludeEquals: return 'includeEquals'; 
    case FilterFunctionEnum.IncludeNone: return 'includeNone';          
    default: return 'equals';  
  }
}