import React, { useState, useCallback, useEffect } from 'react';
import Loading from '../utils/Loading';
import NotFound from '../utils/NotFound';
import Album from '../components/Album';
import Form from '../components/Form';
import { LoadingState, getUserAlbums, addUserAlbum } from '../service';

const UserAlbumsPage: React.FC = (props:any) => {
  const userId = props.match.params.id;
  const [loading, setLoading] = useState(LoadingState.Loading);
  const [albums, setAlbums] = useState();

  const loadPage = useCallback(
    async () => {
      try {
        const res = await getUserAlbums(userId);
        const {data} = res;
        if(data[0]) {
          setAlbums(data);
          setLoading(LoadingState.Loaded);
        } else {
          setLoading(LoadingState.NotFound);
        };
      } catch (e) {
        setLoading(LoadingState.Failed);
      };
    },[setAlbums, setLoading, userId]
  );

  const addAlbum = useCallback(
    async (data:any) => {
      try {
        setLoading(LoadingState.Loading);
        await addUserAlbum(userId, data);
      }
      catch (e) {
        setLoading(LoadingState.Failed);
      }
      finally {
        loadPage();
      };
    },[setLoading, loadPage, userId]
  );

  useEffect(() => {
    loadPage();
  },[loadPage]);

  switch (loading) {
      case LoadingState.Loading :
        return (
          <div className="section">
            <Loading/>
          </div>
        );
      case LoadingState.NotFound :
        return (
          <div className="section">
            <Form label="Add album" fields={['name', 'description']} handleSubmit={addAlbum} required={true}/>
            <NotFound entity="Albums"/>
          </div>
        );
      case LoadingState.Loaded :
        return (
          <div className="section">
            <Form label="Add album" fields={['name', 'description']} handleSubmit={addAlbum} required={true}/>
            {albums.map((album: any, index:number)=><Album album={album} key={index}/> )}
          </div>
        );
      default :
        return (
          <div>failed to load</div>
        );
  };
};

export default UserAlbumsPage;