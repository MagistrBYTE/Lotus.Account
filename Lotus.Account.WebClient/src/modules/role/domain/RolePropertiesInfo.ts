import { FilterFunctionEnum } from 'src/shared/filtering/FilterFunction';
import { localization } from 'src/shared/localization';
import { IPropertiesInfo } from 'src/shared/reflection/PropertiesInfo';
import { IPropertyDescriptor } from 'src/shared/reflection/PropertyDescriptor';
import { PropertyTypeEnum } from 'src/shared/reflection/PropertyType';
import { ValidationResultSuccess } from 'src/shared/validation/ValidationResult';
import { IRole } from './Role';

export class RolePropertiesInfo implements IPropertiesInfo<IRole>
{
  private static _rolePropertiesInfo: RolePropertiesInfo;

  public static get Instance(): RolePropertiesInfo 
  {
    return (this._rolePropertiesInfo || (this._rolePropertiesInfo = new this()));
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
      name: localization.role.id,
      desc: localization.role.idDesc,
      propertyType: PropertyTypeEnum.Guid,
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(idProp);

    const systemNameProp:IPropertyDescriptor = 
    {
      fieldName: 'systemName',
      name: localization.role.systemName,
      desc: localization.role.systemNameDesc,
      propertyType: PropertyTypeEnum.String,
      editing: 
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IRole|null)=>
        {
          if(item && item.systemName === '')
          {
            return {error: true, text: localization.validation.required};
          }
          if(item && item.systemName.length > 20)
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

    this.descriptors.push(systemNameProp);

    const displayNameProp:IPropertyDescriptor = 
    {
      fieldName: 'displayName',
      name: localization.role.displayName,
      desc: localization.role.displayNameDesc,
      propertyType: PropertyTypeEnum.String,
      editing: 
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IRole|null)=>
        {
          if(item && item.dispalyName === '')
          {
            return {error: true, text: localization.validation.required};
          }
          if(item && item.dispalyName && item.dispalyName.length > 40)
          {
            return {error: true, text: localization.validation.maxLength(40)};
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

    this.descriptors.push(displayNameProp);

    const permissionIdsProp:IPropertyDescriptor = 
    {
      fieldName: 'permissionIds',
      name: localization.role.permissionIds,
      desc: localization.role.permissionIdsDesc,
      propertyType: PropertyTypeEnum.Integer,
      isArray: true,
      editing: 
      {
        enabled: true,
        required: true,
        editorType: 'multi-select',
        onValidation: (item: IRole|null)=> { return ValidationResultSuccess } 
      },
      filtering:
      {
        functionDefault: FilterFunctionEnum.IncludeAny,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(permissionIdsProp);       
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
 * Глобальный экземпляр для доступа к описанию свойств ролей 
 */
export const RoleProperties = RolePropertiesInfo.Instance;