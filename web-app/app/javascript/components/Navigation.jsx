import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/features/requester';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const { token } = useSelector((state) => state.requester.value)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/')
  }

  return <nav className="navigation">
    LOGO
    {
      token !== '' && <div className="navigation-inner-container">
        <Link to="/home">Home</Link>
        <Link to="/new-order">New Order</Link>
        <button onClick={handleSignOut}> Sign out </button>
      </div>
    }
  </nav>
}

export default Navigation;
