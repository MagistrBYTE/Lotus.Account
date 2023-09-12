import { ValidationResultSuccess } from 'src/shared/validation/ValidationResult';
import { localization } from 'src/resources/localization';
import { ObjectInfoBase } from 'src/shared/objectInfo/ObjectInfo';
import { IPropertyDescriptor } from 'src/shared/objectInfo/PropertyDescriptor';
import { PropertyTypeEnum } from 'src/shared/objectInfo/PropertyType';
import { FilterFunctionEnum } from 'src/shared/types/FilterFunction';
import { IUserRole } from './UserRole';

export class UserRoleObjectInfoClass extends ObjectInfoBase<IUserRole>
{
  private static _roleObjectInfo: UserRoleObjectInfoClass;

  public static get Instance(): UserRoleObjectInfoClass 
  {
    return (this._roleObjectInfo || (this._roleObjectInfo = new this()));
  }

  constructor() 
  {
    super();
    this.Init();
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

    const nameProp:IPropertyDescriptor = 
    {
      fieldName: 'name',
      name: localization.role.name,
      desc: localization.role.nameDesc,
      propertyType: PropertyTypeEnum.String,
      editing: 
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IUserRole|null)=>
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
      name: localization.role.displayName,
      desc: localization.role.displayNameDesc,
      propertyType: PropertyTypeEnum.String,
      editing: 
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IUserRole|null)=>
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
        onValidation: (item: IUserRole|null)=> { return ValidationResultSuccess } 
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
}

/**
 * Глобальный экземпляр для доступа к описанию свойств ролей 
 */
export const UserRoleObjectInfo = UserRoleObjectInfoClass.Instance;