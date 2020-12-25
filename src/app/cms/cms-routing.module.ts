import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CMSAuthGuard } from '../shared/guards/cmsAuth.guard';
import { CMSLayoutComponent } from '../shared/components/cmsLayout/cmsLayout.component';
import { CMSAccountComponent } from './cmsaccount/cmsaccount.component';

const cmsRoutes: Routes = [
  {
    path: 'cms',
    canActivate: [CMSAuthGuard],
    component: CMSLayoutComponent,
    children: [
      {
        path: 'account',
        component: CMSAccountComponent
      }
    ]
  }
];


export const CMSRoutingRoutes = RouterModule.forChild(cmsRoutes)
