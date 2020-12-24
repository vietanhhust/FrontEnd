import { createReducer, on, createAction, props } from '@ngrx/store';
import {
    getUsersSuccessAction, getUserInfoSuccessAction, getRolesSuccessAction, clearUpdateUserResultAction, putUserSuccessAction, postUserSuccessAction, deleteUserSuccessAction
} from './user.actions';
import { cloneDeep, clone } from 'lodash';
import { UserOutput } from 'src/app/core/models/system/user.model';

export function userReducer(state, action) {
    let initialState = {}
    return createReducer(initialState,
        on(getUsersSuccessAction, (state, action) => {

            return {
                ...state,
                userPagedData: { ...action.payload }
            }
        }),

        on(getUserInfoSuccessAction, (state, action) => {

            return {
                ...state,
                userInfo: { ...action.payload }
            }
        }),

        on(getRolesSuccessAction, (state, action) => {

            return {
                ...state,
                roles: action.payload
            }
        }),

        on(clearUpdateUserResultAction, (state, action) => {

            return {
                ...state,
                result: false,
                actionType: ''
            }
        }),
        on(putUserSuccessAction, (state, action) => {

            return {
                ...state,
                result: action.payload,
                actionType: action.type
            }
        }),

        on(postUserSuccessAction, (state, action) => {

            return {
                ...state,
                result: action.payload,
                actionType: action.type
            }
        }),

        on(deleteUserSuccessAction, (state, action) => {

            return {
                ...state,
                result: action.payload,
                actionType: action.type
            }
        }),
    )(state, action)
}