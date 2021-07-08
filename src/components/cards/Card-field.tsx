import React from 'react';
import './Card.scss';
import Card from './Card';

interface CardFieldProps {
  cards: {
    value: string;
    href: string;
    id: number;
    image: string
}[]
    isChecked: boolean;
    onToggle: React.Dispatch<React.SetStateAction<boolean>>
    onOpenClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardField: React.FC<CardFieldProps> = props => {
    
    return( 
        <div className="card-field" onClick={() => props.onOpenClose(false)}>
          {props.cards.map((card: { id: React.Key; href: string; value: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; image: string; }) => {
            return <Card card={card} key={card.id} isChecked={props.isChecked} onToggle={props.onToggle}/>
          })}
        </div>
    )
}
export default CardField;