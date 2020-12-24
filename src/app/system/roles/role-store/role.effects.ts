import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { Observable, concat, of } from "rxjs";
import { mergeMap, exhaustMap, map, catchError, concatMap, withLatestFrom, tap } from "rxjs/operators";
import { loadModule, updateRole, updateRoleGroup, deleteRoleGroup, addRoleGroup } from './role.actions'
import { EnumModule, EnumAction } from "src/app/common/constants/global/Enums";
import { Store, select, createAction } from "@ngrx/store";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { RoleService } from "src/app/core/services/system/role.service";
@Injectable()
export class RolesEffect {
    updateRole$;

    updateRoleGroup$;
    deleteRoleGroup$;
    addRoleGroup$;
    constructor(public actions$: Actions, private roleservice: RoleService,
        public store: Store<any>, private router: Router, private toast: ToastrService
    ) {
        this.updateRole$ = createEffect(() => this.actions$.pipe(
            ofType(updateRole),
            exhaustMap(act => {
                let lstNewPermission = [];
                act.payload.modules.forEach(item => {
                    if (item.isView && !item.isGroup) {

                        let permission = EnumAction.View;

                        if (item.isAdd) { permission |= EnumAction.Add; }
                        if (item.isUpdate) { permission |= EnumAction.Update; }
                        if (item.isDelete) { permission |= EnumAction.Delete; }
                        if (item.isCensor) { permission |= EnumAction.Censor; }
                        if (item.isCheck) { permission |= EnumAction.Check; }

                        let actionIds = [];
                        if (item.actionObjects) {
                            actionIds = item.actionObjects.filter(a => a.isAllow).map(a => a.id)
                        }

                        lstNewPermission.push(
                            {
                                moduleId: item.moduleId,
                                permission: permission,
                                objectTypeId: item.objectTypeId,
                                objectId: item.objectId,
                                actionIds: actionIds
                            }
                        );
                    }
                });
                return this.roleservice.setRolePermission(act.context, act.payload.roleId, lstNewPermission).pipe(
                    map(data => {
                        this.toast.success('Cập nhật phân quyền thành công');
                        return {
                            type: 'end',
                            test: 'null'
                        }
                    }
                    ))
            }
            )))


        // update nhóm quyền.
        this.updateRoleGroup$ = createEffect(() => this.actions$.pipe(
            ofType(updateRoleGroup),
            exhaustMap(act => {
                return this.roleservice.update(act.context, act.payload.roleId, act.payload.data).pipe(
                    map(data => {
                        this.toast.success("Cập nhật nhóm quyền thành công");
                        return {
                            type: 'end',
                            test: 'null'
                        }
                    })
                )
            })
        )
        )

        // add nhóm quyền
        this.addRoleGroup$ = createEffect(() => this.actions$.pipe(
            ofType(addRoleGroup),
            exhaustMap(act => {
                return this.roleservice.add(act.context, act.payload.data).pipe(
                    map(data => {
                        this.toast.success('Thêm mới nhóm quyền thành công');
                        act.payload.component.close.next(data)
                        return {
                            type: 'end',
                            test: 'null'
                        }
                    })
                )
            })
        ))

        // delet nhóm quyền.
        this.deleteRoleGroup$ = createEffect(() => this.actions$.pipe(
            ofType(deleteRoleGroup),
            exhaustMap(act => {
                return this.roleservice.delete(act.context, act.payload.roleId).pipe(
                    map(data => {
                        this.toast.success('Xóa nhóm quyền thành công');
                        act.payload.component.search(1);
                        return {
                            type: 'end',
                            test: ''
                        }
                    })
                )
            })
        ))

    }





}