import React, { Fragment, useRef, useState } from "react";
import data from './cards.json';
import CardCategory from "./CardCategory";
//import styles from './CategoryPage.scss'
import styles from './CategoryPage.scss'
import classNames from "classnames";
import { useEffect } from "react";

interface CardContainerProps {
  isChecked: boolean;
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
  //onAdd: (className: string) => void;
}

interface stars {
  className: string; 
}

interface smiles {
  image: string; 
}

export const CardContainer: React.FC<CardContainerProps> = props => {
     const [isChange, setIsChange] = useState(false);
     const soundEffect = {srcError: './audio/error.mp3', srcCorrect: './audio/correct.mp3'}

        /* const addRandomSound = () => {
         // const index = Math.floor(Math.random() * 8);
          //const newSound = [...randomSound, index];
          const sounds = data[0].sort(() => Math.random() - 0.5)
          sounds.forEach(element => {
            setRandomSound(prev => (element.audioSrc, randomSound))
          });
        } */

        /* const [randomSound, setRandomSound] = useState(
      data[0][randomNumber]
      //data[0].sort(() => Math.random() - 0.5)
      ); */
      
      const [minId, setMinId] = useState(0);
      const [maxId, setMaxId] = useState(7)
    const [randomSoundIndex, setRandomSoundIndex] = useState(0);
    const [isPlay, setIsPlay] = useState(false);
  const [randomSound, setRandomSound] = useState(data[0][Math.floor(Math.random() * 8)]);
  /* const sounds = data[0].sort(() => Math.random() - 0.5).forEach(sound => {
    
  }); */
  //const sounds = data[0].sort(() => Math.random() - 0.5)
   // const { audioSrc } = data[0][randomSoundIndex];
   

    const isReady = useRef(false);
    const audioRef = useRef(new Audio(randomSound.audioSrc));

    const [isActive, setIsActive] = useState(false);
    const [isClick, setIsClick] = useState(0); 
   

    const [count, setCount] = useState(0);
      

    const toNextTrack = () => {     
   setRandomSound(data[0][Math.floor(Math.random() * 8)]);

   //setRandomSoundIndex(Math.floor(Math.random() * data[0].length - 1))
    //console.log(setRandomSound(data[0][Math.floor(Math.random() * data[0].length)]))
      if (randomSoundIndex < data[0].length - 1) {
        setRandomSoundIndex(randomSoundIndex + 1);
     }     
     else {
        setRandomSoundIndex(0);
      }    
    };

    const toRepeat = () => {
      if (randomSoundIndex < 8) {
        setRandomSoundIndex(randomSoundIndex + 1);
      } else {
        setRandomSoundIndex(0);
      }
    }; 

     useEffect(() => {  
       const sounds = data[0].sort(() => Math.random() - 0.5) 
     audioRef.current = new Audio(randomSound.audioSrc);
      if (isReady.current) {
        audioRef.current.play();
        setIsPlay(true);       
      } else {
        isReady.current = true;
      }
    }, [randomSoundIndex]); 

      const checkSound = (src: string, id: number) => {
          if(!props.isChecked) return            
          if(props.isChecked && isPlay && src === randomSound.audioSrc){
          const audio = new Audio(); 
          audio.src = soundEffect.srcCorrect;
          audio.play();
          setIsActive(true);
          setIsClick(id)
         const className = star.starSucces;
         addStar(className)
          console.log(src)
          /* console.log(audioSrc) */
          setTimeout(() => {
           toNextTrack()
           
          }, 1500)         
        }
        if(props.isChecked && isPlay && src !== randomSound.audioSrc) {
          const audio = new Audio();
        audio.src = soundEffect.srcError;
        audio.play();
        setIsActive(false)
        setIsClick(id)
        const className = star.starError;
        addStar(className);
        setCount(count + 1)
      }
    }

  const star = {starSucces: 'star__succes',
      starError: 'star__error'}; 
  const [stars, setStar] = useState<stars[]>([])

  const addStar = (className: string) => {   
    const newStar: stars = {
      className: className,
    }
    setStar(prev => [newStar, ...stars])
  }

  const smile = [{image: './images/success.png'},
  {image: './images/fail.png'}];

  const [smiles, setSmiles] = useState<smiles[]>([])

  const addSmile = (image: string) => {
    const newSmile: smiles = {
      image: image,
    }
    setSmiles(prev => [newSmile, ...smiles])
  }

  return (
    <Fragment>
       <div className={styles['container']}>
            <div className={styles['rating']}>
        {stars.map(star => {
          return (
            <div className={styles[`${star.className}`]}></div>
          )
        })}
        </div>
   {data[0].map((item: {word: string; translation: string; image: string; audioSrc: string; id: number;}) => 
      <CardCategory key={item.id} item={item} isChecked={props.isChecked} onToggle={props.onToggle} isPlay={isPlay} onClick={checkSound} soundEffect={soundEffect} isActive={isActive} onActive={setIsActive} onSetClick={setIsClick} isClick={isClick} onAdd={addStar}/>
   )}
   <div className={styles['button']} onClick={() => setIsChange(true)}>
     <div className={classNames(props.isChecked ? styles['button-text'] : styles['hidden'], [!isChange ? styles['button-text'] : styles['button-repeat']])} onClick={() => {setIsPlay(true); toRepeat()}}>Start game</div>
   </div>
   <audio className={styles['audio']} src=""></audio>
   <audio className={styles['audio-effect']} src=""></audio>
   </div>
   <div className={styles['smile-container']}>
    <div className={styles['rating']}>{count}</div>
        {smiles.map(smile => {
          return (
            <div style={{backgroundImage: `url('${smile.image}')`}}></div>
          )
        })}
        </div>
   </Fragment>
  );
}

export default CardContainer;