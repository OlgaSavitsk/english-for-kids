import React, { Fragment, useRef, useState } from "react";
import data from './cards.json';
import CardCategory from "./CardCategory";
import './CategoryPage.scss';
import classNames from "classnames";
import { useEffect } from "react";
import { BrowserRouter, Switch, Route, NavLink, Redirect, useHistory } from 'react-router-dom';
import MainPage from "../Main-page/Main-page";

interface CardContainerProps {
  isChecked: boolean;
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
  //onAdd: (className: string) => void;
 /*  onUnSort: (e: {
    preventDefault: () => void;
  }) => void */
}

interface stars {
  className: string; 
}

interface smiles {
  image: string; 
}

export const CardContainer: React.FC<CardContainerProps> = props => {
  /* const sounds = ['./audio/cry.mp3', "./audio/dance.mp3", "./audio/dive.mp3", "./audio/draw.mp3", "./audio/fish.mp3",  "./audio/hug.mp3", "./audio/jump.mp3",  "./audio/fly.mp3"] */
   
   
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

     React.useEffect(() => {
      const state = localStorage.getItem('state');
      if(state === 'false') {
        props.onToggle(true);
        local()
      } else {
        props.onToggle(false);
        localStorage.clear()
      }
      console.log('режим игры')
    }, [props.isChecked]);

    const unSort = () => {
       data[0].sort(() => Math.random() - 0.5).reverse;
   }
   
   const local =() => {
          const soundsList = data[0].sort(() => Math.random() - 0.5); 
          localStorage.setItem('sound0', soundsList[0].audioSrc)
          localStorage.setItem('sound1', soundsList[1].audioSrc)
          localStorage.setItem('sound2', soundsList[2].audioSrc)
          localStorage.setItem('sound3', soundsList[3].audioSrc)
          localStorage.setItem('sound4', soundsList[4].audioSrc)
          localStorage.setItem('sound5', soundsList[5].audioSrc)
          localStorage.setItem('sound6', soundsList[6].audioSrc)
          localStorage.setItem('sound7', soundsList[7].audioSrc)      
   }

    const toNextTrack = () => {
      if (randomSoundIndex < data[0].length - 1) {
        setRandomSoundIndex(randomSoundIndex + 1);
      } else {
        setRandomSoundIndex(0);
      } 
      
      console.log(randomSoundIndex)
    };

    const toRepeat = () => {
     // e.preventDefault();
      audioRef.current.ended
      if(audioRef.current.ended) {
        audioRef.current.play();
        setRandomSoundIndex(randomSoundIndex);
    }
    }; 

      useEffect(() => {      
     audioRef.current = new Audio(audioSrc!);
      if (isReady.current) {
        audioRef.current.play();
        setIsPlay(true);       
      } else {
        isReady.current = true;
      }
      if(audioArr.length === 8) {
        audioRef.current.pause();
        isPlay
        setVisibleBlock((visible) => !visible);
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
           toNextTrack()
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

  const smile = {imageSuccess: 'smile__success',
  imageFail: 'smile__fail'};
  const [smiles, setSmiles] = useState<smiles[]>([])
  const addSmile = (image: string) => {
    const newSmile: smiles = {
      image: image,
    }
    setSmiles(prev => [newSmile, ...smiles])
  }

  useState(() => {
   
  })

  return (
    <Fragment>
       {visibleBlock && <div className="card-field ">
            <div className="rating">
        {stars.map((star, index) => {
          return (
            <div key={index} className={`${star.className}`}></div>
          )
        })}
        </div>
   {data[0].map((item: {word: string; translation: string; image: string; audioSrc: string; id: number;}) => 
      <CardCategory key={item.id} item={item} isChecked={props.isChecked} onToggle={props.onToggle} onClick={checkSound} soundEffect={soundEffect} isActive={isActive} onActive={setIsActive} onSetClick={setIsClick} isClick={isClick} onAdd={addStar}/>
   )}
   <div className="button" onClick={() => {setIsChange(true); unSort()}}>
     <div className={classNames(props.isChecked ? "button-text" : "hidden", [!isChange ? "button-text" : "button-repeat"])} onClick={() => {setIsPlay(true); toNextTrack();  toRepeat()}}>Start game</div>
   </div>
   
   </div>}
   {!visibleBlock && <div className="smile-container">
    <div className="smile-count">{count} errors</div>
            <div className={classNames(count ? "smile__fail" : "smile__success")}></div>         
        </div>}
   </Fragment>
  );
}

export default CardContainer;