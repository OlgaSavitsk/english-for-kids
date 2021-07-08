import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss'
import classNames from 'classnames';
import data from './categoryPage/cards.json';

interface HeaderProps{
    isChecked: boolean;
    onToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = props =>{
  const [menuActive, setMenuActive] = useState(false);
  
    const items = [{value: "Main Page", href: '/', id: 1}, {value: "Action (set A)", href: '/cards', id: 2}, {value: "Action (set B)", href: '/actionB', id: 3},
    {value: "Action (set C)", href: '/actionC', id: 4}, {value: "Adjective", href: '/adjective', id: 5}, {value: "Animal (set A)", href: '/animalA', id: 6}, {value: "Animal (set B)", href: '/animalB', id: 7}, 
    {value: "Clothes", href: '/clothes', id: 8}, {value: "Emotion", href: '/emotion', id: 9}]

const checkedGame = (e: { preventDefault: () => void; }) => {
   // e.preventDefault();
    props.onToggle(!props.isChecked);
    localStorage.setItem('state', `${props.isChecked}`)
    local(e)
    data[0].sort(() => Math.random() - 0.5).reverse;
}

const local = (e: { preventDefault: () => void; }) => {
    //e.preventDefault();
    
    if(items[3].href === '/actionB'){
    const soundsList = data[5].sort(() => Math.random() - 0.5);
    localStorage.setItem('sound0', soundsList[0].audioSrc)
    localStorage.setItem('sound1', soundsList[1].audioSrc)
    localStorage.setItem('sound2', soundsList[2].audioSrc)
    localStorage.setItem('sound3', soundsList[3].audioSrc)
    localStorage.setItem('sound4', soundsList[4].audioSrc)
    localStorage.setItem('sound5', soundsList[5].audioSrc)
    localStorage.setItem('sound6', soundsList[6].audioSrc)
    localStorage.setItem('sound7', soundsList[7].audioSrc)
    } 
    const soundsList = data[0].sort(() => Math.random() - 0.5); 
    localStorage.setItem('sound0', soundsList[0].audioSrc)
    localStorage.setItem('sound1', soundsList[1].audioSrc)
    localStorage.setItem('sound2', soundsList[2].audioSrc)
    localStorage.setItem('sound3', soundsList[3].audioSrc)
    localStorage.setItem('sound4', soundsList[4].audioSrc)
    localStorage.setItem('sound5', soundsList[5].audioSrc)
    localStorage.setItem('sound6', soundsList[6].audioSrc)
    localStorage.setItem('sound7', soundsList[7].audioSrc)
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
                <span className="slider" data-on="TRAIN" data-off="PLAY"></span>
                <span className="switch-inner"></span>               
            </label>
        </header>
       
    )
}

export default Header;