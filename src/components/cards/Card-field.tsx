import React from 'react';
import styles from '@/components/cards/Card.scss'
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
}

export const CardField: React.FC<CardFieldProps> = props => {
    
    return( 
        <div className={styles['card-field']}>
          {props.cards.map((card: { id: React.Key; href: string; value: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; image: string; }) => {
            return <Card card={card} key={card.id} isChecked={props.isChecked} onToggle={props.onToggle}/>
          })}
        </div>
    )
}
export default CardField;