import React from "react";

function AddReviewForm({ onChange, formData, onAddReview }) {
    function handleSubmit(e) {
        e.preventDefault()
        fetch("http://localhost:9292/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              score: formData.score,
              comment: formData.comment,
              game_id: formData.id,
            }),
          })
        .then(r => r.json())
        .then(newReview => onAddReview(newReview))
    }
    return (
        <ul className="list-group">
        <form onSubmit={handleSubmit}>
            <li className="list-group-item">Name: <input type='text' name="name" value={formData.name} onChange={onChange}></input></li>
            <li className="list-group-item">Score: <input type="number" min='1' max="5" name="score" value={formData.score} onChange={onChange}></input> </li>
            <li className="list-group-item">Comment: <input type="text" name="comment"  value={formData.comment} onChange={onChange}></input> </li>
            <li className="list-group-item"><button type="submit"  onSubmit={handleSubmit} className="btn btn-outline-primary">💾</button></li>
        </form>
        </ul>
    )
}

export default AddReviewForm;