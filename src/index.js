import React from 'react';
import ReactDOM from 'react-dom/client';
 
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import store from './app/store'; //Store from redux



import 'antd/dist/antd.css'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
    </BrowserRouter>  
  </React.StrictMode>
);

 
 
