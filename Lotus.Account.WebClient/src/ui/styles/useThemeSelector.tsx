import * as React from 'react';
import { createTheme, useMediaQuery } from '@mui/material';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const useThemeSelector = () => 
{
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => 
  {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, 
  [prefersDarkMode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => 
      {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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
