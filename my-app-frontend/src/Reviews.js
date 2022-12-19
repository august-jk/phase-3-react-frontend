import React from "react";

function Reviews({ id, name, score, comment, onDelete, onEdit }) {
    const star = '⭐'
    return(
        <div className="card">
            <ul className="list-group">
                <li className="list-group-item">Name: {name}</li>
                <li className="list-group-item">Score: {star.repeat(score)}</li>
                <li className="list-group-item">{comment}</li>
                <li><button onClick={() => onDelete(id)}>❌</button><button onClick={() => onEdit(id)}>✏️</button></li>
            </ul>
        </div>
    )
}

export default Reviews;