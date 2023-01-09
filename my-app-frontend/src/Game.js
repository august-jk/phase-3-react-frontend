import React, {useEffect, useState} from "react";
import Reviews from './Reviews'
import AddReviewForm from "./AddReviewForm";

function Game({ id, title, genre, platform, price, reviews, averageScore, updateGames }) {
    const [gameReviews, setGameReviews] = useState([]);
    const [showReviews, setShowReviews] = useState(false);
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        id: id,
        name: '',
        score: '',
        comment: '',
    });
    useEffect(() => setGameReviews(reviews), [reviews])
    function handleDelete(id) {
        const updatedReviews = gameReviews.filter(review =>review.id !== id)
        fetch(`http://localhost:9292/reviews/${id}`, {
          method: 'DELETE'
        })
        .then(setGameReviews(updatedReviews))
      }
      
    function handleUpdateReviews(updatedReviewObj) {
        const updatedReviews = gameReviews.map(review => {
          if (review.id === updatedReviewObj.id) 
            return updatedReviewObj
          else {
            return review
          }
        })
        setGameReviews(updatedReviews)
        setFormData({
            id: id,
            name: '',
            score: '',
            comment: '',
        })
    }
    
    function handleAddReview(newReview) {
        setGameReviews([...gameReviews, newReview])
        setFormData({
            id: id,
            name: '',
            score: '',
            comment: '',
        })
        setShowForm(!showForm)
    }

    function handleChange(event) {
        let name = event.target.name;
        let value = event.target.value
        setFormData({
          ...formData,
          [name]: value,
        })
    }
    function handleShowReviews() {
        setShowReviews(!showReviews)
    }
    function handleShowForm() {
        setShowForm(!showForm)
    }
    function renderReviews() {
        if(reviews === undefined) {
            console.log('undefined')
            return(
                <p className="list-group-item">No reviews yet!</p >
            )
        }
        else if(gameReviews.length === 0){
            return(
                <p className="list-group-item">No reviews yet!</p >
            )
        }
        else{
            return(
                gameReviews.map(review => 
                    <Reviews 
                        gameId={review.game_id}
                        id={review.id}
                        name={review.name}
                        score={review.score}
                        comment={review.comment} 
                        onDelete={handleDelete} 
                        onChange={handleChange}
                        formData={formData}
                        onUpdateReviews={handleUpdateReviews}
                    />)
            )
        }
    }
    function averageScoreCalculator() {
        if(reviews === undefined ) {
            console.log('undefined')
            return(
                <p className="list-group-item">N/A</p >
            )
        }
        else if(gameReviews.length === 0)
            return(
                <p className="list-group-item">N/A</p >
            )
       else{
            // const averageScore = Math.ceil(gameReviews.reduce((a, b) => a + b.score, 0) / gameReviews.length);
            const star = '⭐'
            return(star.repeat(averageScore))
        } 
    }

    return(
        <div className="col-sm-6" id={id}>
        <div className="card">
            <h4> {title} </h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{genre}</li>
                <li className="list-group-item">{platform}</li>
                <li className="list-group-item">$ {price}</li>
                <li className="list-group-item">{averageScoreCalculator()}</li>
                <li className="list-group-item">
                    <button className="accordian btn btn-outline-primary" onClick={handleShowReviews}>Show Reviews</button>
                    <button className='accordian btn btn-outline-primary' onClick={handleShowForm}>Review Game</button>
                    <div className="panel">
                        {showForm ? 
                        <AddReviewForm 
                        onAddReview={handleAddReview}
                        onChange={handleChange}
                        formData={formData}
                        /> : null}
                        {showReviews ? 
                        renderReviews() : null}
                    </div>
                </li>
            </ul>
        </div>
        </div>
    )
}
export default Game;