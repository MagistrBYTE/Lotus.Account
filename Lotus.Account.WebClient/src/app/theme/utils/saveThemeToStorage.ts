import { KeyTheme } from '../const/KeyTheme';
import { TThemeType } from '../types/ThemeType';

/**
 * Сохранение темы в локальное хранилище
 * @param theme Тема
 */
export const saveThemeToStorage = (theme: TThemeType) =>
{
  localStorage.setItem(KeyTheme, theme);
}
