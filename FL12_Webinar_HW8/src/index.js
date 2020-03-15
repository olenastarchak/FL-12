import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/rootReducer.js';

const store = createStore(rootReducer, {
  courses: [
    {
      id: 1,
      date: '2020-01-01',
      name: 'React',
      description: 'Learn React',
      duration: '1h 30m'
    }, {
      id: 2,
      date: '2020-02-01',
      name: 'Angular',
      description: 'Learn Angular',
      duration: '1h 40m'
    }
  ],
  searchText: '',
  editCourseId: null,
});


ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));