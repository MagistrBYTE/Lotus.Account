import { MRT_FilterOption } from 'material-react-table';
import { IFilterFunctionDesc } from '../types/FilterFunction';
import { convertFromFilterFunctionDesc } from '../utils/utilsFilterFunction';
import { IPropertyDescriptor } from './PropertyDescriptor';

/**
 * Интерфейс для представления(описания) свойств объектов
 */
export interface IObjectInfo<TObject = any>
{
  /**
   * Получение списка свойств
   */
  getProperties():IPropertyDescriptor[];

  /**
   * Получение списка свойств поддерживающих сортировку
   */
  getPropertiesSorted():IPropertyDescriptor[];  

  /**
   * Получение свойства по имени
   * @param name Имя свойства 
   */
  getPropertyByName(name: string):IPropertyDescriptor;

  /**
   * Получение списка функций фильтрации для свойств
   */
  getFilterFunctionsDesc():Record<string, IFilterFunctionDesc>

  /**
   * Получение списка функций фильтрации для свойств
   */
  getFilterOptions():Record<string, MRT_FilterOption>  
}

/**
 * Базовый класс для представления(описания) свойств объектов
 */
export class ObjectInfoBase<TObject = any> implements IObjectInfo<TObject>
{
  public descriptors: IPropertyDescriptor[] = [];

  constructor() 
  {
    this.getProperties = this.getProperties.bind(this);
    this.getPropertiesSorted = this.getPropertiesSorted.bind(this);
    this.getPropertyByName = this.getPropertyByName.bind(this);
    this.getFilterFunctionsDesc = this.getFilterFunctionsDesc.bind(this); 
    this.getFilterOptions = this.getFilterOptions.bind(this);         
  }

  public getProperties(): IPropertyDescriptor[] 
  {
    return this.descriptors;
  }

  public getPropertiesSorted():IPropertyDescriptor[]
  {
    return this.descriptors.filter(x => (x.sorting && x.sorting.enabled));
  }

  public getPropertyByName(name: string):IPropertyDescriptor
  {
    return this.descriptors.find(x => x.fieldName === name)!;
  }

  public getFilterFunctionsDesc():Record<string, IFilterFunctionDesc>
  {
    const filterFunctions:Record<string, IFilterFunctionDesc> = {};

    this.descriptors.forEach((x) => 
    {
      if(x.filtering && x.filtering.enabled)
      {
        filterFunctions[`${x.fieldName}`] = x.filtering.functionDefault;
      }
    })

    return filterFunctions;
  }

  public getFilterOptions():Record<string, MRT_FilterOption>
  {
    const filterFunctions:Record<string, MRT_FilterOption> = {};

    this.descriptors.forEach((x) => 
    {
      if(x.filtering && x.filtering.enabled)
      {
        filterFunctions[`${x.fieldName}`] = convertFromFilterFunctionDesc(x.filtering.functionDefault);
      }
    })

    return filterFunctions;
  }   
}