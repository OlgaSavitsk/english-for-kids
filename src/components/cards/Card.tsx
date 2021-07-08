import React from "react";
import { useHistory } from "react-router";
import { NavLink } from 'react-router-dom';
import './Card.scss';
import classNames from "classnames";

interface CardProps {
    card: {
        id: React.Key;
        href: string;
        value: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
        image: string
    }
    isChecked: boolean;
    onToggle: React.Dispatch<React.SetStateAction<boolean>>
}

export const Card: React.FC<CardProps> = props => {
    const history = useHistory()

  return (
     <NavLink className={classNames(!props.isChecked ? "main-card green" : "main-card")} to={props.card.href}>
         <div className="image-card" style={{backgroundImage: `url('./images/${props.card.image}')`}}></div>
         {props.card.value}
     </NavLink>
  );
}

export default Card;