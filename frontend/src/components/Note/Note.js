import React, { useState } from 'react';

function Note(props) {

  const [showDescription, setShowDescription] = useState(false);

  const toggleDesc = () => {
    // zmieniamy na odwrotnosc aktualnej
    setShowDescription(!showDescription);
  }

  const editHandler = () => {
    props.onEdit({ 
      title : props.title,
      body : props.body, 
      _id : props.id 
    });
  }

  return ( 
    <div className='note'>
    
      {/* mozemy tez  <p onClick={ toggleDesc }> {props.title} </p>  - bo funkcja nie przyjmuje zadnych argumentow*/}
      <p onClick={() => toggleDesc()}> {props.title} </p>
      {/* jesli opis jest - pokaz po kliknieciu */}
      {showDescription ? 
        ( <div className="description"> {props.body} </div> )
        : null
      }

      <button 
        onClick={() => editHandler()}> 
          edytuj
       </button>

      <button 
        className='delete' 
        onClick={() => { props.onDelete(props.id) }} >
           delete
      </button>

    </div>
  );
}

export default Note;