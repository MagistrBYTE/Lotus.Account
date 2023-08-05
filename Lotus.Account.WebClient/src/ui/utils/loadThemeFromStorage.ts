import { TThemeType } from '../types/ThemeType';

/**
 * Загрузка темы из локального хранилища 
 * @returns Темы или тема по умолчанию по умолчанию
 */
export const loadThemeFromStorage = ():TThemeType =>
{
  const key = 'theme';
  const value = localStorage.getItem(key);
  if(value)
  {
    return value as TThemeType;
  }
  else
  {
    return 'light';
  }
}
