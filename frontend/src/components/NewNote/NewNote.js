import React, { useState } from 'react';

function NewNote(props) {

  // pokazujemy formularz do dodania notki
  const [showForm, setShowForm] = useState(false)

  // stany dal tytulu i opisu - domyslnie puste
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const changeTitleHandler = (event) => {
    const value = event.target.value;
    setTitle(value);
  }

  const changeDescHandler = (event) => {
    const value = event.target.value;
    setDesc(value);
  }

  const addNote = () => {
    const note = {
      title : title,
      body : desc
    }
    // onAdd z Notes.js
    props.onAdd(note);

    // czyscimy pola po dodaniu notki
    setTitle('');
    setDesc('');
    setShowForm(false);
  }

  return (
    showForm ? (
      <div className="note">
        <label> title: </label>
        <input type="text" 
          value={ title }
          onChange={changeTitleHandler} />

        <label> Description: </label>
        <input type="text" 
          value={ desc }
          onChange={changeDescHandler}
          />

        <button onClick={() => addNote()} > Add note </button>
      </div>
      ) : (
      <button onClick={() => setShowForm(true)}> New note</button>  
    )
  );
}

export default NewNote;