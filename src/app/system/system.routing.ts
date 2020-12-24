
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UsersComponent } from './users/users/users.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';
import { RoleGrantComponent } from './roles/role-grant/role-grant.component';
import { RolesComponent } from './roles/roles/roles.component';
import { UnitsComponent } from './units/units/units.component';
import { ChangePassComponent } from './users/changepass/changepass.component';
import { CanDeactivateGuard } from 'src/app/shared/guards/can-deactivate.guard';
import { ProfileComponent } from './users/profile/profile.component';
import { SubsidiaryComponent } from './Subsidiary/subsidiary.component';
import { SubsidiaryAddComponent } from './Subsidiary/subsidiary-add/subsidiary-add.component';
import { SubsidiaryEditComponent } from './Subsidiary/subsidiary-edit/subsidiary-edit.component';
const systemRoutes: Routes =
  [{
    path: 'system',
    canActivate: [AuthGuard],
    component: LayoutComponent, data: { breadcrumb: 'Hệ thống' },
    children: [
      
      {
        path: 'users/edit/:id',
        component: UserEditComponent, data: { breadcrumb: 'Cập nhật nhân viên' }
      },
      {
        path: 'users/add',
        component: UserEditComponent, data: { breadcrumb: 'Thêm mới nhân viên' }, canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'users',
        component: UsersComponent, data: { breadcrumb: 'Quản lý nhân viên' }
      },
      {
        path: 'changepass',
        component: ChangePassComponent, data: { breadcrumb: 'Đổi mật khẩu' }
      },
      {
        path: 'profile',
        component: ProfileComponent, data: { breadcrumb: 'Đổi mật khẩu' }
      },
      // role
      {
        path: 'roles',
        component: RolesComponent, data: { breadcrumb: 'Quản lý nhóm quyền' }
      },
      {
        path: 'roles/edit/:id',
        component: RoleEditComponent, data: { breadcrumb: 'Cập nhật nhóm quyền' }
      },
      {
        path: 'roles/add',
        component: RoleAddComponent, data: { breadcrumb: 'Thêm mới nhóm quyền' }
      },
      {
        path: 'roles/grant/:id',
        component: RoleGrantComponent, data: { breadcrumb: 'Phân quyền' }
      },

      // Unit
      {
        path: 'units',
        component: UnitsComponent, data: { breadcrumb: 'Đơn vị tính' }
      },
      
     
     
     
      {
        path: 'subsidiary', component: SubsidiaryComponent, data: { breadcrumb: 'Công ty con' }
      },
      {
        path: 'subsidiary/add',
        component: SubsidiaryAddComponent, data: { breadcrumb: 'Thêm mới công ty con' }, canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'subsidiary/edit/:id',
        component: SubsidiaryEditComponent, data: { breadcrumb: 'Cập nhật' }, canDeactivate: [CanDeactivateGuard]
      }
    ]
  }];
export const SystemRoutingRoutes = RouterModule.forChild(systemRoutes);

