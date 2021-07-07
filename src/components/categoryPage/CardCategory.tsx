import React, { useState } from "react";
import './CategoryPage.scss';
import classNames from "classnames";
import { useEffect } from "react";

interface CardCategoryProps {
  item: {
        id: number;
        word: string;
        translation: string;
        image: string;
        audioSrc: string;
} 
  /* onFlip(id: number): void; */
  isChecked: boolean;
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
  isPlay: boolean;
  onClick: (src: string, id: number) => void;
 isActive: boolean;
 onActive: React.Dispatch<React.SetStateAction<boolean>>; 
 soundEffect: {
  srcError: string;
  srcCorrect: string;
};
isClick: number;
onSetClick: React.Dispatch<React.SetStateAction<number>>;
onAdd: (className: string) => void;
}

export const CardCategory: React.FC <CardCategoryProps> = props => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isUnActive, setIsUnActive] = useState(false); 
 //const [isClick, setIsClick] = useState(false); 
  
  function playAudio(src: string) {
    if(!props.isChecked){
      const audio = new Audio();
      audio.src = src;
      audio.play();
    }  
  }

  React.useEffect(() => {
    const state = localStorage.getItem('state');
    if(state === 'false') {
      props.onToggle(true)
    } else {
      props.onToggle(false)
    }
    console.log('режим игры')
  }, [props.isChecked])

useEffect(() => {
if(props.isClick === props.item.id && props.isActive) {
  setIsUnActive(true)
}
})

  const unActive = () => {
    props.onClick(props.item.audioSrc, props.item.id) ;
    props.onSetClick(props.item.id) 
  } 

    return (    
   <div className="card-container" onMouseLeave={() => setIsFlipped(false)}>
    <div className={classNames(isFlipped ? "flipped" : "card"/* , props.isChecked ? [styles['card'], styles['card-cover']]: styles['card'] */)}>
         <div className={classNames(props.isChecked ? "card__front cover" : "card__front", (props.isClick === props.item.id && props.isActive) ? "inactive" : '', isUnActive ? "inactive" : '')} style={{backgroundImage: `url('${props.item.image}')`}}
          onClick={() =>{playAudio(props.item.audioSrc);  props.onSetClick(props.item.id);  /* props.onClick(props.item.audioSrc); */  unActive()}}>
            <div className={classNames(props.isChecked ? "card-title hidden" : "card-title")}>{props.item.word}</div>
          </div>
          <div className="card__back" style={{backgroundImage: `url('${props.item.image}')`}}>
            <div className={classNames(props.isChecked ? "card-title hidden": "card-title")}>{props.item.translation}</div>
          </div>
          <div className={classNames(props.isChecked ? "rotate none": "rotate")} onClick={() => setIsFlipped(true)}></div>
    </div>
  </div>
  
  )
}

export default CardCategory;

function play(audioSrc: string): void {
  throw new Error("Function not implemented.");
}
