import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ReduxStore from './Middlewares/ReduxStore/ReduxStore';
import App from './App'
import './Assets/Styles/Index.css'
import './Assets/Styles/TabView.css'
import './Assets/Styles/MobileView.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={ReduxStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'));
