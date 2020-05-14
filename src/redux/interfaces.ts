import { IUser } from "../interfaces";


export interface State {
    user: IUser|null,
    loading: boolean
};

export interface Action<T> {
    type: string;
    payload: T;
};