import React from 'react'
// import ReactDOM from 'react-dom'
import { render } from 'react-snapshot';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ReduxStore from './Middlewares/ReduxStore/ReduxStore';
import App from './App'
import './Assets/Styles/Index.css'
import './Assets/Styles/Fonts.css'
import './Assets/Styles/TabView.css'
import './Assets/Styles/MobileView.css'

render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={ReduxStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'));
