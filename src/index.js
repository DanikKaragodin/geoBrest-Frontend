import axios from 'axios';
import * as ReactDOMClient from 'react-dom/client';
axios.defaults.baseURL = 'http://localhost:5000';
import App from  './Components/App.jsx';
const app =ReactDOMClient.createRoot(document.getElementById('root'));
app.render(<App/>);