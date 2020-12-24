import { ActionUpdatePayload, ActionPayload } from 'src/app/shared/store/appstate';
import { createAction, props } from '@ngrx/store';
import { RolePermission, Module, RoleInput, ModuleRolePermission } from 'src/app/core/models/system/role.model';
import { RolesComponent } from '../roles/roles.component';
import { RoleAddComponent } from '../role-add/role-add.component';



export const updateRole = createAction('[Role] updateRole',
    props<ActionPayload<{modules: ModuleRolePermission[]; roleId: number}>>()
)


export const loadModule = createAction('[Role] loadModule',
    props<ActionPayload<{modules: Module[]; roleId: number}>>()
)

export const end = createAction('end', 
    props<any>()
);

export const updateRoleGroup = createAction('[Role] updateRoleGroup', 
    props<ActionPayload<{
        roleId: number;
        data: RoleInput
    }>>()
)

export const deleteRoleGroup = createAction('[Role] deleteRoleGroup', 
    props<ActionPayload<{
        roleId: number, 
        component: RolesComponent
    }>>()
)

export const addRoleGroup = createAction('[Role] addRoleGroup', 
    props<ActionPayload<{
        data: RoleInput, 
        component: RoleAddComponent
    }>>()
)
