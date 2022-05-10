import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import PostCreate from './components/PostCreate';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path= '/home' element={<Home/>}/>
        <Route path= '/home/:id' element={<Detail/>}/>
        <Route path= '/recipe' element={<PostCreate/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
