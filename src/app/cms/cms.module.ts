import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CMSAccountComponent } from './cmsaccount/cmsaccount.component';
import { CMSRoutingRoutes } from './cms-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CMSCategoryItemComponent } from './cms-category-item/cms-category-item.component';
import { CMSCategoryitemAddComponent } from './cms-category-item/cms-categoryitem-add/cms-categoryitem-add.component';
import { CMSCategoryitemEditComponent } from './cms-category-item/cms-categoryitem-edit/cms-categoryitem-edit.component';
import { CMSAccountCreateComponent } from './cmsaccount/cms-account-create/cms-account-create.component';
import { CMSBalanceComponent } from './cmsaccount/cms-balance/cms-balance.component';
import { CMSAccountPutComponent } from './cmsaccount/cms-account-put/cms-account-put.component';


@NgModule({
  declarations: [
    CMSAccountComponent,
    CMSCategoryItemComponent,
    CMSCategoryitemAddComponent, 
    CMSCategoryitemEditComponent, CMSAccountCreateComponent, CMSBalanceComponent, CMSAccountPutComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CMSRoutingRoutes,
    SharedModule
  ], 
  exports: [
    CMSAccountComponent, 
    CMSCategoryItemComponent, 
    CMSCategoryitemEditComponent
  ]
})
export class CMSModule { }
