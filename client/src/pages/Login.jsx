import React, { useContext, useState } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../scss/Login.scss'
import { Auth } from '../context/Auth';
import {motion} from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setAuthstate} = useContext(Auth);

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:8080/auth/login', {
      username, password
    }).then((res) => {
      if(res.data.error) {
        alert(res.data.error)
      }else {
        localStorage.setItem("accessToken", res.data.token);
        setAuthstate({username: res.data.username, id: res.data.id, status: true});
        navigate('/');
      }
    });
  }
  return (
    <motion.div
    initial={{x:-200}}
    animate={{x: 0}}
    transition={{duration: .5}}
     className='loginPage'>
      <form>
        <h2>Sign In to your Account</h2>
        <div className="item">
          <label htmlFor="username">Username: </label>
          <input type="text" onChange={e => setUsername(e.target.value)}/>
        </div>

        <div className="item">
          <label htmlFor="password">Password: </label>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </div>
        <button onClick={login}>sign in</button>
      </form>
    </motion.div>
  )
}

export default Login