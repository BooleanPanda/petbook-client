import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../interfaces';

interface Props {
  user: IUser
};

const User = (props: Props) => {
  return (
    <div className="allUsers__item">
      <img src={props.user.avatar} alt="" className="pic-s"/>
      <Link to={`/users/${props.user._id}`} className="link text-big text-scndark text-bald">{props.user.name} {props.user.surname}</Link>
      <p className="text text-normal text-scndark">Also known as <span className="text-highlight">{props.user.login}</span></p>
    </div>
   );
};

export default User;