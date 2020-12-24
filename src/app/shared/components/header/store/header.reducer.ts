import { MenuOutputModel } from 'src/app/core/models/system/businessinfo.model';
import * as fromMenu from './header.actions';

const initInfo: MenuOutputModel[] = [{
  menuId: null,
  parentId: null,
  isDisabled: null,
  moduleId: null,
  menuName: null,
  url: null,
  icon: null,
  parent: null,
  param: null,
  isGroup: null,
  isShow: null,
  sortOrder: null,
}];

export function HeaderReducer(
  state = initInfo,
  action: fromMenu.MenuActionsUnion
) {
  switch (action.type) {
    case fromMenu.MenuActionTypes.LoadMenuBegin: {
      return {
        ...state,
        loaded: false,
        error: null
      };
    }

    case fromMenu.MenuActionTypes.LoadMenuSuccess: {
      return {
        ...state,
        loaded: true,
        items: action.payload.Menu
      };
    }

    case fromMenu.MenuActionTypes.LoadMenuFailure: {
      return {
        ...state,
        loaded: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}
