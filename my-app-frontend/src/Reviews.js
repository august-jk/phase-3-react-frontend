import React, {useState} from "react";
import Form from "./Form";

function Reviews({ id, name, score, comment, onDelete, onUpdateReviews, onChange, formData }) {
    const [edit, setEdit] = useState(false);
    
    const star = '⭐'
    const emojiScore = star.repeat(score)
    function handleClick() {
        setEdit(!edit)
    } 
    function handleSubmit(event) {
        event.preventDefault()
        setEdit(!edit)
        fetch(`http://localhost:9292/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: formData.comment,
        score: formData.score,
      }),
    })
      .then((r) => r.json())
      .then((updatedReviewObj) => onUpdateReviews(updatedReviewObj));
    }
    
    return(
        <div className="card">
            {edit ? 
            <Form 
            formData={formData} 
            onChange={onChange} 
            handleSubmit={handleSubmit} 
            name={name}
            id={id}
            /> :
                <ul className="list-group">
                    <li className="list-group-item">Name: {name}</li>
                    <li className="list-group-item">Score: {emojiScore}</li> 
                    <li className="list-group-item">{comment}</li>
                    <li>
                        <button onClick={() => onDelete(id)} type="button" className="btn btn-outline-primary">❌</button>
                        <button onClick={handleClick} type="button" className="btn btn-outline-primary">✏️</button>
                    </li>
                </ul>}
        </div>
    )
}

export default Reviews;