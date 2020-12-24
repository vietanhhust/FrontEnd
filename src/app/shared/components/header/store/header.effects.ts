
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY, of, Observable } from 'rxjs';
import { map, catchError, withLatestFrom, switchMap, filter } from 'rxjs/operators';
import { MenuService } from 'src/app/core/services/system/menu.service';
import { EnumModule } from 'src/app/common/constants/global/Enums';
import * as fromMenu from './header.actions';
import { Store, select, Action } from '@ngrx/store';

@Injectable()
export class MenuEffects {

  @Effect()
  loadMenu$: Observable<Action> = this.actions$.pipe(
    ofType(fromMenu.MenuActionTypes.LoadMenuBegin),
    withLatestFrom(this.menuInfoStore.pipe(select('menuInfo'))),
    switchMap(([type, loaded]) => {
      if (loaded.items && Array.isArray(loaded.items) && loaded.items.length > 1) {
        return EMPTY;
      }
      return this._menuService.search({ moduleId: EnumModule.Menu }).pipe(
        map((menu) => {
          return new fromMenu.LoadMenuSuccess({Menu: menu});
        }),
        catchError(error =>
               of(new fromMenu.LoadMenuFailure({ error: error }))
          )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private _menuService: MenuService,
    private menuInfoStore: Store<{ menuInfo: any }>
  ) {}
}
