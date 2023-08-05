import { TThemeType } from '../types/ThemeType';

/**
 * Сохранение темы в локальное хранилище
 * @param theme Тема
 */
export const saveThemeToStorage = (theme: TThemeType) =>
{
  const value = theme;
  const key = 'theme';
  localStorage.setItem(key, value);
}
