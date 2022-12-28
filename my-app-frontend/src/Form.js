import React from "react";

function Form({ formData, onChange, handleSubmit, name }) {

    return(
        <ul className="list-group">
            <li className="list-group-item">Name: {name}</li>
        <form onSubmit={handleSubmit}>
            <li className="list-group-item">Score: <input type="number" min='1' max="5" name="score" value={formData.score} onChange={onChange}></input> </li>
            <li className="list-group-item">Comment: <input type="text" name="comment"  value={formData.comment} onChange={onChange}></input> </li>
            <li className="list-group-item"><button type="submit"  onSubmit={handleSubmit} className="btn btn-outline-primary">💾</button></li>
        </form>
        </ul>
    )
}
export default Form;