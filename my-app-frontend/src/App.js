import './App.css';
import React, {useEffect, useState} from 'react';
import GameReviews from './GameReviews';


function App() {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:9292/games')
    .then(r => r.json())
    .then(data => setGames(data))
  }, [])

  
  function handleAddGame(newGame) {
    setGames([...games, newGame])
    console.log(newGame.reviews)
  }
  return (
    <div className="App">
        <GameReviews 
        games={games}
        onAddGame={handleAddGame} 
        />
    </div>
  );
}

export default App;
