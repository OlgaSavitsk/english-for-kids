import React, { useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './header.scss'
import classNames from 'classnames';
import { useEffect } from 'react';

interface HeaderProps{
    isChecked: boolean;
    onToggle: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenClose: React.Dispatch<React.SetStateAction<boolean>>
    menuActive: boolean;
    /* onActiveLink: React.Dispatch<React.SetStateAction<boolean>>;
    activeLink: boolean; */
}

const Header: React.FC<HeaderProps> = props =>{

  const [isClick, setIsClick] = useState(0);
 const [activeLink, setActiveLink] = useState(false)
  
    const items = [{value: "Main Page", href: '/', id: 1}, {value: "Action (set A)", href: '/cards', id: 2}, {value: "Action (set B)", href: '/actionB', id: 3},
    {value: "Fruits", href: '/actionC', id: 4}, {value: "Color", href: '/adjective', id: 5}, {value: "Animal (set A)", href: '/animalA', id: 6}, {value: "Animal (set B)", href: '/animalB', id: 7}, 
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
                <div className={props.menuActive ? "open" : "burger-button"} onClick={() => props.onOpenClose(!props.menuActive)}>
                <span></span>
                <span></span>
                <span></span>
                </div>
                <div className={classNames((props.menuActive ? "menu active-open" : ''), (props.menuActive ? "green" : "menu"), (props.isChecked ? "orange" : ''))} /* onClick={() => props.onOpenClose(false)} */>
          <ul className="menu-container" onClick={() => props.onOpenClose(false)}>
              {items.map((item: { id: number; href: string; value: string; }, index) => 
                  <li key={index} onClick={() => {/* setIsClick(item.id) ; */ props.onOpenClose(true); setActiveLink(true)}}>
                     <NavLink className={classNames((!props.menuActive ? "header-item" : "header-item"), (isClick === item.id ? "decorate" : ""))} to={item.href}>{item.value}</NavLink>
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