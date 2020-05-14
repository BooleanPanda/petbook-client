import React from 'react';
import { Link } from 'react-router-dom';

const Album = (props: any) => {
  return (
    <Link to={`/albums/${props.album._id}`} className="link">
    <div className="albums__item">
        <img src={props.album.preview} alt="" className="pic-m"/>
        <p className="link text-big text-scndark text-bald">{props.album.name}</p>
    </div>
    </Link>
   );
};

export default Album;