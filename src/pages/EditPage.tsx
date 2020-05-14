import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LoadingState, getSingleUser, editUser, setUserAvatar } from '../service';
import Loading from '../utils/Loading';
import NotFound from '../utils/NotFound';
import { IUser } from '../interfaces';
import Form from '../components/Form';
import FileForm from '../components/FileForm';
import { useDispatch } from 'react-redux';
import { userChanged } from '../redux/actions/userActions';

const EditPage: React.FC = (props:any) => {
  const id = props.match.params.id;
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<LoadingState>(LoadingState.Loading);
  const dispatch = useDispatch();

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
 
  const edit = useCallback(
    async (info:any) => {
      try {
          setLoading(LoadingState.Loading);
          const res = await editUser(id, info);
          await dispatch(userChanged());
          const {data} = res;
          if (data) {
            setUser(data);
            setLoading(LoadingState.Loaded);
          } else {
            setLoading(LoadingState.NotFound);
          };
      } catch (e) {
          setLoading(LoadingState.Failed);
      };
    },[setLoading, setUser, id, dispatch]
  );
    
  const setAvatar = useCallback(
    async (file:any) => {
      try {
        setLoading(LoadingState.Loading);
        await setUserAvatar(id, file);
        await dispatch(userChanged());
        loadPage();
      } catch (e) {
        setLoading(LoadingState.Failed);
      };
    },[setLoading, loadPage, id, dispatch]
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
            <img src={user!.avatar} alt="" className="pic-m"/>
            <p>name: {user!.name}</p>
            <p>surname: {user!.surname}</p>
            <p>login: {user!.login}</p>
            <p>email: {user!.email}</p>
            <p>phone: {user!.phone}</p>
            <br/>
            <FileForm label="Upload" title="Set new profile picture:" single={true} handleSubmit={setAvatar}/>
            <br/>
            <p>Enter new info: </p>
            <Form label="Edit" fields={['name', 'surname', 'login', 'phone', 'email']} handleSubmit={edit} required={false}/>
            <br/>
            <Link to={`/users/${id}`} className="link text-big text-white">To this user</Link>
        </div>
      );
    default :
      return (
        <div>failed to load</div>
      );
  };
};

export default EditPage;