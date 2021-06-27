import React, {useState} from 'react';

function EditNote(props) {

   // stany dal tytulu i opisu - domyslnie puste - kopiujemy z newNote.js
   const [title, setTitle] = useState(props.title);
   const [desc, setDesc] = useState(props.body);

   const changeTitleHandler = (event) => {
    const value = event.target.value;
    setTitle(value);
  }

  const changeDescHandler = (event) => {
    const value = event.target.value;
    setDesc(value);
  }
  const editNote = () => {
    // 
    const note = {
      title : title,
      body : desc,
      _id : props.id
    };
    props.onEdit(note);
  }

  return (
    <div className="note">
      <label> title: </label>
      <input type="text" 
        value={ title }
        onChange={changeTitleHandler} />

      <label> Description: </label>
      <input type="text" 
        value={ desc }
        onChange={changeDescHandler} />

      <button onClick={() => editNote()} > Zapisz notatke </button>
    </div>
  );
}

export default EditNote;