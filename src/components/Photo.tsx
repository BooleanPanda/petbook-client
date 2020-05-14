import React, { useCallback } from 'react';
import getDate from '../utils/getDate';
const Photo = (props: any) => {
    const deletePhoto = useCallback(
        () => {
            props.handleDelete(props.photo._id, props.photo.url)
        },
    [props]);
    return (
        <div className="allUsers__item">
            <img src={props.photo.url} alt="" className="pic-s"/>
            <p>{getDate(props.photo.createdAt)}</p>
            <button onClick={deletePhoto}>Delete photo</button>
        </div>
    );
};

export default Photo;