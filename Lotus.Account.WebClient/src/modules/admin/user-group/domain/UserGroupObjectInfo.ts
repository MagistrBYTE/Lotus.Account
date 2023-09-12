import { localization } from 'src/resources/localization';
import { ObjectInfoBase } from 'src/shared/objectInfo/ObjectInfo';
import { IPropertyDescriptor } from 'src/shared/objectInfo/PropertyDescriptor';
import { PropertyTypeEnum } from 'src/shared/objectInfo/PropertyType';
import { FilterFunctionEnum } from 'src/shared/types/FilterFunction';
import { ValidationResultSuccess } from 'src/shared/validation/ValidationResult';
import { IUserGroup } from './UserGroup';

class UserGroupObjectInfoClass extends ObjectInfoBase<IUserGroup>
{
  private static _groupObjectInfo: UserGroupObjectInfoClass;

  public static get Instance(): UserGroupObjectInfoClass 
  {
    return (this._groupObjectInfo || (this._groupObjectInfo = new this()));
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
      name: localization.group.id,
      desc: localization.group.idDesc,
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
      name: localization.group.name,
      desc: localization.group.nameDesc,
      propertyType: PropertyTypeEnum.String,
      editing: 
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: ()=> { return ValidationResultSuccess}
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
      name: localization.group.displayName,
      desc: localization.group.displayNameDesc,
      propertyType: PropertyTypeEnum.String,
      editing: 
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: ()=> { return ValidationResultSuccess}
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
 * Глобальный экземпляр для доступа к описанию свойств группы пользователя
 */
export const UserGroupObjectInfo = UserGroupObjectInfoClass.Instance;