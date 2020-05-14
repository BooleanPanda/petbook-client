import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderProfile from './HeaderProfile';
import { useDispatch } from 'react-redux';
import { userChanged } from '../redux/actions/userActions';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
      (async () => {
        await dispatch(userChanged());
      })();
    },[dispatch]);
    return (
        <div className="header">
            <Link to={`/users`} className="link header__title text text-big text-white text-bald"><h1>PetBook</h1></Link>
            <HeaderProfile/>
        </div>
    );
};

export default Header;