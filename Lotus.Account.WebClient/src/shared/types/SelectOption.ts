import { ReactNode } from 'react';
import { checkArrayIsNumbers } from '../utils/base/array';
import { TKey } from './Key';

/**
 * Интерфейс для выбора данных(опция) в выпадающем списке
 */
export interface ISelectOption
{
  /**
   * Значение
   */
  value:TKey;

  /**
   * Текст
   */
  text: string;

  /**
   * Путь к изображению
   */
  icon?: ReactNode;
}

/**
 * Преобразование в типизированный массив
 * @param options Список опций
 * @returns 
 */
export const convertSelectOptionToNumber = (options:ISelectOption[]):ISelectOption[] =>
{
  const result = options.map((x) =>
  {
    const value:ISelectOption = {text: x.text, value: Number(x.value)};
    return value;
  });

  return result;
}

/**
 * Преобразование в типизированный массив
 * @param options Список опций
 * @returns 
 */
export const convertSelectOptionToString = (options:ISelectOption[]):ISelectOption[] =>
{
  const result = options.map((x) =>
  {
    const value:ISelectOption = {text: x.text, value: String(x.value)};
    return value;
  });

  return result;
}

/**
 * Получение корректного значения по умолчанию или начального значения
 * @param options Список опций
 * @param initialSelectedValue Начальное значение
 * @returns 
 */
export const getDefaulValueSelectOption = <TValueOption extends TKey = TKey>(options:ISelectOption[], initialSelectedValue?: TValueOption):TValueOption =>
{
  if(initialSelectedValue)
  {
    return initialSelectedValue;
  }

  return options[0].value as TValueOption;
}

/**
 * Получение текста из значения опций
 * @param options Массив всех опций
 * @param selectedValue Выбранное значение
 * @returns Текст выбранного значения
 */
export const getSelectOptionText = (options:ISelectOption[], selectedValue?:TKey):string =>
{
  let text = '';
  if(selectedValue)
  {
    options.forEach(element => 
    {
      if(element.value === selectedValue)
      {
        text = element.text;
      }
    });
  }

  return text;
}

/**
 * Получение иконки из значения опций
 * @param options Массив всех опций
 * @param selectedValue Выбранное значение
 * @returns Иконка выбранного значения
 */
export const getSelectOptionIcon = (options:ISelectOption[], selectedValue?:TKey):ReactNode|undefined =>
{
  let icon: ReactNode|undefined = undefined;
  if(selectedValue)
  {
    const texts:string[] = [];

    options.forEach(element => 
    {
      if(element.value === selectedValue)
      {
        icon = element.icon;
      }
    });
  }

  return icon;
}

/**
 * Получение массива текста из выбранных значений опций
 * @param options Массив всех опций
 * @param selectedValues Выбранные значения
 * @returns Массив текста выбранных значений
 */
export const getSelectOptionTexts = (options:ISelectOption[], selectedValues?:TKey[]):string[] =>
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
export const getSelectOptionTextsFromValue = (options:ISelectOption[], item: unknown):string[] =>
{
  if(Array.isArray(item))
  {
    const massive: any[] = item;
    if(checkArrayIsNumbers(massive))
    {
      const numbers = massive.map((x) => 
      {
        const value:number = Number(x);
        return value;
      });

      const result = getSelectOptionTexts(options, numbers);
      return result;
    }
    else
    {
      const texts = massive.map((x) => 
      {
        const value:string = String(x)
        return value;
      });

      const result = getSelectOptionTexts(options, texts);
      return result; 
    }
  }

  return [];
}