import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//Custom CSS
import './styles/style.scss'
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {

    primary: {
      main: '#e91e63',
    },
    secondary: {
      main: '#7b809a',
    },
    success: {
      main: '#4caf50'
    },
    warning: {
      main: '#fb8c00'
    },
    error: {
      main: '#f44335'
    },
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />

      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
