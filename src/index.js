import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './index.css';
import App from './App';
import TokenContextProvider from './Context/Token';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ReactQueryDevtools } from '../node_modules/react-query/es/devtools/devtools';
import CartContextProvider from './Context/CartContext';
import WishContextProvider from './Context/WishContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
let query =new QueryClient()
root.render(
  <WishContextProvider>
  <CartContextProvider>
  <React.StrictMode> 
  <QueryClientProvider client={query}>
    <TokenContextProvider>
    <App />
    </TokenContextProvider>
   
  <ReactQueryDevtools/>
  </QueryClientProvider>
  </React.StrictMode>
  </CartContextProvider>
  </WishContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
