import React, { Fragment, useRef, useState } from "react";
import data from './cards.json';
import CardCategory from "./CardCategory";
import './CategoryPage.scss';
import classNames from "classnames";
import { useEffect } from "react";
import Header from "../header";

/* interface CardContainerProps {
    isChecked: boolean;
    onToggle: React.Dispatch<React.SetStateAction<boolean>>;
  } */

  interface stars {
    className: string; 
  }

  interface smiles {
    image: string; 
  }

const ActionC: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
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

  React.useEffect(() => {
   const state = localStorage.getItem('state');
   if(state === 'false') {
     setIsChecked(true);
     local();
   } else {
     setIsChecked(false);
     localStorage.clear();
   }
   console.log('режим игры')
 }, [isChecked]);

 const unSort = () => {
    // e.preventDefault();
     //local()
     data[2].sort(() => Math.random() - 0.5).reverse;
 }
 
 const local = () => {
     //e.preventDefault();
        const soundsList = data[2].sort(() => Math.random() - 0.5); 
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
   if(randomSoundIndex === 7) {
     setVisibleBlock((visible) => !visible);
   }
   console.log(randomSoundIndex)
 };

 const toRepeat = () => {
   audioRef.current.ended
   if(audioRef.current.ended){
     audioRef.current.play()
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
 }, [randomSoundIndex]); 

   const checkSound = (src: string, id: number) => {
       if(!isChecked) return        
       if(isChecked && isPlay && src === audioSrc){
       const audio = new Audio(); 
       audio.src = soundEffect.srcCorrect;
       audio.play();
       setIsActive(true);
       setIsClick(id)
      const className = star.starSucces;
      addStar(className)
       setTimeout(() => {
        toNextTrack()
       }, 1500)         
     }
     if(isChecked && isPlay && src !== audioSrc) {
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
  <Header isChecked={isChecked} onToggle={setIsChecked}/> 
    {visibleBlock && <div className="card-field ">
         <div className="rating">
     {stars.map((star, index) => {
       return (
         <div key={index} className={`${star.className}`}></div>
       )
     })}
     </div>
{data[2].map((item: {word: string; translation: string; image: string; audioSrc: string; id: number;}) => 
   <CardCategory key={item.id} item={item} isChecked={isChecked} onToggle={setIsChecked} onClick={checkSound} soundEffect={soundEffect} isActive={isActive} onActive={setIsActive} onSetClick={setIsClick} isClick={isClick} onAdd={addStar}/>
)}
<div className="button" onClick={() => {setIsChange(true); unSort()}}>
  <div className={classNames(isChecked ? "button-text" : "hidden", [!isChange ? "button-text" : "button-repeat"])} onClick={() => {setIsPlay(true); toNextTrack(); toRepeat()}}>Start game</div>
</div>

</div>}
{!visibleBlock && <div className="smile-container">
 <div className="rating">{count}</div>
     {smiles.map((smile, index) => {
       return (
         <div key={index} style={{backgroundImage: `url('${smile.image}')`}}></div>
       )
     })}
     </div>}
</Fragment>
);
}

export default ActionC; 