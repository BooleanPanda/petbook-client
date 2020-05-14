import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import DialogsList from '../components/DialogsList';
import ChatWindow from '../components/ChatWindow';

const MessagesPage: React.FC = () => {
    const {user} = useSelector((state:any) => state.currentUser);
    const [currentDialog, setCurrentDialog] = useState();

    const handleDialogClick = useCallback(
      (dialogId:string) => {
        setCurrentDialog(dialogId);
      }, [setCurrentDialog]
    );

    return (
      <div className="section messages">
        <div className="messages_wrapper">
            <DialogsList handleDialogClick={handleDialogClick} user={user}/>
            <ChatWindow dialogId={currentDialog} userId={user? user._id : ''}/>
        </div>
      </div>
    );
};

export default MessagesPage;