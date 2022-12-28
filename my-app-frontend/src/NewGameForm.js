import React, {useState} from "react";

function NewGameForm({ onAddGame }) {
    const [gameData, setGameData] = useState({
        title: '',
        genre: '',
        platform: '',
        price: '',
    })
    function handleChange(event) {
        let name = event.target.name;
        let value = event.target.value
        setGameData({
            ...gameData,
            [name]: value,
        })
      }
      function handleSubmit(event) {
        event.preventDefault()
        fetch("http://localhost:9292/games", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: gameData.title,
              genre: gameData.genre,
              platform: gameData.platform,
              price: gameData.price,
            }),
          })
        .then(r => r.json())
        .then(newGame => onAddGame(newGame))
      }
    return(
        <div className="container" >
            <h1>Add New Game</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label">Title:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control"  placeholder="Title" value={gameData.title} name="title" onChange={handleChange}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label">Genre:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control"  placeholder="Genre" value={gameData.genre} name="genre" onChange={handleChange}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label">Platform:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control"  placeholder="Platform" value={gameData.platform} name="platform" onChange={handleChange}></input>
                    </div>
                </div>
                 <div className="form-group row">
                    <label  className="col-sm-2 col-form-label">Price:</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" placeholder="$0.00" step="0.01" min="0.01" value={gameData.price} name="price" onChange={handleChange}></input>
                    </div>
                </div>
                <div className="form-group row">
                  <div >
                    <button type="submit" onSubmit={handleSubmit} className="btn btn-primary">Save Game</button>
                  </div>
                </div>
            </form>
        </div>
    )
}
export default NewGameForm;