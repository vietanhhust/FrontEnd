
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemRoutingRoutes } from './system.routing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersComponent } from './users/users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RolesComponent } from './roles/roles/roles.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { RoleGrantComponent } from './roles/role-grant/role-grant.component';
import { UnitsComponent } from './units/units/units.component';
import { UnitEditComponent } from './units/unit-edit/unit-edit.component';
import { SharedModule } from '../shared/shared.module';
import { ChangePassComponent } from './users/changepass/changepass.component';
import { ProfileComponent } from './users/profile/profile.component';



import {SubsidiaryComponent} from './Subsidiary/subsidiary.component';
import { SubsidiaryAddComponent } from './Subsidiary/subsidiary-add/subsidiary-add.component';
import { SubsidiaryEditComponent } from './Subsidiary/subsidiary-edit/subsidiary-edit.component';
import { SubsidiaryViewComponent } from './Subsidiary/subsidiary-view/subsidiary-view.component';
import { UserGeneralInfoComponent } from './users/user-edit/user-general-Info/user-general-info.component';
import { UserActiveInfoComponent } from './users/user-edit/user-active-info/user-active-info.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    SystemRoutingRoutes,
    SharedModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  declarations: [
    UsersComponent,
    UserEditComponent,
    RolesComponent,
    RoleAddComponent,
    RoleEditComponent,
    RoleGrantComponent,
    UnitsComponent,
    UnitEditComponent,
    ChangePassComponent,
    ProfileComponent,
    SubsidiaryComponent,
    SubsidiaryAddComponent,
    SubsidiaryEditComponent,
    SubsidiaryViewComponent,
    UserGeneralInfoComponent,
    UserActiveInfoComponent,
  ]

})
export class SystemModule { }
