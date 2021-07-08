import React, { Fragment, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './components/Main-page/Main-page';
import Header from './components/header';
import './index.scss';
import CategoryPage from './components/categoryPage/CategoryPage';
import ActionB from './components/categoryPage/ActionB';
import ActionC from './components/categoryPage/ActionC';
import Adjective from './components/categoryPage/Adjective';
import AnimalA from './components/categoryPage/AnimalA';
import AnimalB from './components/categoryPage/AnimalB'; 
import Clothers from './components/categoryPage/Clothes';
import Emotions from './components/categoryPage/Emotion';

const App = (): JSX.Element => {
 /*  const [isChecked, setIsChecked] = useState(false); */
 

  return (
  <BrowserRouter>
  {/*  <Header isChecked={isChecked} onToggle={setIsChecked}/>  */}
    <div className="container">
      <Switch>
        <Route component={MainPage} path="/" exact />
        <Route component={CategoryPage} path="/cards"/>
       <Route component={ActionB} path="/actionB"/>
        <Route component={ActionC} path="/actionC"/>
        <Route component={Adjective} path="/adjective"/>
        <Route component={AnimalA} path="/animalA"/>
        <Route component={AnimalB} path="/animalB"/> 
        <Route component={Clothers} path="/clothes"/> 
        <Route component={Emotions} path='/emotion'/> 
        {/* <Redirect from="/cards" to="/" />
        <Redirect from="/actionB" to="/" />
        <Redirect from="/actionC" to="/" />
        <Redirect from="/adjective" to="/" />
        <Redirect from="/animalA" to="/" />
        <Redirect from="/animalB" to="/" />
        <Redirect from="/clothes" to="/" />
        <Redirect from="/emotion" to="/" /> */}
      </Switch>
    </div>
  </BrowserRouter>
  )
};

export default App;
