import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './Store/configureStore';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import CreateQuizView from './View/CreateQuizView';
// import CreateQuiz from './components/QuizComponents/CreateQuiz';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App/>
    </Provider>
    </BrowserRouter>
  
  </React.StrictMode>,
  document.getElementById('root')
);
