import React, { Fragment, useState } from 'react';
import CardField  from '../cards/Card-field';
import Header from '../header';

const MainPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

    const cards = [{value: "Action (set A)", href: './cards', image: 'dance.jpg', id: 1}, {value: "Action (set B)", href: './cards', image: 'swim.jpg', id: 2},
    {value: "Action (set C)", href: './cards', image: 'carry.jpg', id: 3}, {value: "Adjective", href: './cards', image: 'big.jpg', id: 4}, {value: "Animal (set A)", href: './cards', image: 'cat.jpg', id: 5}, {value: "Animal (set B)", href: './cards', image: 'bird.jpg', id: 6}, 
    {value: "Clothes", href: './cards', image: 'shirt.jpg', id: 7}, {value: "Emotion", href: './cards', image: 'smile.jpg', id: 8}]

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
      <Header isChecked={isChecked} onToggle={setIsChecked}/> 
        <div className="card-field">
          <CardField cards={cards} isChecked={isChecked} onToggle={setIsChecked}/>
        </div>
        </Fragment>
    )
}

export default MainPage;