const express = require('express');
const router = express.Router();

// zmieniony z test actions na noteActions controls/api/notes.js
const noteActions = require('../controls/api/NoteActions');

// endpointy: 
// pobieranie notatek
// zmieniony na noteActions.saveNote z testactions.homepage 
// endpoint - '/notes'
router.get('/notes', noteActions.getAllNotes);

// pobieranie konkretnej notatki
router.get('/notes/:id', noteActions.getNote);

// zapisywanie notatek
router.post('/notes', noteActions.saveNote);

// edytowanie notatek
router.put('/notes/:id', noteActions.updateNote);

// usuwanie notatek
router.delete('/notes/:id', noteActions.deleteNote);

module.exports = router;