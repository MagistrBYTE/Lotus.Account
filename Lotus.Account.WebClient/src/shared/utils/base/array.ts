import { IGrouping } from 'src/shared/types/Grouping';

/**
 * Проверка массива что он является строго числовым
 * @param array Проверяемый массив
 * @returns 
 */
export const checkArrayIsNumbers =(array: any[]) =>
{
  return array.every(element => 
  {
    return typeof element === 'number';
  });
}

/**
 * Проверка на вхождение любого элемента проверяемого массива в исходном массиве 
 * @param source Исходный массив 
 * @param checked Проверяемый массив
 * @returns 
 */
export const checkArrayInArrayAny = <TItem>(source:TItem[], checked: TItem[]):boolean => 
{
  let find:boolean = true;

  for (let index = 0; index < source.length; index++) 
  {
    const element = source[index];
    find = checked.includes(element);
    if(find)
    {
      break;
    }
  }

  return find;
};

/**
 * Группировка массива по указанному свойству 
 * @param source Исходный массив 
 * @param propertyName Имя свойства по которому будет произведена группировка
 * @returns Массив групп
 */
export const groupArray = <TItem>(source:TItem[], propertyName: string):IGrouping<TItem>[] => 
{
  const result:IGrouping<TItem>[] = [];

  source.forEach((element) => 
  {
    // @ts-ignore
    const key = element[propertyName];

    const exist = result.find(x => x.groupKey === key);
    if(exist)
    {
      exist.items.push(element);
    }
    else
    {
      const newUserGroup:IGrouping<TItem> = {groupKey: key, items: [element]};
      result.push(newUserGroup);
    }
  });

  return result;
};



