import * as React from 'react';
import { createTheme, useMediaQuery } from '@mui/material';
import { TThemeType } from '../types/ThemeType';
import { loadThemeFromStorage } from '../utils/loadThemeFromStorage';
import { saveThemeToStorage } from '../utils/saveThemeToStorage';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const useThemeSelector = () => 
{
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState<TThemeType>(loadThemeFromStorage());

  React.useEffect(() => 
  {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, 
  [prefersDarkMode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => 
      {
        setMode((prevMode) => 
        {
          const result = (prevMode === 'light' ? 'dark' : 'light');
          saveThemeToStorage(result);
          return result;
        });
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

export default useThemeSelector;
