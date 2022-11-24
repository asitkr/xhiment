import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreatePost from './components/CreatePost';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Welcome from './Welcome';

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <div>
      <BrowserRouter>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        {
          !isAuth ? <Welcome /> : (
            <Routes>
              <Route path='/' element={<Home isAuth={isAuth} />} />
              <Route path='/createpost' element={<CreatePost isAuth={isAuth} />} />
            </Routes>
          )
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
