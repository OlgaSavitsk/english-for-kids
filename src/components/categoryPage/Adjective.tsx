import React, { useState } from 'react';
import styles from './CategoryPage.scss'
import data from './cards.json'
import CardCategory from './CardCategory';

const Adjective: React.FC = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const flipHandler = (id: number) => {}
    
    return( 
        <div className={styles['container']}>
            <div className={styles['rating']}></div>
            {data[3].map((item: {word: string; translation: string; image: string; audioSrc: string; id: number;}) => 
      <CardCategory /* flipped={isFlipped} setFlipped={setIsFlipped} */ item={item} onFlip={flipHandler}/>
   )}
        </div>
    )
}

export default Adjective;