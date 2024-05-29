import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Routes from "./Routes.jsx";


function App() {
  axios.defaults.baseURL = 'http://localhost:4040';
  axios.defaults.withCredentials = true;

  return (

    <Routes />


  )
}

export default App
