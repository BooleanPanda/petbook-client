import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FaUsers, FaUserEdit, FaDog, FaImages } from 'react-icons/fa';
import { LoadingState, getSingleUser, deleteSingleUser } from '../service';
import Loading from '../utils/Loading';
import NotFound from '../utils/NotFound';
import { IUser } from '../interfaces';
import { useDispatch } from 'react-redux';
import { userLogOut } from '../redux/actions/userActions';

const UserPage: React.FC = (props:any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<LoadingState>(LoadingState.Loading);

  const loadPage = useCallback(
    async () => {
      try {
        const res = await getSingleUser(id);
        const {data} = res;
        if (data[0]) {
          setUser(data[0]);
          setLoading(LoadingState.Loaded);
        } else {
          setLoading(LoadingState.NotFound);
        };
      } catch (e) {
        setLoading(LoadingState.Failed);
      };
    },[setUser, setLoading, id]
  );

  useEffect(()=>{
    loadPage();
  },[loadPage]);

    switch (loading) {
        case LoadingState.Loading :
          return (
            <Loading/>
          );
        case LoadingState.NotFound :
          return (
            <NotFound entity="user"/>
          );
        case LoadingState.Loaded :
          return (
            <div className="section">
              <img src={user!.avatar} alt="" className="pic-l"/>
              <h1>{user!.name} {user!.surname}</h1>
              <p>Info</p>
              <p>login: {user!.login}</p>
              <p>email: {user!.email}</p>
              <p>phone: {user!.phone}</p>
              <p>number of pets: {user!.pets.length}</p>
              <Link to={`/users/${id}/pets`} className="link text-big text-white">To this user's pets <FaDog className="link_icon"/></Link>
              <Link to={`/users/${id}/albums`} className="link text-big text-white">To this user's albums <FaImages className="link_icon"/></Link>
              <Link to={`/users`} className="link text-big text-white"> To all users <FaUsers className="link_icon"/></Link>
              <Link to={`/users/${id}/edit`} className="link text-big text-white"> Edit this user <FaUserEdit className="link_icon"/></Link>
              <button onClick = {async ()=>{await deleteSingleUser(id); await dispatch(userLogOut()); history.push(`/`);}}>delete this user</button>
            </div>
          );
        default :
          return (
            <div>failed to load</div>
          );
    };
};

export default UserPage;