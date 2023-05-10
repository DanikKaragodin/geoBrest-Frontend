import axios from 'axios';
import * as ReactDOMClient from 'react-dom/client';
axios.defaults.baseURL = 'https://geo-brest.herokuapp.com/';
import App from  './Components/App.jsx';
const app =ReactDOMClient.createRoot(document.getElementById('root'));
app.render(<App/>);
