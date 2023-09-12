import { localization } from 'src/resources/localization';
import { ObjectInfoBase } from 'src/shared/objectInfo/ObjectInfo';
import { IPropertyDescriptor } from 'src/shared/objectInfo/PropertyDescriptor';
import { PropertyTypeEnum } from 'src/shared/objectInfo/PropertyType';
import { FilterFunctionEnum } from 'src/shared/types/FilterFunction';
import { IUserNotification } from './UserNotification';

class UserNotificationObjectInfoClass extends ObjectInfoBase<IUserNotification>
{
  private static _notificationObjectInfo: UserNotificationObjectInfoClass;

  public static get Instance(): UserNotificationObjectInfoClass 
  {
    return (this._notificationObjectInfo || (this._notificationObjectInfo = new this()));
  }

  constructor() 
  {
    super();
    this.Init();      
  }

  private Init()
  {
    // const idProp:IPropertyDescriptor = 
    // {
    //   fieldName: 'id',
    //   name: localization.notification.id,
    //   desc: localization.notification.idDesc,
    //   propertyType: PropertyTypeEnum.Guid,
    //   sorting:
    //   {
    //     enabled: true
    //   }
    // }

    // this.descriptors.push(idProp);

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
 * Глобальный экземпляр для описания объекта уведомления
 */
export const UserNotificationObjectInfo = UserNotificationObjectInfoClass.Instance;
