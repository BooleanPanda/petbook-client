import { IUser } from "../../interfaces";
import { getSingleUser } from '../../service'
import { Action } from '../interfaces';

export const UserActions = {
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    FAILED: 'LOADING_FAILED',
    RESET: 'RESET'
};


export const resetUser = () => ({
    type: UserActions.RESET
});

export const loading = () => ({
    type: UserActions.LOADING
});

export const loadingFailed = () => ({
    type: UserActions.FAILED
});

export const userLoaded = (user:IUser): Action<IUser> => ({
    type: UserActions.LOADED,
    payload: user
});

export const userLogOut = () => {
    localStorage.removeItem('PBToken');
    localStorage.removeItem('PBUserId');
    return(resetUser());
};

export const userChanged = () => {
    return async function (dispatch:any) {
        dispatch(loading());
        try {
            const userId = localStorage.getItem('PBUserId');
            if (userId) {
                const res = await getSingleUser(userId);
                dispatch(userLoaded(res.data[0]));
            };
        } catch (e) {
            dispatch(loadingFailed());
        };
    };
};