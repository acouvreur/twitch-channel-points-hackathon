import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import teal from '@material-ui/core/colors/teal';
import indigo from '@material-ui/core/colors/indigo';

import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';

import MainPage from './pages/MainPage';
import settingsStore from './stores/settingsStore';

const theme = computed(() => createMuiTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: indigo.A400,
    },
    contrastThreshold: 3,
    type: settingsStore.darkTheme ? 'dark' : 'light',
  },
}));

const App = observer(() => (
  <React.StrictMode>
    <ThemeProvider theme={theme.get()}>
      <CssBaseline />
      <MainPage />
    </ThemeProvider>
  </React.StrictMode>
));

export default App;
