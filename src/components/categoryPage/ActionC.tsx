/* import React, { useState } from 'react';
import styles from './CategoryPage.scss'
import data from './cards.json'
import CardCategory from './CardCategory';

const ActionC: React.FC = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const flipHandler = (id: number) => {}
    
    return( 
        <div className={styles['container']}>
            <div className={styles['rating']}></div>
            {data[2].map((item: {word: string; translation: string; image: string; audioSrc: string; id: number;}) => 
      <CardCategory item={item} onFlip={flipHandler}/>
   )}
        </div>
    )
}

export default ActionC; */