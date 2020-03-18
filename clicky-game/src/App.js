import React, { useState, useEffect } from 'react';
import Board from './components/board';
import initializeDeck from './deck'
import logo from './logo.svg';
import './App.css';

export default function App() {
  const [cards, setCards] = useState([]);
  const [dimension, setDimension] = useState(400);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const sameCardClicked = (id) => flipped.includes(id);


  const handleClick = (id) => {
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id])
      setDisabled(false)
    }
    else {
      if (sameCardClicked(id)) return
      setFlipped([flipped[0], id])
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        resetCards()
        // updateScore(score, checkScore);
      } else {
        noMatch();
      }
    }
  
  }
  const noMatch = () => {
    // updateGuesses(wrongGuesses, checkGuesses);
    setTimeout(resetCards, 2000);
  }

  const preloadImages = () => 
  cards.map((card) => {
    const src = `/img/${card.type}.png`;
    new Image().src = src;
  })

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  }
useEffect(() => {
  resizeBoard()
  setCards(initializeDeck())
}, [])

useEffect(() => {
  preloadImages()
}, cards);

useEffect(() => {
  const resizeListener = window.addEventListener('resize', resizeBoard)
  return () => window.removeEventListener('resize', resizeListener)
}, [])
const resizeBoard = () => {
  setDimension(Math.min(
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
  ))
}
const isMatch = (id) => {
  const clicked = cards.find((card) => card.id === id);
  const flippedCard = cards.find((card) => flipped[0] === card.id);
  /* 
    Add 2 properties to state:
      -currentScore
      -topScore  
    If match
     1)increase currentScore by 1
     2)check if current score is greater than topScore, if yes
       set topScore to value of currentScore
    If not match
      -reset currentScore

  */
  return flippedCard.type === clicked.type;
}
return (
  <div className="App">
    <h2>Can you remmber where the cards are?</h2>
    <Board
      dimension={dimension}
      cards={cards}
      flipped={flipped}
      handleClick={handleClick}
      disabled={disabled}
      solved={solved}
    />

  </div>
);
}
