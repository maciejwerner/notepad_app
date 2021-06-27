const express = require('express');
const dotenv = require('dotenv');
const PORT_CONFIG = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

// mongo DB
require('./DB/mongoose');

dotenv.config();
const app = express();

// parser
// pola typu content-type: application/json
// app.use(bodyParser.json());
// zamiast body parsera
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

// routes
const apiRouter = require('./routes/api');
// zamiast '/' robimy '/api/' - wtedy dla kazdej ścieżki w apiRouter zostanie dodany /api/ przed notes
app.use('/api/', apiRouter);

// server
app.listen(PORT_CONFIG.PORT, () => {
  console.log(`server is running on PORT: http://localhost:${PORT_CONFIG.PORT}`);
});