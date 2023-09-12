import { localization } from 'src/resources/localization';
import { ObjectInfoBase } from 'src/shared/objectInfo/ObjectInfo';
import { IPropertyDescriptor } from 'src/shared/objectInfo/PropertyDescriptor';
import { PropertyTypeEnum } from 'src/shared/objectInfo/PropertyType';
import { FilterFunctionEnum } from 'src/shared/types/FilterFunction';
import { IUserPosition } from './UserPosition';


class UserPositionObjectInfoClass extends ObjectInfoBase<IUserPosition>
{
  private static _positionObjectInfo: UserPositionObjectInfoClass;

  public static get Instance(): UserPositionObjectInfoClass 
  {
    return (this._positionObjectInfo || (this._positionObjectInfo = new this()));
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
        onValidation: (item: IUserPosition|null)=>
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
      name: localization.position.displayName,
      desc: localization.position.displayNameDesc,
      propertyType: PropertyTypeEnum.String,
      editing: 
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IUserPosition|null) =>
        {
          if(item && item.displayName === '')
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

    this.descriptors.push(displayNameProp);    
  }
}

/**
 * Глобальный экземпляр для доступа к описанию свойств должности 
 */
export const UserPositionObjectInfo = UserPositionObjectInfoClass.Instance;