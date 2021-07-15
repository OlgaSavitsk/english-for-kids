import React, { Fragment, useState } from 'react';
import CardField  from './Main-card-field';
import Header from '../header';
import data from '../CategoryPage/cards.json';
import { useEffect } from 'react';

const MainPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

    const cards = [
      {value: "Action (set A)", href: './cards', image: 'dance.jpg', id: 0}, {value: "Action (set B)", href: './cards', image: 'swim.jpg', id: 1},
      {value: "Fruits", href: './cards', image: 'apple.svg', id: 6}, {value: "Color", href: './cards', image: 'yellow.svg', id: 7}, {value: "Animal (set A)", href: './cards', image: 'cat.jpg', id: 2}, {value: "Animal (set B)", href: './cards', image: 'bird.jpg', id: 3}, 
      {value: "Clothes", href: './cards', image: 'shirt.jpg', id: 4}, {value: "Emotion", href: './cards', image: 'smile.jpg', id: 5}
  ]

  React.useEffect(() => {
    const state = localStorage.getItem('state');
    if(state === 'false') {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }, [isChecked])

    return(
      <Fragment>
      <Header isChecked={isChecked} onToggle={setIsChecked} onOpenClose={setMenuActive} menuActive={menuActive} /* onChengeCards={setCardIndex} cardIndex={cardIndex} *//> 
          <CardField cards={cards} isChecked={isChecked} onToggle={setIsChecked} onOpenClose={setMenuActive}/*  onChengeCards={setCardIndex} cardIndex={cardIndex} *//>
        </Fragment>
    )
}

export default MainPage;