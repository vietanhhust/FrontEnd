import {  userReducer } from 'src/app/system/users/user-store/user.reducer';
import { HeaderReducer } from '../components/header/store/header.reducer';
import { IXModuleContext } from 'src/app/core/models/base/IXModuleContext';
import { Update } from '@ngrx/entity';
import { roleReducer } from 'src/app/system/roles/role-store/role.reducer';

export const stateRegister  = {
    
};

export interface ActionPayload<T> {
  context: IXModuleContext;
  payload: T;
}

export interface ActionUpdatePayload<T> {
  context: IXModuleContext;
  payload: Update<T>;
}
