import React, {useState} from "react";
import Game from "./Game";
import NewGameForm from "./NewGameForm";


function GameReviews({ games, onAddGame, updateGames }) {
    const [isActive, setIsActive] = useState(false)
 
    function handleClick() {
        setIsActive(!isActive)
    }
   const renderList = games.map(game => {
        return(
            <Game 
            id={game.id}
            title={game.title} 
            genre={game.genre} 
            platform={game.platform} 
            price={game.price} 
            reviews={game.reviews}
            averageScore={game.average_score}
            updateGames={updateGames}
        />
        )
   })
    return (
        <div>
            <h1>Game Reviews</h1>
            <button onClick={handleClick} >Add Game</button>
            {isActive ? <NewGameForm onAddGame={onAddGame}/> : null}
            <div className="row">
                {renderList}
            </div>
        </div>
    )
}
export default GameReviews;