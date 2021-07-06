import React, { useState } from 'react';
import styles from './CategoryPage.scss'
import data from './cards.json'
import CardCategory from './CardCategory';

const AnimalA: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
    const randomSound = data[0][Math.floor(Math.random() * 8)];
   
    const startGame = (src: string) => {
      //const randomSound = data[0][Math.floor(Math.random() * 8)];    
      const audio = new Audio();  
      audio.src = src
      audio.play(); 
      
      //return randomSound.audioSrc                
    }
    
    return( 
        <div className={styles['container']}>
            <div className={styles['rating']}></div>
            {data[4].map((item: {word: string; translation: string; image: string; audioSrc: string; id: number;}) => 
      <CardCategory key={item.id} item={item}/* onFlip={flipHandler} */  isChecked={isChecked} onToggle={setIsChecked} /* randomSound={randomSound} */ onPlay={startGame}/>
   )}
        </div>
    )
}

export default AnimalA;