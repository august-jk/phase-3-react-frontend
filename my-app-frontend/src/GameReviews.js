import React from "react";
import Game from "./Game";

function GameReviews({ games, reviews, onDelete, onUpdateReviews }) {
    
   const renderList = games.map(game => {
        
        return(
        <Game 
            id={game.id}
            title={game.title} 
            genre={game.genre} 
            platform={game.platform} 
            price={game.price} 
            reviews={reviews}
            onDelete={onDelete}
            onUpdateReviews={onUpdateReviews}
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