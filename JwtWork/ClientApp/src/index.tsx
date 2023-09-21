import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, StrictMode, Fragment } from 'react';
import App from './App';
import './assets/style/scss/site.scss';
import { store,persistor } from './store';
import { ToastContainer } from 'react-toastify';
import reportWebVitals from './reportWebVitals';
import { SignalRApi } from './api/signalr.service';
import { toastifyProps, registerIcons } from './config';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@material-tailwind/react';
import { PersistGate } from 'redux-persist/integration/react';

registerIcons();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

function AppRenderer() {
  useEffect(() => {
    setTimeout(() => {
      SignalRApi.startConnection();
    }, 250);
  }, []);

  return (
    <Fragment>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <StrictMode>
            <ThemeProvider>
            <App />
            </ThemeProvider>            
          </StrictMode>
          </PersistGate>

        </Provider>
      </BrowserRouter>
      <ToastContainer {...toastifyProps} />
      <Toaster />
    </Fragment>
  );
}

root.render(<AppRenderer />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
