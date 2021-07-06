import React, { useRef, useState } from 'react';
import styles from './CategoryPage.scss'
import data from '../../../public/cards.json'
import CardCategory from './CardCategory';

interface CardContainerProps {
    isChecked: boolean;
    onToggle: React.Dispatch<React.SetStateAction<boolean>>;
  }

const ActionB: React.FC<CardContainerProps> = props => {
    const [isChange, setIsChange] = useState(false);
     const soundEffect = {srcError: './audio/error.mp3', srcCorrect: './audio/correct.mp3'}
     const [isPlay, setIsPlay] = useState(false);
     const [sound, setRandomSound] = useState('');   

    const audioRef = useRef(new Audio(sound));
    const [randomSoundIndex, setRandomSoundIndex] = useState(0);
    const isReady = useRef(false);
    const [isActive, setIsActive] = useState(false);
    const [isClick, setIsClick] = useState(0); 

    const toNextTrack = () => {
        //setRandomSound(data[0][Math.floor(Math.random() * 8)]);
      // getRandomSound()
         if (randomSoundIndex < 8) {
           setRandomSoundIndex(randomSoundIndex + 1);
         } else {
           setRandomSoundIndex(0);
         }
       };
   

    const checkSound = (src: string, id: number) => {
        if(!props.isChecked) return            
        if(props.isChecked && isPlay && src === sound){
         
          const audio = new Audio(); 
        audio.src = soundEffect.srcCorrect;
        audio.play();
        setIsActive(true);
        setIsClick(id)
        console.log(src)
        console.log(sound)
        setTimeout(() => {
          toNextTrack()
        }, 1500)         
      }
      if(props.isChecked && src !== sound) {
        const audio = new Audio();
      audio.src = soundEffect.srcError;
      audio.play();
      setIsActive(false)
      setIsClick(id)
    }
  }
    
    return( 
        <div className={styles['container']}>
            <div className={styles['rating']}></div>
            {data[5].map((item: {word: string; translation: string; image: string; audioSrc: string; id: number;}) => 
      <CardCategory key={item.id} item={item} isChecked={props.isChecked} onToggle={props.onToggle} isPlay={isPlay} onClick={checkSound} soundEffect={soundEffect} isActive={isActive} onActive={setIsActive} onSetClick={setIsClick} isClick={isClick}/>
   )}
        </div>
    )
}

export default ActionB;