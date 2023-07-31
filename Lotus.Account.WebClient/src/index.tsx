import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import registerServiceWorker from './registerServiceWorker';
import useThemeSelector, { ColorModeContext } from './ui/styles/useThemeSelector';
import { store } from './app/store';
import { App } from './app/App';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

const AppRenderer = () => 
{
  const {theme, colorMode} = useThemeSelector();

  return (
    <React.Fragment>
      <BrowserRouter>
        <Provider store={store}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </ColorModeContext.Provider>
        </Provider>
      </BrowserRouter>
    </React.Fragment>
  );
};

registerServiceWorker();

root.render(<AppRenderer />);
