import React, { useEffect, useState } from 'react';
import './Card.scss';
import Card from '../Main-page/Main-card';

interface CardFieldProps {
  cards: {
    value: string;
    href: string;
    id: number;
    image: string
}[]
    isChecked: boolean;
    onToggle: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardField: React.FC<CardFieldProps> = props => {
  const items = [{value: "Main Page", href: '/', id: 8},
    {value: "Action (set A)", href: './cards', id: 0}, {value: "Action (set B)", href: './cards', id: 1},
    {value: "Fruits", href: './cards', id: 6}, {value: "Color", href: './cards', id: 7}, {value: "Animal (set A)", href: './cards', id: 2}, {value: "Animal (set B)", href: './cards', id: 3}, 
    {value: "Clothes", href: './cards', id: 4}, {value: "Emotion", href: './cards', id: 5}]
 
    return( 
        <div className="card-field" onClick={() => props.onOpenClose(false)}>        
          {props.cards.map((card: { id: number; href: string; value: string; image: string; }) => 
            <Card card={card} key={card.id} isChecked={props.isChecked} onToggle={props.onToggle}/>
          )}
        </div>
    )
}
export default CardField;