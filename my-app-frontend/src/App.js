import './App.css';
import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import GameReviews from './GameReviews';
import NewGameForm from './NewGameForm';

function App() {
  const [games, setGames] = useState();
  const [reviews, setReviews] = useState();
 
  useEffect(() => {
    fetch('http://localhost:9292/games')
    .then(r => r.json())
    .then(data => setGames(data))
    // fetch('http://localhost:9292/reviews')
    // .then(r => r.json())
    // .then(data => setReviews(data))
  }, [])
  function handleDelete(id) {
    const updatedReviews = reviews.filter(review =>review.id !== id)
    fetch(`http://localhost:9292/reviews/${id}`, {
      method: 'DELETE'
    })
    .then(setReviews(updatedReviews))
  }
  
  function handleUpdateReviews(updatedReviewObj) {
    const updatedReviews = reviews.map(review => {
      if (review.id === updatedReviewObj.id) 
        return updatedReviewObj
      else {
        return review
      }
    })
    setReviews(updatedReviews)
  }

  function handleAddReview(newReview) {
    setReviews([...reviews, newReview])
  }

  function handleAddGame(newGame) {
    setGames([...games, newGame])
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/game-reviews' element={
        <GameReviews 
        games={games} 
        reviews={reviews} 
        onDelete={handleDelete} 
        onUpdateReviews={handleUpdateReviews}
        onAddReview={handleAddReview}
        />}>

        </Route>
        <Route path='/' element={<Home />}></Route>
      </Routes>
      <Routes>
        <Route path='/new-game' element={
          <NewGameForm onAddGame={handleAddGame}/>
        }>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
