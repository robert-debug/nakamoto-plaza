import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import ModalStateProvider from './context/ModalState';
import DisplayStateProvider from './context/Display';
import CoinStateProvider from './context/CoinContext';
import ChartStateProvider from './context/ChartContext';
const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <ModalStateProvider>
        <ModalProvider>
          <DisplayStateProvider>
            <CoinStateProvider>
              <ChartStateProvider>
                <App />
              </ChartStateProvider>
            </CoinStateProvider>
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