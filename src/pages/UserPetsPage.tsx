import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LoadingState, getSingleUser, addUserPet, deleteSinglePet } from '../service';
import Loading from '../utils/Loading';
import NotFound from '../utils/NotFound';
import Form from '../components/Form';
import Pet from '../components/Pet';
import { IUser,IPet } from '../interfaces';

const UserPetsPage: React.FC = (props:any) => {
    const id = props.match.params.id;
    const [userInfo, setUserInfo] = useState<IUser>();
    const [loading, setLoading] = useState<LoadingState>(LoadingState.Loading);

    const loadPage = useCallback(
      async () => {
        try {
          const res = await getSingleUser(id);
          const {data} = res;
          if(data[0]) {
            setUserInfo(data[0]);
            setLoading(LoadingState.Loaded);
          } else {
            setLoading(LoadingState.NotFound);
          };
        } catch (e) {
          setLoading(LoadingState.Failed);
        };
      },[setUserInfo, setLoading, id]
    );

    const addPet = useCallback(
      async (data:any) => {
        try {
          setLoading(LoadingState.Loading);
          await addUserPet(id, data);
        }
        catch (e) {
          setLoading(LoadingState.Failed);
        }
        finally {
          loadPage();
        };
      },[setLoading, loadPage, id]
    );

    const deletePet = useCallback(
      async (petId:string) => {
        try {
          setLoading(LoadingState.Loading);
          await deleteSinglePet(petId);
        }
        catch (e) {
          setLoading(LoadingState.Failed);
        }
        finally {
          loadPage();
        };
      },[setLoading, loadPage]
    );
    
    useEffect(() => {
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
                <p>{userInfo!.name} {userInfo!.surname}</p>
                <p>{userInfo!.pets.length? `has ${userInfo!.pets.length} pets:` : `does not have any pets yet`}</p>
                {userInfo!.pets.map((pet:IPet, index:number)=><Pet pet={pet} key={index} handleDelete={deletePet}/>)}
                <Form label="Add a pet" fields={['name', 'species']} handleSubmit={addPet} required={true}/>
                <Link to={`/users/${id}`} className="link text-big text-white">To this user</Link>
                <Link to={`/users/`} className="link text-big text-white">To all users</Link>
            </div>
          );
        default :
          return (
            <div>failed to load</div>
          );
    };
};

export default UserPetsPage;