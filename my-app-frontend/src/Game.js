import React, {useState} from "react";
import Reviews from './Reviews'
import AddReviewForm from "./AddReviewForm";

function Game({ id, title, genre, platform, price, reviews, onDelete, onUpdateReviews, onAddReview }) {
    const [showReviews, setShowReviews] = useState(false);
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        id: id,
        name: '',
        score: '',
        comment: '',
    });
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
    const currentGameReviews = reviews.filter(review => review.game_id === id)
    const renderReviews = currentGameReviews.map(review => 
        <Reviews 
            id={review.id}
            name={review.name}
            score={review.score}
            comment={review.comment} 
            onDelete={onDelete} 
            onChange={handleChange}
            formData={formData}
            onUpdateReviews={onUpdateReviews}
        />)
        const averageScore = Math.ceil(currentGameReviews.reduce((a, b) => a + b.score, 0) / currentGameReviews.length);
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
                        onAddReview={onAddReview}
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