import React, { Fragment, Props, useRef, useState } from "react";
import data from './cards.json';
import CardCategory from "./CardCategory";
import './CategoryPage.scss';
import classNames from "classnames";
import { useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

interface CardContainerProps {
  isChecked: boolean;
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenClose: React.Dispatch<React.SetStateAction<boolean>>;
  menuActive: boolean;
}

interface stars {
  className: string; 
}

interface cards {
  word: string,
  translation: string,
  image: string,
  audioSrc: string,
  id: number 
}

export const CardContainer: React.FC<CardContainerProps> = props => {
   
     const [isChange, setIsChange] = useState(false);
     const soundEffect = {srcError: './audio/error.mp3', srcCorrect: './audio/correct.mp3'}
  
    const [randomSoundIndex, setRandomSoundIndex] = useState(0);
    const [isPlay, setIsPlay] = useState(false);
    const audioSrc = localStorage.getItem(`sound${randomSoundIndex}`); 
    const isReady = useRef(false);
    const audioRef = useRef(new Audio(audioSrc!));

    const [isActive, setIsActive] = useState(false);
    const [isClick, setIsClick] = useState(0); 
    const [visibleBlock, setVisibleBlock] = useState(true);
    const [count, setCount] = useState(0);
    const [audioArr, setAudioArr] = useState<Array<string>>([]);   
    let history = useHistory();
    const [cardIndex, setCardIndex] = useState<number>(Number(localStorage.getItem('category')));

    useEffect(() => {
     setCardIndex(cardIndex) 
      addCardIndex()
      if(props.menuActive) {
        setCardIndex(cardIndex) 
      }
    }) 

    const addCardIndex = () => {  
      const category = Number(localStorage.getItem('category')) 
      const newIndex = category
      setCardIndex(prev => newIndex)
    }

     React.useEffect(() => {
      const state = localStorage.getItem('state');
      if(state === 'false') {
        props.onToggle(true);
       
        saveSounds()
        unSort()  
        setCardIndex(cardIndex)    
        //addCardIndex() 
      } else {
        props.onToggle(false);
       
        localStorage.clear()
        setCardIndex(cardIndex) 
        //addCardIndex()
      }
    }, [props.isChecked]);

    const unSort = () => {
       data[cardIndex].sort(() => Math.random() - 0.5).reverse;
   }
   
   const saveSounds =() => {
        const soundsList = data[cardIndex].sort(() => Math.random() - 0.5);
          localStorage.setItem('sound0', soundsList[0].audioSrc);
          localStorage.setItem('sound1', soundsList[1].audioSrc);
          localStorage.setItem('sound2', soundsList[2].audioSrc);
          localStorage.setItem('sound3', soundsList[3].audioSrc);
          localStorage.setItem('sound4', soundsList[4].audioSrc);
          localStorage.setItem('sound5', soundsList[5].audioSrc);
          localStorage.setItem('sound6', soundsList[6].audioSrc);
          localStorage.setItem('sound7', soundsList[7].audioSrc);    
   }

    const toNextSound = () => {
       if (randomSoundIndex < data[0].length - 1) {
        setRandomSoundIndex(randomSoundIndex + 1);
      } else {
        setRandomSoundIndex(0);
      }      
    };

    const toRepeatSound = () => {
      if(audioRef.current.ended) {
        audioRef.current.play();
        setRandomSoundIndex(randomSoundIndex);
    }
    };

    useEffect(() => {
      if (isPlay) {
        setRandomSoundIndex(1);          
      } 
    }, [isPlay]);

      useEffect(() => {     
    audioRef.current = new Audio(audioSrc!);
      if (isPlay) {
        audioRef.current.play();
        setIsPlay(true);       
      } else {
        isReady.current = true;
      }
      if(audioArr.length === 8) {
        audioRef.current.pause();
        isPlay
        setVisibleBlock((visible) => !visible);
       if (count) {
         const audio = new Audio('./audio/failure.mp3')
         audio.play()
       } else {
        const audio = new Audio('./audio/success.mp3')
        audio.play()
      }
        setTimeout(() => {
          history.push('/')
        }, 4000)
      }
    }, [randomSoundIndex]); 

      const checkSound = (src: string, id: number) => {       
          if(!props.isChecked) return        
          if(props.isChecked && isPlay && src === audioSrc){
          const audio = new Audio(); 
          audio.src = soundEffect.srcCorrect;
          audio.play();
          setIsActive(true);
          setIsClick(id)  
          audioArr.push(src)        
          console.log(audioArr) 
         const className = star.starSucces;
         addStar(className)
          setTimeout(() => {
           toNextSound()
          }, 1500)         
        }
        if(props.isChecked && isPlay && src !== audioSrc) {
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
  
  return (
    <Fragment>
       {visibleBlock && <div className="card-field" onClick={() => {props.onOpenClose(false) }}>
            <div className="rating">
        {stars.map((star, index) => {
          return (
            <div key={index} className={`${star.className}`}></div>
          )
        })}
        </div>
   {data[cardIndex].map((item: {word: string; translation: string; image: string; audioSrc: string; id: number;}) => 
      <CardCategory key={item.id} item={item} isChecked={props.isChecked} onToggle={props.onToggle} onClick={checkSound} soundEffect={soundEffect} isActive={isActive} onActive={setIsActive} onSetClick={setIsClick} isClick={isClick} onAdd={addStar} /* cardIndex={props.cardIndex} onChengeCards={props.onChengeCards} *//>
   )}    
   <div className="button" onClick={() => {setIsChange(true)}}>
     <div className={classNames(props.isChecked ? "button-text" : "hidden", [!isChange ? "button-text" : "button-repeat"])} onClick={() => {setIsPlay(true); /* toNextTrack(); */ toRepeatSound()}}>Start game</div>
   </div>
   
   </div>}
   {!visibleBlock && <div className="smile-container">
    <div className="smile-count">{count} errors</div>
            <div className={classNames(count ? "smile__fail" : "", !count ? "smile__success" : "")}></div>         
        </div>}
   </Fragment>
  );
}

export default CardContainer;