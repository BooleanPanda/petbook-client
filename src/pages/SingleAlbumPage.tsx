import React, { useState, useEffect, useCallback } from 'react';
import { LoadingState, getAlbumPhotos, addPhotosToAlbum, deleteSinglePhoto, deleteSingleAlbum } from '../service';
import getDate from '../utils/getDate';
import Photo from '../components/Photo';
import FileForm from '../components/FileForm';
import Loading from '../utils/Loading';
import { useHistory, Link } from 'react-router-dom';

const SingleAlbumPage: React.FC = (props:any) => {
    const history = useHistory();
    const [photos, setPhotos] = useState();
    const [album, setAlbum] = useState();
    const [loading, setLoading] = useState<LoadingState>(LoadingState.Loading);
    const albumId = props.match.params.id;
    const userId = localStorage.getItem('PBUserId');

    const loadPage = useCallback(
      async () => {
        try {
          const res = await getAlbumPhotos(albumId);
          setAlbum(res.data[0]);
          setPhotos(res.data[0].photos);
          setLoading(LoadingState.Loaded);
        } catch (e) {
          setLoading(LoadingState.Failed);
        };
      }, [setPhotos, setLoading, albumId]
    );

    const addPhoto = useCallback(
        async (files:any) => {
          try {
            setLoading(LoadingState.Loading);
            await addPhotosToAlbum(albumId, files);
            loadPage();
          } catch (e) {
            setLoading(LoadingState.Failed);
          };
        },[setLoading, loadPage, albumId]
    );

    const deletePhoto = useCallback(
      async (photoId:string, photoUrl:string) => {
        try {
          setLoading(LoadingState.Loading);
          await deleteSinglePhoto(photoId, photoUrl);
        }
        catch (e) {
          setLoading(LoadingState.Failed);
        }
        finally {
          loadPage();
        };
      },[setLoading, loadPage]
    );

    const deleteAlbum = useCallback(
      async () => {
        try {
          setLoading(LoadingState.Loading);
          await deleteSingleAlbum(albumId, album.owner);
          history.push(`/users/${userId}/albums`);
        }
        catch (e) {
          setLoading(LoadingState.Failed);
        }
      },[setLoading, album, albumId, history, userId]
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
          <div className="section album">
            <div className="album_info">
                <h2>Album: {album.name}</h2>
                <p>Description: {album.description}</p>
                <p>Created: {getDate(album.createdAt)}</p>
                <button onClick={deleteAlbum}>Delete album</button>
                <Link to={`/users/${userId}/albums`} className="link text-big text-scndark text-bald">Back to albums</Link>
            </div>
            <div className="album_edit">
                <FileForm label="Upload" title="Add a photo to the album:" single={false} handleSubmit={addPhoto}/>
            </div>
            <div className="album_photos">
              {photos.map((photo:any, index:number)=><Photo photo={photo} key={index} handleDelete={deletePhoto}/> )}
            </div>
          </div>
        );
      default :
        return (
          <div>failed to load</div>
        );
    };
};

export default SingleAlbumPage;