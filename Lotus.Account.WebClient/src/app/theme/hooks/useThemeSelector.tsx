import * as React from 'react';
import { createTheme } from '@mui/material';
import { TThemeType } from '../types/ThemeType';
import { loadThemeFromStorage } from '../utils/loadThemeFromStorage';
import { saveThemeToStorage } from '../utils/saveThemeToStorage';

export const ColorModeContext = React.createContext({ setTheme: (theme: TThemeType) => {}});

export const useThemeSelector = () => 
{
  const [mode, setMode] = React.useState<TThemeType>(loadThemeFromStorage());

  const colorMode = React.useMemo(
    () => ({
      setTheme: (theme: TThemeType) => 
      {
        setMode(theme);
        saveThemeToStorage(theme);
      }
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode],
  );

  return { theme, colorMode};
};
