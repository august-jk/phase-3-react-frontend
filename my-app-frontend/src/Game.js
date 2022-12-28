import React, {useState} from "react";
import Reviews from './Reviews'
import AddReviewForm from "./AddReviewForm";

function Game({ id, title, genre, platform, price, reviews }) {
    const [gameReviews, setGameReviews] = useState(reviews);
    const [showReviews, setShowReviews] = useState(false);
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        id: id,
        name: '',
        score: '',
        comment: '',
    });
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
      }
    
      function handleAddReview(newReview) {
        setGameReviews([...gameReviews, newReview])
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
    // const currentGameReviews = reviews.filter(review => review.game_id === id)
    const renderReviews = gameReviews.map(review => 
        <Reviews 
            id={review.id}
            name={review.name}
            score={review.score}
            comment={review.comment} 
            onDelete={handleDelete} 
            onChange={handleChange}
            formData={formData}
            onUpdateReviews={handleUpdateReviews}
        />)
        const averageScore = Math.ceil(gameReviews.reduce((a, b) => a + b.score, 0) / gameReviews.length);
        const star = '⭐'
    return(
        <div className="col-sm-6" id={id}>
        <div className="card">
            <h4> {title} </h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{genre}</li>
                <li className="list-group-item">{platform}</li>
                <li className="list-group-item">$ {price}</li>
                <li className="list-group-item">{star.repeat(averageScore)}</li>
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
                        renderReviews : null}
                    </div>
                </li>
            </ul>
        </div>
        </div>
    )
}
export default Game;