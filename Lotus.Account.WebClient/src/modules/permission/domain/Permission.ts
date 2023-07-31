import { IConstantable } from 'src/core/types/Constantable';
import { IEditable } from 'src/core/types/Editable';
import { FilterFunctionEnum } from 'src/shared/filtering/FilterFunction';
import { localization } from 'src/shared/localization';
import { IPropertiesInfo } from 'src/shared/reflection/PropertiesInfo';
import { IPropertyDescriptor } from 'src/shared/reflection/PropertyDescriptor';
import { PropertyTypeEnum } from 'src/shared/reflection/PropertyType';

/**
 * Разрешение
 */
export interface IPermission extends IEditable, IConstantable
{
    /**
     * Идентификатор
     */
    id: number;

    /**
     * Системное имя
     */
    systemName: string;

    /**
     * Отображаемое имя
     */
    dispalyName?: string;
}

export class PermissionPropertiesInfo implements IPropertiesInfo<IPermission>
{
  private static _permissionPropertiesInfo: PermissionPropertiesInfo;

  public static get Instance(): PermissionPropertiesInfo 
  {
    return (this._permissionPropertiesInfo || (this._permissionPropertiesInfo = new this()));
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
      name: localization.permission.id,
      desc: localization.permission.idDesc,
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
      name: localization.permission.systemName,
      desc: localization.permission.systemNameDesc,
      propertyType: PropertyTypeEnum.String,
      editing: 
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IPermission|null)=>
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
      name: localization.permission.displayName,
      desc: localization.permission.displayNameDesc,
      propertyType: PropertyTypeEnum.String,
      editing: 
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IPermission|null)=>
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
 * Глобальный экземпляр для доступа к описанию свойств разрешений 
 */
export const PermissionProperties = PermissionPropertiesInfo.Instance;