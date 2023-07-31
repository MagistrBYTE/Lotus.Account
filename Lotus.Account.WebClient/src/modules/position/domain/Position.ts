import { IConstantable } from 'src/core/types/Constantable';
import { IEditable } from 'src/core/types/Editable';
import { FilterFunctionEnum } from 'src/shared/filtering/FilterFunction';
import { localization } from 'src/shared/localization';
import { IPropertiesInfo } from 'src/shared/reflection/PropertiesInfo';
import { IPropertyDescriptor } from 'src/shared/reflection/PropertyDescriptor';
import { PropertyTypeEnum } from 'src/shared/reflection/PropertyType';

export interface IPosition extends IEditable, IConstantable
{
    id: number;
    name: string;
    shortName?: string;
}

export class PositionPropertiesInfo implements IPropertiesInfo<IPosition>
{
  private static _positionPropertiesInfo: PositionPropertiesInfo;

  public static get Instance(): PositionPropertiesInfo 
  {
    return (this._positionPropertiesInfo || (this._positionPropertiesInfo = new this()));
  }

  public descriptors: IPropertyDescriptor[] = [];

  constructor() 
  {
    this.Init();
    this.getProperties = this.getProperties.bind(this);
    this.getPropertyDescriptorByName = this.getPropertyDescriptorByName.bind(this);    
  }

  private Init()
  {
    const idProp:IPropertyDescriptor = 
    {
      fieldName: 'id',
      name: localization.position.id,
      desc: localization.position.idDesc,
      propertyType: PropertyTypeEnum.Guid,
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(idProp);

    const nameProp:IPropertyDescriptor = 
    {
      fieldName: 'name',
      name: localization.position.name,
      desc: localization.position.nameDesc,
      propertyType: PropertyTypeEnum.String,
      editing: 
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IPosition|null)=>
        {
          if(item && item.name === '')
          {
            return {error: true, text: localization.validation.required};
          }
          if(item && item.name.length > 20)
          {
            return {error: true, text: localization.validation.maxLength(20)};
          }        
          return {error: false, text: ''};
        }
      },
      filtering:
      {
        functionDefault: FilterFunctionEnum.Contains,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(nameProp);

    const shortNameProp:IPropertyDescriptor = 
    {
      fieldName: 'shortName',
      name: localization.position.shortName,
      desc: localization.position.shortNameDesc,
      propertyType: PropertyTypeEnum.String,
      editing: 
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IPosition|null) =>
        {
          if(item && item.shortName === '')
          {
            return {error: true, text: localization.validation.required};
          }
          return {error: false, text: ''};
        }
      },
      filtering:
      {
        functionDefault: FilterFunctionEnum.Contains,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(shortNameProp);    
  }

  public getProperties(): IPropertyDescriptor[] 
  {
    return this.descriptors;
  }

  public getPropertyDescriptorByName(name: string):IPropertyDescriptor
  {
    return this.descriptors.find(x => x.fieldName === name)!;
  }
}

/**
 * Глобальный экземпляр для доступа к описанию свойств должности 
 */
export const PositionProperties = PositionPropertiesInfo.Instance;