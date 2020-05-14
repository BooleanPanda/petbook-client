import React, { useState, useCallback, useEffect } from 'react';
import { LoadingState, getUserDialogs } from '../service';
import Loading from '../utils/Loading';
import Dialog from './Dialog';

function DialogsList (props:any) {
    const user = props.user
    const [loading, setLoading] = useState(LoadingState.Loading);
    const [dialogs, setDialogs] = useState([]);
    const [currentDialog, setCurrentDialog] = useState();
    const handleCurrentDialog = props.handleDialogClick;

    const loadPage = useCallback(
        async () => {
            if(user) {
                try {
                    const {data} = await getUserDialogs(user._id);
                    setDialogs(data);
                    setLoading(LoadingState.Loaded);
                } catch (e) {
                    setLoading(LoadingState.Failed);
                };
            };
        }, [setLoading, user, setDialogs]
    );

    const deleteDialog = useCallback(
        async (dialogId) => {
            try {
                console.log(dialogId)
            } catch (e) {
                
          };
        }, []
    );

    const chooseDialog = useCallback(
        (index, id) => {
            setCurrentDialog(index);
            handleCurrentDialog(id);
        },[setCurrentDialog, handleCurrentDialog]
    );

    useEffect(()=>{
        loadPage();
      },[loadPage]);

    switch (loading) {
        case LoadingState.Loading :
          return (
            <div className="messages__aside"> 
              <Loading/>
            </div>
          );
        case LoadingState.Loaded :
          return (
            <div className="messages__aside">
                <div className="messages__aside__dialogs">
                    <div>
                        <p>{currentDialog}</p>
                    </div>
                    {dialogs.map((dialog:any,index:number)=>
                        <Dialog dialog={dialog} index={index} key={index} handleClick={chooseDialog} handleDelete={deleteDialog}/>
                    )}
                </div>
            <div className="messages__aside__settings"></div>
        </div>
          );
        default :
          return (
            <div>failed to load</div>
          );
      };
};

export default DialogsList;