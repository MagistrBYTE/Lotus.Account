import { KeyTheme } from '../const/KeyTheme';
import { TThemeType } from '../types/ThemeType';

/**
 * Загрузка темы из локального хранилища 
 * @returns Тема или тема по умолчанию по умолчанию
 */
export const loadThemeFromStorage = ():TThemeType =>
{
  const value = localStorage.getItem(KeyTheme);
  if(value)
  {
    return value as TThemeType;
  }
  else
  {
    return 'light';
  }
}
