import { localization } from '../localization';

/**
 * Описание функции фильтрации
 */
export interface IFilterFunctionDesc
{
  id: number,
  name: string,
  abbr: string,
  desc: string 
}

/**
 * Перечисление для типа функции для фильтрации данных
 */
export const FilterFunctionEnum =
{
  /**
   * Равно аргументу
   */  
  Equals: 
  {
    id: 0,
    name: 'equals',
    abbr: localization.filtres.equalsAbbr,
    desc: localization.filtres.equals
  },

  /**
   * Не равно аргументу
   */
  NotEqual:
  {
    id: 1,
    name: 'notEquals',
    abbr: localization.filtres.notEqualAbbr,    
    desc: localization.filtres.notEqual
  },

  /**
   * Меньше аргумента
   */
  LessThan:
  {
    id: 2,
    name: 'lessThan',
    abbr: localization.filtres.lessThanAbbr, 
    desc: localization.filtres.lessThan
  },

  /**
   * Меньше или равно аргумента
   */
  LessThanOrEqual:
  {
    id: 3,
    name: 'lessThanOrEqualTo',
    abbr: localization.filtres.lessThanOrEqualAbbr, 
    desc: localization.filtres.lessThanOrEqual
  },

  /**
   * Больше аргумента
   */  
  GreaterThan:
  {
    id: 4,
    name: 'greaterThan',
    abbr: localization.filtres.greaterThanAbbr, 
    desc: localization.filtres.greaterThan    
  },

  /**
   * Больше или равно аргумента
   */  
  GreaterThanOrEqual:
  {
    id: 5,
    name: 'greaterThanOrEqualTo',
    abbr: localization.filtres.greaterThanOrEqualAbbr, 
    desc: localization.filtres.greaterThanOrEqual    
  },

  /**
   * Между первым аргументом (меньшим) и вторым аргументом (большим)
   */  
  Between:
  {
    id: 6,
    name: 'between',
    abbr: localization.filtres.betweenAbbr, 
    desc: localization.filtres.between    
  },
  
  /**
  * Aргумент(строка) может находиться в любом месте c учетом регистра
  */  
  Contains:
  {
    id: 7,
    name: 'contains',
    abbr: localization.filtres.contains, 
    desc: localization.filtres.contains        
  },

  /**
  * Aргумент(строка) может находиться в любом месте c учетом регистра
  */  
  StartsWith:
  {
    id: 8,
    name: 'startsWith',
    abbr: localization.filtres.startsWith, 
    desc: localization.filtres.startsWith        
  },

  /**
   * Aргумент(строка) должна находится в конце c учетом регистра
   */
  EndsWith:
  {
    id: 9,
    name: 'endsWith',
    abbr: localization.filtres.endsWith, 
    desc: localization.filtres.endsWith       
  },
  
  /**
   * Не равно пустой строке. Аргумент пустая строка
   */
  NotEmpty:
  {
    id: 10,
    name: 'notEmpty',
    abbr: localization.filtres.notEmpty, 
    desc: localization.filtres.notEmpty      
  },
  
  /**
   * Любой из проверяемых элементов списка должен находиться в массиве аргумента
   */
  IncludeAny:
  {
    id: 11,
    name: 'includeAny',
    abbr: localization.filtres.includeAny, 
    desc: localization.filtres.includeAny         
  },

  /**
   * Все из проверяемых элементов списка должен находиться в массиве аргумента
   */
  IncludeAll:
  {
    id: 12,
    name: 'includeAll',
    abbr: localization.filtres.includeAll, 
    desc: localization.filtres.includeAll         
  },

  /**
   * Проверяемые элементы списка должен быть равны массиву аргумента
   */
  IncludeEquals:
  {
    id: 13,
    name: 'includeEquals',
    abbr: localization.filtres.includeEquals, 
    desc: localization.filtres.includeEquals         
  },

  /**
   * Ни один из проверяемых элементов списка не должен находится в массиве аргумента
   */
  IncludeNone:
  {
    id: 14,
    name: 'includeNone',
    abbr: localization.filtres.includeNone, 
    desc: localization.filtres.includeNone        
  }  
} as const;

/**
 * Тип функция для фильтрации данных
 */
export type TFilterFunction = keyof typeof FilterFunctionEnum;