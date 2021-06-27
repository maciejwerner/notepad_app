import React from 'react';
import './Notes.css';
import Note from '../Note/Note';
import NewNote from '../NewNote/NewNote';
import EditNote from '../EditNote/EditNote';
import Modal from 'react-modal';
// sciezka do url backendu
import axios from '../../axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


class Notes extends React.Component {
  constructor(props) {
    super(props);

    // usuwanie notatki
    this.state = {
      notes : [],
      showEditModal: false,
      // nowe pola - do przechowywania title, body, id do edycji w modalu
      editNote : {}
    };
  }

  // do uruchomienia pobierania przez react
  componentDidMount() {
    this.fetchNotes();
  }

  // pobieranie notatek
  async fetchNotes() {
    const res = await axios.get('/notes');
    const notes = res.data;

    // nadpisujemy notki
    this.setState({ notes : notes });
  }

  async deleteNote(id) {
    const notes = [...this.state.notes].filter(note => note._id !== id);

    await axios.delete('/notes/' + id);
    this.setState({ notes : notes });
  }

  async addNote(note) {
    const notes = [...this.state.notes];

    try {
      // dostajemy sie do backendu - note - obiekt notatki
      const res = await axios.post('/notes', note)
      const newNote = res.data;
  
      // dodajemy na froncie
      notes.push(newNote);
      this.setState({ notes: notes });

    } catch (error) {
      NotificationManager.error(error.response.data.message)
    }
  }

  async editNote(note) {
    // backend
    await axios.put('/notes/' + note._id, note )

    // frontend
    const notes = [...this.state.notes];
    const index = notes.findIndex(el => el._id === note._id);
    if (index >= 0) {
      notes[index] = note;
      this.setState({ notes: notes });
    }
    this.toggleModal();
  }

  toggleModal() {
    this.setState({ showEditModal : !this.state.showEditModal });
  }

  editNoteHandler(note) {
    this.toggleModal();
    // przekazujemy notke do edycji
    this.setState({ editNote: note });
  }

  render() {

    return (
      <div>

        <NotificationContainer />

        <p> Moje notatki: </p>

        <NewNote 
          onAdd={(note) => this.addNote(note)}
        />

        <Modal
          isOpen={this.state.showEditModal}
          contentLabel="Edit note" >

            {/* formularz edycji */}
            {/* przekazujemy title, body, id */}
            <EditNote
              title={this.state.editNote.title}
              body={this.state.editNote.body}
              id={this.state.editNote._id}
              onEdit={note => this.editNote(note)} />
            <button 
              onClick={() => this.toggleModal()}> Cancel / Close </button>
        </Modal>

        {this.state.notes.map( note => {
          return (
            <Note 
              key={note._id}
              title={ note.title } 
              body={ note.body }
              id={ note._id }
              onEdit={(note) => this.editNoteHandler(note)}
              onDelete={ (id) => this.deleteNote(id) }
            />
          )
        })}

      </div>
    );
  }
}

export default Notes;