import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { Provider } from 'react-redux';
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthContextProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);


