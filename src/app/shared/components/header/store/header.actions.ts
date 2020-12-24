import { Action } from '@ngrx/store';

// Defind type action.
export enum MenuActionTypes {
  LoadMenuBegin = '[Menu] Info',
  LoadMenuSuccess = '[Menu] Load Menu success',
  LoadMenuFailure = '[Menu] Load Menu failure'
}

export class LoadMenuBegin implements Action {
  readonly type = MenuActionTypes.LoadMenuBegin;
}

export class LoadMenuSuccess implements Action {
  readonly type = MenuActionTypes.LoadMenuSuccess;

  constructor(public payload: { Menu: any }) {}
}

export class LoadMenuFailure implements Action {
  readonly type = MenuActionTypes.LoadMenuFailure;

  constructor(public payload: { error: any }) {}
}

export type MenuActionsUnion = LoadMenuBegin | LoadMenuSuccess | LoadMenuFailure;
