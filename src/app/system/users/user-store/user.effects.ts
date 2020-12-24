import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { Observable, concat, of } from "rxjs";
import { UserService } from "src/app/core/services/system/user.service";
import { mergeMap, exhaustMap, map, catchError, concatMap, withLatestFrom, tap } from "rxjs/operators";
import { getUsersAction, getUsersSuccessAction, getUserInfoAction, getUserInfoSuccessAction, getRolesAction, getRolesSuccessAction, putUserAction, putUserSuccessAction, postUserAction, postUserSuccessAction, deleteUserAction, deleteUserSuccessAction } from './user.actions'
import { EnumModule } from "src/app/common/constants/global/Enums";
import { Store, select } from "@ngrx/store";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { RoleService } from "src/app/core/services/system/role.service";
@Injectable()
export class UserEditEffect {
    getUsers$ = createEffect(() => this.actions$.pipe(
        ofType(getUsersAction),
        exhaustMap(act => this.userService.getAll(act.context, act.payload.keyword, act.payload.page, act.payload.size)
            .pipe(
                map(r => {
                    return getUsersSuccessAction({ payload: r, context: null });
                })
            )
        )));

    getUserInfo$ = createEffect(() => this.actions$.pipe(
        ofType(getUserInfoAction),
        exhaustMap(act => this.userService.getDetail(act.context, act.payload.userId)
            .pipe(
                map(r => {
                    return getUserInfoSuccessAction({ payload: r, context: null });
                })
            )
        )));

    getRoles$ = createEffect(() => this.actions$.pipe(
        ofType(getRolesAction),
        exhaustMap(act => this.roleService.getAll(act.context, '', 1, 999999)
            .pipe(
                map(r => {
                    return getRolesSuccessAction({ payload: r.list, context: null });
                })
            )
        )));

    putUser$ = createEffect(() => this.actions$.pipe(
        ofType(putUserAction),
        exhaustMap(act => this.userService.update(act.context, act.payload.userId, act.payload.userInfo)
            .pipe(
                map(r => {
                    return putUserSuccessAction({ payload: r, context: null });
                })
            )
        )));

    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(deleteUserAction),
        exhaustMap(act => this.userService.deleteUser(act.context, act.payload.userId)
            .pipe(
                map(r => {
                    return deleteUserSuccessAction({ payload: r, context: null });
                })
            )
        )));

    postUser$ = createEffect(() => this.actions$.pipe(
        ofType(postUserAction),
        exhaustMap(act => this.userService.add(act.context, act.payload.userInfo)
            .pipe(
                map(r => {
                    return postUserSuccessAction({ payload: { userId: r }, context: null });
                })
            )
        )));

   
    constructor(public actions$: Actions, public userService: UserService, private roleService: RoleService,
        public store: Store<any>, private router: Router, private toast: ToastrService
    ) {


    }





}