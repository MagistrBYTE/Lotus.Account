import { MRT_FilterOption } from 'material-react-table';
import { IFilterFunctionDesc } from '../filtering/FilterFunction';
import { convertFromFilterFunctionDesc } from '../filtering/utilMaterialReactTable';
import { IPropertyDescriptor } from './PropertyDescriptor';

/**
 * Интерфейс для представления(описания) свойств объектов
 */
export interface IPropertiesInfo<TObject = any>
{
  /**
   * Получение списка свойст
   */
  getProperties():IPropertyDescriptor[];

  /**
   * Получение свойства по имени
   * @param name Имя свойства 
   */
  getPropertyDescriptorByName(name: string):IPropertyDescriptor;

  /**
   * Получение списка функций фильтрации для свойств
   */
  getFilterFunctionsDesc():Record<string, IFilterFunctionDesc>

  /**
   * Получение списка функций фильтрации для свойств
   */
  getFilterOptions():Record<string, MRT_FilterOption>  
}

export class PropertiesInfoBase<TObject = any> implements IPropertiesInfo<TObject>
{
  public descriptors: IPropertyDescriptor[] = [];

  public getProperties(): IPropertyDescriptor[] 
  {
    return this.descriptors;
  }

  public getPropertyDescriptorByName(name: string):IPropertyDescriptor
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