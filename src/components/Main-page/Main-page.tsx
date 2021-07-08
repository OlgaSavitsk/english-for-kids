import React, { Fragment, useState } from 'react';
import CardField  from '../cards/Card-field';
import Header from '../header';

const MainPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

    const cards = [{value: "Action (set A)", href: './cards', image: 'dance.jpg', id: 1}, {value: "Action (set B)", href: './actionB', image: 'swim.jpg', id: 2},
    {value: "Action (set C)", href: './actionC', image: 'carry.jpg', id: 3}, {value: "Adjective", href: './adjective', image: 'big.jpg', id: 4}, {value: "Animal (set A)", href: './animalA', image: 'cat.jpg', id: 5}, {value: "Animal (set B)", href: './animalB', image: 'bird.jpg', id: 6}, 
    {value: "Clothes", href: './clothes', image: 'shirt.jpg', id: 7}, {value: "Emotion", href: './emotion', image: 'smile.jpg', id: 8}]

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
      <Header isChecked={isChecked} onToggle={setIsChecked} onOpenClose={setMenuActive} menuActive={menuActive}/> 
        <div className="card-field">
          <CardField cards={cards} isChecked={isChecked} onToggle={setIsChecked} onOpenClose={setMenuActive}/>
        </div>
        </Fragment>
    )
}

export default MainPage;