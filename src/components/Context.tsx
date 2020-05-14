import React, {useState, createContext, useEffect} from 'react';
import { getSingleUser } from '../service';

export const Context = createContext<any>(``);
export const ContextProvider = (props:any) => {
    const [currentUser, setCurrentUser] = useState(null);
    const updateCurrentUser = async () => {
        const userId = localStorage.getItem('PBUserId');
        if (userId) {
            try {
                const res = await getSingleUser(userId);
                setCurrentUser ({...res.data[0]});
                return 'noice';
            } catch (e) {
                if (e) {
                    console.log(e);
                };
            };
        };
    };

    const resetCurrentUser = () => {
        localStorage.removeItem('PBToken');
        localStorage.removeItem('PBUserId');
        setCurrentUser(null);
    };

    useEffect(() => {
        updateCurrentUser();
    },[]);

    return (
        <Context.Provider
            value={{
                currentUser,
                updateCurrentUser,
                resetCurrentUser
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
