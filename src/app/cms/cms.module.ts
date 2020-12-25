import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CMSAccountComponent } from './cmsaccount/cmsaccount.component';
import { CMSRoutingRoutes } from './cms-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CMSAccountComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CMSRoutingRoutes,
    SharedModule
  ], 
  exports: [
    CMSAccountComponent
  ]
})
export class CMSModule { }
