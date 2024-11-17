import React, { useContext } from 'react';
import { Auth } from '../context/Auth';
import { Link } from 'react-router-dom';
import "../scss/Navbar.scss";

const Navbar = () => {
    const {authState, setAuthstate} = useContext(Auth);

    const logout = () => {
      localStorage.clear();
      setAuthstate({username: "", id: 0, status: false});
    }
  return (
    <div className='links'>
         <nav>
          {!authState.status ? (
            <>
            <Link to='/signin'>Sign In</Link>
            <Link to='/signup'>Sign Up</Link>
            </>
          ) : (
            <>
            <Link to='/'>Home</Link>
            <Link to='/createpost'>Create Post</Link>
            </>
          )}

            <div className='profile'>
              <h2>{authState.username}</h2>
              {authState.status && <button onClick={logout}>logout</button>}
            </div>
        </nav>
    </div>
  )
}

export default Navbar;