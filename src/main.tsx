import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './config/Redex/Store';
import { SnackbarProvider, SnackbarProviderProps } from 'notistack';

let props: SnackbarProviderProps = {
  anchorOrigin: { vertical: "top", horizontal: "center" },
  preventDuplicate: true

}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider {...props}>
        <Provider store={store}>
          <App />
        </Provider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
