require('dotenv').config();
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { persistor, store } from './Redux/Store'; // Correctly import the named export
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import "slick-carousel/slick/slick.css"; // Import slick carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick carousel theme CSS

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// Check the custom environment variable
if (process.env.REACT_APP_NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> 
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
