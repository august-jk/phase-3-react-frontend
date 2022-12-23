import React, {useState} from "react";
import Form from "./Form";

function Reviews({ id, name, score, comment, onDelete, onUpdateReviews }) {
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        id: id,
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
            onChange={handleChange} 
            handleSubmit={handleSubmit} 
            name={name}
            id={id}
            /> :
                <ul className="list-group">
                    <li className="list-group-item">Name: {name}</li>
                    <li className="list-group-item">Score: {emojiScore}</li> 
                    <li className="list-group-item">{comment}</li>
                    <li>
                        <button onClick={() => onDelete(id)} type="button">❌</button>
                        <button onClick={handleClick} type="button">✏️</button>
                    </li>
                </ul>}
        </div>
    )
}

export default Reviews;