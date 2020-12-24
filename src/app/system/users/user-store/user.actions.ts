import { createAction, props } from '@ngrx/store';
import { PagingData } from 'src/app/core/models/base/responedata.model';
import { RoleOutput } from 'src/app/core/models/system/role.model';
import { UserInput, UserOutput } from 'src/app/core/models/system/user.model';
import { ActionPayload } from 'src/app/shared/store/appstate';
import { ActionUpdatePayload } from 'src/app/shared/store/appstate';
import { UsersComponent } from '../users/users.component';


export const getUsersAction = createAction('GET_USERS', props<ActionPayload<{ keyword: string, page: number, size: number }>>());
export const getUsersSuccessAction = createAction('GET_USERS_SUCCESS', props<ActionPayload<PagingData<UserOutput>>>());

export const clearUpdateUserResultAction = createAction('CLEAR_UPDATE_USER_RESULT', props<ActionPayload<{}>>());

export const getUserInfoAction = createAction('GET_USER_INFO', props<ActionPayload<{ userId: number }>>());
export const getUserInfoSuccessAction = createAction('GET_USER_INFO_SUCCESS', props<ActionPayload<UserModel>>());


export const getRolesAction = createAction('GET_ROLES', props<ActionPayload<{}>>());
export const getRolesSuccessAction = createAction('GET_ROLES_SUCCESS', props<ActionPayload<RoleOutput[]>>());

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const deleteUserAction = createAction('DELETE_USER', props<ActionPayload<{ userId: number }>>());
export const deleteUserSuccessAction = createAction(DELETE_USER_SUCCESS, props<ActionPayload<boolean>>());

export const PUT_USER_SUCCESS = 'PUT_USER_SUCCESS';
export const putUserAction = createAction('PUT_USER', props<ActionPayload<{ userId: number, userInfo: UserInput }>>());
export const putUserSuccessAction = createAction(PUT_USER_SUCCESS, props<ActionPayload<boolean>>());

export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const postUserAction = createAction('POST_USER', props<ActionPayload<{ userInfo: UserInput }>>());
export const postUserSuccessAction = createAction(POST_USER_SUCCESS, props<ActionPayload<{ userId: number }>>());


export interface UserModel {
    userId?: number,
    userName?: string,
    userStatusId?: number,
    roleId?: number,
    employeeCode?: string,
    fullName?: string,
    email?: string,
    phone?: string,
    address?: string,
    genderId?: number,
    avatarFileId?: number,
    password?: string
}