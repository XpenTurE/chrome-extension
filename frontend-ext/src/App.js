
import './App.css';
import Companies from './Companies';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Scrapper from './Scrapper';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Scrapper/>} />
        <Route path='/companies' element={<Companies/>}/>
        <Route path='/*' element={<Scrapper/>}/>
      </Routes>
    </Router>
      
  );
}

export default App;
