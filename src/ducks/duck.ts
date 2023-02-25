import { Session } from '../types/models/Session';
import { Users } from '../types/models/Users';
import { UserDetails } from '../types/models/UserDetails';

export enum Types {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',

    GET_USERS_REQUEST = 'GET_USERS_REQUEST',
    GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
    GET_USERS_FAILURE = 'GET_USERS_FAILURE',

    GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST',
    GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS',
    GET_USER_DETAILS_FAILURE = 'GET_USER_DETAILS_FAILURE',

    RESET_USERDETAILS = 'RESET_USERDETAILS',
}

export interface State {
    error?: string;
    isLoading: boolean;
    session?: Session;
    allUser?: Users;
    userDetails?: UserDetails;
}

const initialState: State = {
    isLoading: false,
    error: undefined,
    session: undefined,
    allUser: undefined,
    userDetails: undefined,
};

export const actions = {
    //login
    login: (
        email: string,
        password: string,
    ) => ({
        type: Types.LOGIN_REQUEST,
        email,
        password,
    }),
    loginSuccess: (
        session: any,
    ) => ({
        type: Types.LOGIN_SUCCESS,
        session,
    }),
    loginFailure: (e: any) => ({
        type: Types.LOGIN_FAILURE,
        error: e,
    }),

    //getUser
    getUsers: (
        limit: number,
    ) => ({
        type: Types.GET_USERS_REQUEST,
        limit,
    }),
    getUsersSuccess: (
        allUser: any,
    ) => ({
        type: Types.GET_USERS_SUCCESS,
        allUser,
    }),
    getUsersFailure: (e: any) => ({
        type: Types.GET_USERS_FAILURE,
        error: e,
    })
    ,
    //getuserDetails
    getUserDetails: (
        userId: string,
    ) => ({
        type: Types.GET_USER_DETAILS_REQUEST,
        userId,
    }),
    getUserDetailSuccess: (
        userDetails: any,
    ) => ({
        type: Types.GET_USER_DETAILS_SUCCESS,
        userDetails,
    }),
    getUserDetailFailure: (e: any) => ({
        type: Types.GET_USER_DETAILS_FAILURE,
        error: e,
    }),

    //reset userDetails data 
    resetUserDetails: () => ({
        type: Types.RESET_USERDETAILS,
    }),
};

export default (state: State = initialState, action: any): State => {
    switch (action.type) {
        case Types.LOGIN_REQUEST:
            return { ...state, ...initialState, isLoading: true };
        case Types.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                session: action.session,
            };
        case Types.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                session: undefined,
            };
        case Types.GET_USERS_REQUEST:
            return { ...state, isLoading: true };
        case Types.GET_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                allUser: action.allUser,
            };
        case Types.GET_USERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                allUser: undefined,
            };
        case Types.GET_USER_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
                userDetails: undefined,
            };
        case Types.GET_USER_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userDetails: action.userDetails,
            };
        case Types.GET_USER_DETAILS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                userDetails: undefined,
            };
        case Types.RESET_USERDETAILS:
            return {
                ...state,
                userDetails: undefined,
            };

        default:
            return state;
    }
};
