import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import ModalStateProvider from './context/ModalState';
import DisplayStateContext  from './context/Display'
import DisplayStateProvider from './context/Display';
const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <ModalStateProvider>
        <ModalProvider>
          <DisplayStateProvider>
            <App />
          </DisplayStateProvider>
        </ModalProvider>
      </ModalStateProvider>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);