import { IPropertyDescriptor } from './PropertyDescriptor';

/**
 * Интерфейс для представления свойств объектов
 */
export interface IPropertiesInfo<TObject = any>
{
  getProperties():IPropertyDescriptor[];

  getPropertyDescriptorByName(name: string):IPropertyDescriptor;
}