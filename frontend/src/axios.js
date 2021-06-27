import axios from 'axios';

// API_URL z .env frontendu - w tym przypadku takie same
// na froncie nie musimy dogrywac biblioteki dotenv

const instance = axios.create({
  baseURL : process.env.API_URL || 'http://localhost:5000/api'
});

export default instance;