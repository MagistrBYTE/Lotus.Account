import { IConstantable } from 'src/core/types/Constantable';
import { IEditable } from 'src/core/types/Editable';
import { FilterFunctionEnum } from 'src/shared/filtering/FilterFunction';
import { localization } from 'src/shared/localization';
import { IPropertiesInfo } from 'src/shared/reflection/PropertiesInfo';
import { IPropertyDescriptor } from 'src/shared/reflection/PropertyDescriptor';
import { PropertyTypeEnum } from 'src/shared/reflection/PropertyType';
import { ValidationResultSuccess } from 'src/shared/validation/ValidationResult';

/**
 * Группа пользователя
 */
export interface IGroup extends IEditable, IConstantable
{
    /**
     * Идентификатор группы
     */
    id: number;

    /**
     * Наименование группы
     */
    name: string;

    /**
     * Краткое наименование группы
     */
    shortName?: string;
}

export class GroupPropertiesInfo implements IPropertiesInfo<IGroup>
{
  private static _groupPropertiesInfo: GroupPropertiesInfo;

  public static get Instance(): GroupPropertiesInfo 
  {
    return (this._groupPropertiesInfo || (this._groupPropertiesInfo = new this()));
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

    const shortNameProp:IPropertyDescriptor = 
    {
      fieldName: 'shortName',
      name: localization.group.shortName,
      desc: localization.group.shortNameDesc,
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
 * Глобальный экземпляр для доступа к описанию свойств группы 
 */
export const GroupProperties = GroupPropertiesInfo.Instance;