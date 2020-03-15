import React from 'react';
import './App.css';
import Home from './pages/Home';
import AddCourse from './pages/AddCourse';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import EditCourse from './pages/EditCourse';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/add'>
            <AddCourse />
          </Route>
          <Route path='/edit'>
            <EditCourse />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }

export default App;