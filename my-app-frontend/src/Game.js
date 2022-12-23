import React, {useState} from "react";
import Reviews from './Reviews'

function Game({ id, title, genre, platform, price, reviews, onDelete, onUpdateReviews }) {
    const [isActive, setIsActive] = useState(false);
    function handleClick() {
        setIsActive(!isActive)
    }
    const currentGameReviews = reviews.filter(review => review.game_id === id)
    const renderReviews = currentGameReviews.map(review => 
        <Reviews 
            id={review.id}
            name={review.name}
            score={review.score}
            comment={review.comment} 
            onDelete={onDelete} 
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
                    <button className="accordian" onClick={handleClick}>Show Reviews</button>
                    <div className="panel">
                        {isActive ? 
                        renderReviews : null}
                    </div>
                </li>
            </ul>
        </div>
        </div>
    )
}
export default Game;