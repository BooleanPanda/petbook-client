import React from 'react';
import { IPet } from '../interfaces';

interface Props {
  pet: IPet,
  handleDelete: any
};

const Pet = (props: Props) => {
  const deletePet = () => {
    props.handleDelete(props.pet._id);
  }
  return (
    <div className="allUsers__item">
      <p className="text text-big text-scndark text-bald">{props.pet.name} ({props.pet.species})</p>
      <button onClick={deletePet}>delete pet</button>
    </div>
   );
};

export default Pet;