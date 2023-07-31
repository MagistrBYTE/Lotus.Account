import { IPropertyTypeDesc } from '../reflection/PropertyType';
import { IFilterFunctionDesc } from './FilterFunction';

/**
 * Интерфейс для фильтрации по одному свойству
 */
export interface IFilterProperty
{
  /**
   * Имя свойства по которому осуществляется фильтрация
   */
  propertyName: string;

  /**
   * Функция для фильтрации
   */
  function: IFilterFunctionDesc;

  /**
   * Тип свойства
   */
  propertyType: IPropertyTypeDesc; 

  /**
   * Статус типа свойства - массив
   */
  isArray?: boolean;

  /**
  * Учитывать регистр при фильтрации строк
  */
  isSensativeCase?: boolean; 

  /**
   * Значение
   */
  value?:string;

  /**
   * Массив значений
   */
  values?:string[];

}

/**
 * Тип для фильтрации объектов
 */
export type IFilterObjects = IFilterProperty[];