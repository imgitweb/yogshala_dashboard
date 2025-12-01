import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {store} from './redux/store'
import { Provider } from 'react-redux'
import ToastProvider from './components/common/ToastProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'


createRoot(document.getElementById('root')).render(
  <StrictMode>


<ToastProvider />
<Provider store={store}>
    <HelmetProvider>

   
  <BrowserRouter>

   <App />
</BrowserRouter>
 </HelmetProvider>
</Provider>

   


  </StrictMode>,
)
