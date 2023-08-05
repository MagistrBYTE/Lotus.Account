import { PropertiesInfoBase } from 'src/shared/reflection/PropertiesInfo';
import { IPropertyDescriptor } from 'src/shared/reflection/PropertyDescriptor';
import { localization } from 'src/shared/localization';
import { PropertyTypeEnum } from 'src/shared/reflection/PropertyType';
import { FilterFunctionEnum } from 'src/shared/filtering/FilterFunction';
import { IGrouping } from 'src/core/types/Grouping';
import { TNotificationImportance } from './NotificationImportance';

/**
 * Уведомление
 */
export interface INotification
{
  /**
   * Идентификатор
   */
  id: string;

  /**
   * Тема
   */
  topic?: string;

  /**
   * Источник
   */
  sender?: string;

  /**
   * Важность
   */
  importance?: TNotificationImportance;

  /**
   * Содержание
   */
  content: string;

  /** Дата */
  created: string;

  /**
   * Статус прочитки
   */
  isRead: boolean;

  /** Статус нахождения уведомления в архиве */
  isArchive: boolean;
}

export class NotificationPropertiesInfo extends PropertiesInfoBase<INotification>
{
  private static _notificationPropertiesInfo: NotificationPropertiesInfo;

  public static get Instance(): NotificationPropertiesInfo 
  {
    return (this._notificationPropertiesInfo || (this._notificationPropertiesInfo = new this()));
  }

  constructor() 
  {
    super();
    this.Init();
    this.getProperties = this.getProperties.bind(this);
    this.getPropertyDescriptorByName = this.getPropertyDescriptorByName.bind(this);
    this.getFilterFunctionsDesc = this.getFilterFunctionsDesc.bind(this); 
    this.getFilterOptions = this.getFilterOptions.bind(this);         
  }

  private Init()
  {
    const idProp:IPropertyDescriptor = 
    {
      fieldName: 'id',
      name: localization.notification.id,
      desc: localization.notification.idDesc,
      propertyType: PropertyTypeEnum.Guid,
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(idProp);

    const topicProp:IPropertyDescriptor = 
    {
      fieldName: 'topic',
      name: localization.notification.topic,
      desc: localization.notification.topicDesc,
      propertyType: PropertyTypeEnum.String,
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

    this.descriptors.push(topicProp);

    const senderProp:IPropertyDescriptor = 
    {
      fieldName: 'sender',
      name: localization.notification.sender,
      desc: localization.notification.senderDesc,
      propertyType: PropertyTypeEnum.String,
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

    this.descriptors.push(senderProp);

    const importanceProp:IPropertyDescriptor = 
    {
      fieldName: 'importance',
      name: localization.notification.importance,
      desc: localization.notification.importanceDesc,
      propertyType: PropertyTypeEnum.Enum,
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

    this.descriptors.push(importanceProp);
    
    const contentProp:IPropertyDescriptor = 
    {
      fieldName: 'content',
      name: localization.notification.content,
      desc: localization.notification.contentDesc,
      propertyType: PropertyTypeEnum.String,
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

    this.descriptors.push(contentProp);

    const createdProp:IPropertyDescriptor = 
    {
      fieldName: 'created',
      name: localization.notification.created,
      desc: localization.notification.createdDesc,
      propertyType: PropertyTypeEnum.DateTime,
      filtering:
      {
        functionDefault: FilterFunctionEnum.Equals,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(createdProp);       
  }
}

/**
 * Глобальный экземпляр для доступа к описанию свойств группы 
 */
export const NotificationProperties = NotificationPropertiesInfo.Instance;

/**
 * Группирование уведомлений
 */
export interface INotificationGroup extends IGrouping<INotification>
{

}
