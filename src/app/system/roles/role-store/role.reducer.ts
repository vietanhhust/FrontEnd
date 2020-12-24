import { createReducer, on, createAction, props } from '@ngrx/store';
import {loadModule, updateRole, end
} from './role.actions';
import { cloneDeep, clone } from 'lodash';
import { UserOutput } from 'src/app/core/models/system/user.model';

export function roleReducer(state, payload){
    let init = {}
    return createReducer(init, 
    on(updateRole, (a, b)=>{
        return a
    }), 
    on(loadModule, (a, b)=>{
        return a
    }), 
    on(end, (a, b)=>{
        return a
    })
    )
}