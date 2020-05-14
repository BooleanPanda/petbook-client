import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  entity: string
};

const NotFound = (props: Props) => {
  const history = useHistory();
  return (
    <div className="allUsers__item">
      <p className="text text-big text-scndark text-bald">{props.entity} not found</p>
      <button onClick = {()=>history.push(`/users/`)}>to all users</button>
    </div>
   );
};

export default NotFound;