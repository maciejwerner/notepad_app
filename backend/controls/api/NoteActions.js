// wczytujemy schemat notatki
const { request } = require('express');
const Note = require('../../DB/models/Note')

// scemat notatki jest Notes a tutaj sa akcje dla glownej strony
// akcje zapisu - przeniesiony do osobnego pliku z mongoose.js

class NoteActions {

  // zapisywanie notatki
  async saveNote(request, response) {
    const title = request.body.title;
    const body = request.body.body;
    let note;

    try {
      note = new Note({
        title: title,
        body: body
      });
      await note.save();
      response.status(201).json(note);

    } catch(error) {
      return response.status(422).json({ message : error.message });
    }
  }

  // pobieranie notatek
  async getAllNotes(request, response) {
    
    // Note.find({}) - znajdz wszystkie notatki w {} podajemy parametr do znalezienia - tutaj puste bo szukamy wszystkich
    // Note.find({}, (error, documents) => {
    //   console.log(documents);
    //   // zamiast response.send(documents);
    //   response.status(200).json(documents);
    // });

    // przepisujemy na:
    let doc; 
    try {
      doc = await Note.find({});
      response.status(200).json(doc);

    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: error.message });
    }
  }

  // pobieranie pojedynczej notatki
  async getNote(request, response) {
    // const id = request.params.id;
    // const note = await Note.findOne({_id: id})
    
    // response.status(200).json(note);
    const id = request.params.id;
    let note;
    try {
      note = await Note.findOne({_id: id})
      response.status(200).json(note);

    } catch (error) {
      return response.status(404).json({ message : error.message });
    }
  }

  // edytowanie notatki
  async updateNote(request, response) {
    
    const id = request.params.id;
    const title = request.body.title;
    const body = request.body.body;
  
    // const note = await Note.findOne({ _id: id });
    // note.title = title;
    // note.body = body;
    // await note.save();

    // response.status(201).json(note);
  
    let note;
    try {
      note = await Note.findOne({ _id: id });
      note.title = title;
      note.body = body;
      await note.save();
      response.status(201).json(note);

    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }
  
  // usuwanie notatki
  async deleteNote(request, response) {
    const id = request.params.id;
    await Note.deleteOne({ _id: id });
    
    response.send('notatka zostala usunieta ID: ' + id);
    response.sendStatus(204);
  }
}

module.exports = new NoteActions();