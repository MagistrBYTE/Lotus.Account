import { fakerRU as faker } from '@faker-js/faker';
import moment from 'moment';
import { IGrouping } from 'src/shared/types/Grouping';
import { formatDateTimeFriendly } from 'src/shared/utils/dateTime';
import { getRandomMinMax } from 'src/shared/utils/random';
import { UserNotificationImportanceEnum } from '../domain/UserNotificationImportance';
import { IUserNotification } from '../domain/UserNotification';
import { UserNotificationImportanceHelper } from '../helpers/UserNotificationImportanceHelper';


export const mockUserNotificationTopics: string[] = ['Силы восстановлены', 'Расследование завершено', 'Операция выполнена', 'Марс'];

export const mockUserNotificationsGroupByDate = (countGroup: number, minUserNotification: number, maxUserNotification: number):IGrouping<IUserNotification>[] =>
{
  const groups:IGrouping<IUserNotification>[] = [];
  
  for (let index = 0; index < countGroup; index++) 
  {
    const currentUserNotification = getRandomMinMax(minUserNotification, maxUserNotification);
    const currentDate:Date = moment().add(index, 'days').toDate();

    const group:IGrouping<IUserNotification> = {groupKey: formatDateTimeFriendly(currentDate), items: []}

    for (let n = 0; n < currentUserNotification; n++) 
    {
      const element:IUserNotification = 
      {
        id: faker.string.uuid(),
        topic: faker.helpers.arrayElement(mockUserNotificationTopics),
        sender: 'Система',
        importance: UserNotificationImportanceHelper.getType(faker.helpers.objectValue(UserNotificationImportanceEnum)),
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


