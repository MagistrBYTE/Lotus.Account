import { getRandomMinMax } from 'src/core/utils/random';
import { fakerRU as faker } from '@faker-js/faker';
import moment from 'moment';
import { formatDateTimeFriendly } from 'src/core/utils/dateTime';
import { INotification } from '../domain/Notification';
import { INotificationGroup } from '../domain/NotificationGroup';
import { TNotificationImportance } from '../domain/NotificationImportance';

export const mockNotificationTopics: string[] = ['Силы восстановлены', 'Расследование завершено', 'Операция выполнена', 'Марс'];

export const mockNotificationsGroupByDate = (countGroup: number, minNotification: number, maxNotification: number):INotificationGroup[] =>
{
  const groups:INotificationGroup[] = [];
  
  for (let index = 0; index < countGroup; index++) 
  {
    const currentNotification = getRandomMinMax(minNotification, maxNotification);
    const currentDate:Date = moment().add(index, 'days').toDate();

    const group:INotificationGroup = {groupKey: formatDateTimeFriendly(currentDate), notifications: []}

    for (let n = 0; n < currentNotification; n++) 
    {
      const element:INotification = 
      {
        id: faker.string.uuid(),
        topic: faker.helpers.arrayElement(mockNotificationTopics),
        sender: 'Система',
        importance: faker.helpers.enumValue(TNotificationImportance),
        content: faker.lorem.paragraph({min: 1, max: 8}),
        created: currentDate,
        isRead: faker.datatype.boolean(),
        isArchive:faker.datatype.boolean()
      }

      group.notifications.push(element);
    }

    groups.push(group);
  }

  return groups;
}


