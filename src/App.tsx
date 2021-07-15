import './index.scss'
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './components/Main-page/Main-page';
import './index.scss';
import CategoryPage from './components/CategoryPage/CategoryPage';

const App = (): JSX.Element => {

  return (
  <BrowserRouter>
    <div className="container">
      <Switch>
         <Route component={MainPage} path="/" exact /> 
        <Route component={CategoryPage} path="/cards"/>
      </Switch>
    </div>
    <div className="footer">
      <a className="github" href="https://github.com/OlgaSavitsk">OlgaSavitsk</a>
      <a className="school" href="https://rs.school/js/">
        <span className="school-year">'2021</span>
      </a>
    </div>
  </BrowserRouter>
  )
};

export default App;
