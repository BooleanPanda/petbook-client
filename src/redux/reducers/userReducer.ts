import { State } from "../interfaces";

const initialState: State = {
    user: null,
    loading: false
};

const userReducer = (state: State = initialState, action:any) => {
    switch (action.type) {
        case 'RESET' : 
            return initialState;
        case 'LOADING' :
            return {
                ...state,
                loading: true
            }
        case 'LOADED' :
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case 'LOADING_FAILED' :
            return {
                initialState
            }
        default : 
            return state;
    };
};

export default userReducer;