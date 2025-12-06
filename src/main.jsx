import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';//bs5-css
import 'bootstrap/dist/js/bootstrap.js';//bs5-js

import './assets/styles/all.scss';//scss
import "react-datepicker/dist/react-datepicker.css";
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Provider } from 'react-redux';
import store from './store.js';
import { initApi } from './api.js';

// 🟢 這是網站啟動的主程式
async function startApp() {

  // 先執行 initApi()，去抓 public/config.json，幫 axios 設定好後端網址
  await initApi(); 

  // 正式啟動 React 畫面
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store = { store }>
        <RouterProvider router ={ router }>
          <App />
        </RouterProvider>
      </Provider>
    </StrictMode>,
  )

}
//「網站開機」
startApp();
