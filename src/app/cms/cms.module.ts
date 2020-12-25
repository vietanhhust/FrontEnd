import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CMSAccountComponent } from './cmsaccount/cmsaccount.component';
import { CMSRoutingRoutes } from './cms-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CMSCategoryItemComponent } from './cms-category-item/cms-category-item.component';
import { CMSCategoryitemAddComponent } from './cms-category-item/cms-categoryitem-add/cms-categoryitem-add.component';
import { CMSCategoryitemEditComponent } from './cms-category-item/cms-categoryitem-edit/cms-categoryitem-edit.component';


@NgModule({
  declarations: [
    CMSAccountComponent,
    CMSCategoryItemComponent,
    CMSCategoryitemAddComponent, 
    CMSCategoryitemEditComponent
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
