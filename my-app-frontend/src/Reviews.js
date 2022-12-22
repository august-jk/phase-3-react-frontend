import React, {useState} from "react";
import Form from "./Form";

function Reviews({ id, name, score, comment, onDelete, onEdit, onPatch, formData, onChange }) {
    const [edit, setEdit] = useState(false);
    
    const star = '⭐'
    const emojiScore = star.repeat(score)
    function handleClick(id) {
        setEdit(!edit)
        onEdit(id)
        onPatch(id)
    } 
    
    return(
        <div className="card">
            {edit ? <Form formData={formData} onChange={onChange} handleClick={handleClick} id={id} name={name}/> :
                <ul className="list-group">
                    <li className="list-group-item">Name: {name}</li>
                    <li className="list-group-item">Score: {emojiScore}</li> 
                    <li className="list-group-item">{comment}</li>
                    <li>
                        <button onClick={() => onDelete(id)}>❌</button>
                        <button onClick={() => handleClick(id)}>✏️</button>
                    </li>
                </ul>}
        </div>
    )
}

export default Reviews;