import React, { useState, /*useCallback, */useEffect } from 'react';
import { chatServerUrl ,LoadingState, getDialogWMessages } from '../service';
import ChatInput from './ChatInput';
import io from 'socket.io-client';
import Loading from '../utils/Loading';
import Message from './Message';

interface Props {
    userId: string,
    dialogId: string
};
let socket:any;

const Dialog = (props: Props) => {
    const currentDialog = props.dialogId;
    const currentUser = props.userId;
    const [loading, setLoading] = useState(LoadingState.Loaded);
    const [messages, setMessages] = useState([]);

    // useEffect(()=>{
    //     (async () => {
    //         if(currentDialog){
    //             try {
    //                 console.log(123)
    //                 setLoading(LoadingState.Loading);
    //                 const {data} = await getDialogWMessages(currentDialog);
    //                 setMessages(data[0].messages);
    //                 socket = io(chatServerUrl);
    //                 socket.emit('join', {id: currentUser, dialog: currentDialog});
    //                 setLoading(LoadingState.Loaded);
    //             } catch (e) {
    //                 console.log(e)
    //                 setLoading(LoadingState.Failed);
    //             };
    //         };
    //     })();
    //     return () => {
    //         if (socket) {
    //             console.log(999999)
    //             socket.emit('disconnect', {dialog: currentDialog})
    //             socket.off();
    //         };
    //     };
    // },[currentDialog, currentUser]);
    useEffect(()=>{
        const lol = async () => {
            if(currentDialog){
                try {
                    console.log(123)
                    setLoading(LoadingState.Loading);
                    const {data} = await getDialogWMessages(currentDialog);
                    setMessages(data[0].messages);
                    socket = io(chatServerUrl);
                    socket.emit('join', {id: currentUser, dialog: currentDialog});
                    setLoading(LoadingState.Loaded);
                } catch (e) {
                    console.log(e)
                    setLoading(LoadingState.Failed);
                };
            };
        };
        lol();
        return () => {
            if (socket) {
                /*socket.emit('disconnect', {dialog: currentDialog})
                socket.off();*/
            };
        };
    },[currentDialog, currentUser]);


    const sendMessage = (data:any) => {
        socket.emit('sendMessage', {text: data, dialog: currentDialog, sender: currentUser}, ()=>{console.log('sent')})
    }
    switch (loading) {
        case LoadingState.Loading :
            return (
                <div className="messages__chat"> 
                    <Loading/>
                </div>
            );
        case LoadingState.Loaded :
            if(currentDialog) {
                return (
                    <div className="messages__chat"> 
                        <div className="messages__chat_output">
                            {
                                messages.map((message:any, index:number)=><Message message={message}/>)
                            }
                        </div>
                        <div className="messages__chat_input">
                            <ChatInput handleSubmit={sendMessage}/>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="messages__chat"> 
                        <div className="messages__chat_placeholder"></div>
                    </div>
                );
            }
        default :
            return (
                <div className="messages__chat"> 
                    <p>failed to load</p>
                </div>
            );
      };
};

export default Dialog;