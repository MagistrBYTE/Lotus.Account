import { getRandomMinMax } from 'src/core/utils/random';
import { fakerRU as faker } from '@faker-js/faker';
import moment from 'moment';
import { formatDateTimeFriendly } from 'src/core/utils/dateTime';
import { IGrouping } from 'src/core/types/Grouping';
import { INotification } from '../domain/Notification';
import { NotificationImportanceEnum, NotificationImportanceHelper } from '../domain/NotificationImportance';


export const mockNotificationTopics: string[] = ['Силы восстановлены', 'Расследование завершено', 'Операция выполнена', 'Марс'];

export const mockNotificationsGroupByDate = (countGroup: number, minNotification: number, maxNotification: number):IGrouping<INotification>[] =>
{
  const groups:IGrouping<INotification>[] = [];
  
  for (let index = 0; index < countGroup; index++) 
  {
    const currentNotification = getRandomMinMax(minNotification, maxNotification);
    const currentDate:Date = moment().add(index, 'days').toDate();

    const group:IGrouping<INotification> = {groupKey: formatDateTimeFriendly(currentDate), items: []}

    for (let n = 0; n < currentNotification; n++) 
    {
      const element:INotification = 
      {
        id: faker.string.uuid(),
        topic: faker.helpers.arrayElement(mockNotificationTopics),
        sender: 'Система',
        importance: NotificationImportanceHelper.getType(faker.helpers.objectValue(NotificationImportanceEnum)),
        content: faker.lorem.paragraph({min: 1, max: 8}),
        created: moment(currentDate).format('DD.MM.YYYY'),
        isRead: faker.datatype.boolean(),
        isArchive:faker.datatype.boolean()
      }

      group.items.push(element);
    }

    groups.push(group);
  }

  return groups;
}


