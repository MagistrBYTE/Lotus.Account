import { checkArrayIsNumbers } from '../utils/base/array';
import { TKey } from './Key';

/**
 * Интерфейс для выбора данных(опция) в выпадающем списке
 */
export interface ISelectOption<TValue extends TKey = string>
{
  /**
   * Значение
   */
  value:TValue;

  /**
   * Текст
   */
  text: string;
}

/**
 * Преобразование в типизированный массив
 * @param options Список опций
 * @returns 
 */
export const convertSelectOptionToNumber = <TValue extends TKey = string>(options:ISelectOption<TValue>[]):ISelectOption<number>[] =>
{
  const result = options.map((x) =>
  {
    const value:ISelectOption<number> = {text: x.text, value: Number(x.value)};
    return value;
  });

  return result;
}

/**
 * Преобразование в типизированный массив
 * @param options Список опций
 * @returns 
 */
export const convertSelectOptionToString = <TValue extends TKey = string>(options:ISelectOption<TValue>[]):ISelectOption<string>[] =>
{
  const result = options.map((x) =>
  {
    const value:ISelectOption<string> = {text: x.text, value: String(x.value)};
    return value;
  });

  return result;
}


/**
 * Получение массива текста из выбранных значений опций
 * @param options Массив всех опций
 * @param selectedValues Выбранные значения
 * @returns Массив текста выбранных значений
 */
export const getSelectOptionTexts = <TValue extends TKey = string>(options:ISelectOption<TValue>[], 
  selectedValues?:TValue[]):string[] =>
{
  if(selectedValues && selectedValues.length > 0)
  {
    const texts:string[] = [];

    options.forEach(element => 
    {
      if(selectedValues.find((x) => x === element.value))
      {
        texts.push(element.text)
      }
    });

    return texts;
  }
  else
  {
    return [];
  }
}

/**
 * Получение массива текста из неопределённого значения(свойства объекта)
 * @param options Массив всех опций
 * @param item Неопределённое значение
 * @returns Массив текста выбранных значений
 */
export const getSelectOptionTextsFromValue = <TValue extends TKey = string>(options:ISelectOption<TValue>[], item: unknown):string[] =>
{
  if(Array.isArray(item))
  {
    const massive: any[] = item;
    if(checkArrayIsNumbers(massive))
    {
      const numbers = massive.map((x) => 
      {
        const value:TValue = Number(x) as TValue;
        return value;
      });

      const result = getSelectOptionTexts<TValue>(options, numbers);
      return result;
    }
    else
    {
      const texts = massive.map((x) => 
      {
        const value:TValue = String(x) as TValue;
        return value;
      });

      const result = getSelectOptionTexts<TValue>(options, texts);
      return result; 
    }
  }

  return [];
}