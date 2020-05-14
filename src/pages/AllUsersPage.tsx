import React, { useState, useEffect, useCallback } from 'react';
import { IUser } from '../interfaces';
import { LoadingState, getAllUsers } from '../service';
import User from '../components/User';
import Loading from '../utils/Loading';

const AllUsersPage: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<LoadingState>(LoadingState.Loading);

    const loadPage = useCallback(
      async () => {
        try {
          const res = await getAllUsers();
          setUsers(res.data); 
          setLoading(LoadingState.Loaded);
        } catch (e) {
          setLoading(LoadingState.Failed);
        };
      }, [setUsers, setLoading]
    );

    useEffect(()=>{
      loadPage();
    },[loadPage]);

    switch (loading) {
      case LoadingState.Loading :
        return (
          <div className="section section-center"> 
            <Loading/>
          </div>
        );
      case LoadingState.Loaded :
        return (
          <div className="section allUsers">
            {users.map((user:IUser, index:number)=><User user={user} key={index}/> )}
          </div>
        );
      default :
        return (
          <div>failed to load</div>
        );
    };
};

export default AllUsersPage;