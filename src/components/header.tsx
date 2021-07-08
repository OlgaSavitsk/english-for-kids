import React, { useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './header.scss'
import classNames from 'classnames';
import data from './categoryPage/cards.json';
import MainPage from './Main-page/Main-page';

interface HeaderProps{
    isChecked: boolean;
    onToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = props =>{
  const [menuActive, setMenuActive] = useState(false);
  
    const items = [{value: "Main Page", href: '/', id: 1}, {value: "Action (set A)", href: '/cards', id: 2}, {value: "Action (set B)", href: '/actionB', id: 3},
    {value: "Action (set C)", href: '/actionC', id: 4}, {value: "Adjective", href: '/adjective', id: 5}, {value: "Animal (set A)", href: '/animalA', id: 6}, {value: "Animal (set B)", href: '/animalB', id: 7}, 
    {value: "Clothes", href: '/clothes', id: 8}, {value: "Emotion", href: '/emotion', id: 9}]

const checkedGame = () => {
    props.onToggle(!props.isChecked);
    localStorage.setItem('state', `${props.isChecked}`)
}

window.onload = () => {
    props.onToggle(!props.isChecked);
    localStorage.clear();
  } 

    return( 
        <header className="header">          
                <div className={menuActive ? /* "burger-button" */ "open" : "burger-button"} onClick={() => setMenuActive(!menuActive)}>
                <span></span>
                <span></span>
                <span></span>
                </div>
                <div className={classNames((menuActive ? "menu active-open" : ''), (menuActive ? "green" : "menu"), (props.isChecked ? "orange" : ''))} onClick={() => setMenuActive(false)}>
          <ul className="menu-container">
              {items.map((item: { id: React.Key; href: string; value: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => 
                  <li key={item.id}>
                     <NavLink className={!menuActive ? "header-item" : "header-item"} onClick={() => setMenuActive(!menuActive)} to={item.href} /* onClick={() => localStorage.setItem('card-category', `${item.value}`)} */>{item.value}</NavLink>
                  </li>
                  )}
          </ul>
      </div>
            <label className="switch">
                <input type="checkbox" className="input" checked={props.isChecked} onChange={checkedGame}/>          
                <span className="slider"></span>
                <span className="switch-inner"></span>               
            </label>
        </header>
       
    )
}

export default Header;