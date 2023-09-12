import { localization } from 'src/resources/localization';
import { ObjectInfoBase } from 'src/shared/objectInfo/ObjectInfo';
import { IPropertyDescriptor } from 'src/shared/objectInfo/PropertyDescriptor';
import { PropertyTypeEnum } from 'src/shared/objectInfo/PropertyType';
import { FilterFunctionEnum } from 'src/shared/types/FilterFunction';
import { IUserPermission } from './UserPermission';


class UserPermissionObjectInfoClass extends ObjectInfoBase<IUserPermission>
{
  private static _permissionObjectInfo: UserPermissionObjectInfoClass;

  public static get Instance(): UserPermissionObjectInfoClass 
  {
    return (this._permissionObjectInfo || (this._permissionObjectInfo = new this()));
  }

  constructor() 
  {
    super()
    this.Init();
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

    const nameProp:IPropertyDescriptor = 
    {
      fieldName: 'name',
      name: localization.permission.name,
      desc: localization.permission.nameDesc,
      propertyType: PropertyTypeEnum.String,
      editing: 
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IUserPermission|null)=>
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
        onValidation: (item: IUserPermission|null)=>
        {
          if(item && item.displayName === '')
          {
            return {error: true, text: localization.validation.required};
          }
          if(item && item.displayName && item.displayName.length > 40)
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
}

/**
 * Глобальный экземпляр для доступа к описанию свойств разрешений 
 */
export const UserPermissionObjectInfo = UserPermissionObjectInfoClass.Instance;