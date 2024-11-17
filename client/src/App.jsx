import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import {Auth} from './context/Auth';
import Axios from 'axios';
import {motion} from 'framer-motion';

import "./App.scss";

const App = () => {
  const [authState, setAuthstate] = useState({
    username: "",
    id: 0,
    status: false
  });

  useEffect(() => {
    Axios.get('http://localhost:8080/auth', {headers: {accessToken: localStorage.getItem('accessToken')}}).then((res) => {
      if(res.data.error) {
        setAuthstate({...authState, status:false});
      }else {
        setAuthstate({
          username: res.data.username,
          if: res.data.id,
          status: true
        });
      }
    })
  },[]);
  
  return (
    <motion.div
    initial={{opacity:0, scale:1}}
    animate={{opacity:1, scale:1}}
    transition={{duration: 3}}
     className='App'>
      <Auth.Provider value={{authState, setAuthstate}}>
      <Router>
       <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/createpost' element={<CreatePost />}/>
          <Route path='/post/:id' element={<Post />}/>
          <Route path='/signin' element={<Login />}/>
          <Route path='/signup' element={<Register />}/>
          <Route path='*' element={<Home />}/>
        </Routes>
      </Router>
      </Auth.Provider>
    </motion.div>
  )
}

export default App;