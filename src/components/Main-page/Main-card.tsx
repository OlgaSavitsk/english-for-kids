import React from "react";
import { useHistory } from "react-router";
import { NavLink } from 'react-router-dom';
import './Card.scss';
import classNames from "classnames";

interface CardProps {
    card: {
        id: number;
        href: string;
        value: string;
        image: string
    }
    isChecked: boolean;
    onToggle: React.Dispatch<React.SetStateAction<boolean>>
}

export const Card: React.FC<CardProps> = props => {

  return (
      <div onClick={() => localStorage.setItem('category', `${props.card.id}`)}>   
     <NavLink className={classNames(!props.isChecked ? "main-card green" : "main-card")} to={props.card.href}>
         <div className="image-card" style={{backgroundImage: `url('./images/${props.card.image}')`}}></div>
         {props.card.value}
     </NavLink>
     </div> 
  );
}

export default Card;
