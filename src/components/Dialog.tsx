import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Props {
  dialog: {
      _id: string,
      members: any
  },
  index: number,
  handleDelete: any,
  handleClick: any
};

const Dialog = (props: Props) => {
    const member = props.dialog.members[0];
    const deleteDialog = () => {
        props.handleDelete(props.dialog._id);
    };
    const handleClick = () => {
        props.handleClick(props.index, props.dialog._id);
    };
    return (
        <div className="messages__aside__dialogs_item">
            <Link to={`/users/${member._id}`}><img src={member.avatar} alt="" className="pic-xs"/></Link>
            <div onClick={handleClick} className="messages__aside__dialogs_item_info">
                <p className="text text-normal text-scndark">{member.name}</p>
                <p className="text text-normal text-scndark">{member.surname}</p>
            </div>
            <button className="messages__aside__dialogs_item_button" onClick={deleteDialog}><FaTrashAlt/></button>
        </div>
    );
};

export default Dialog;