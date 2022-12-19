import React from "react";
import Game from "./Game";

function GameReviews({ games, reviews, onDelete, onEdit }) {
    
   const renderList = games.map(game => {
        const currentGameReviews = reviews.filter(review => review.game_id === game.id)
        return(
        <Game 
            key={game.id}
            title={game.title} 
            genre={game.genre} 
            platform={game.platform} 
            price={game.price} 
            reviews={currentGameReviews}
            onDelete={onDelete}
            onEdit={onEdit}
        />)})
    return (
        <div>
            <h1>Game Reviews</h1>
            <div className="row">
                {renderList}
            </div>
        </div>
    )
}
export default GameReviews;