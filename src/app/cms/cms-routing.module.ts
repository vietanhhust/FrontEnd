import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CMSAuthGuard } from '../shared/guards/cmsAuth.guard';
import { CMSLayoutComponent } from '../shared/components/cmsLayout/cmsLayout.component';
import { CMSAccountComponent } from './cmsaccount/cmsaccount.component';
import { CMSCategoryItemComponent } from './cms-category-item/cms-category-item.component';
import { CMSRoleComponent } from './cms-role/cms-role.component';
import { CMSGroupClientComponent } from './cms-group-client/cms-group-client.component';
import { CMSChatComponent } from './cms-chat/cms-chat.component';
import { CMSDashboardComponent } from './cms-dashboard/cms-dashboard.component';
import { CMSOrderComponent } from './cms-order/cms-order.component';

const cmsRoutes: Routes = [
  {
    path: 'cms',
    canActivate: [CMSAuthGuard],
    component: CMSLayoutComponent,
    children: [
      {
        path: 'account',
        component: CMSAccountComponent
      }, 
      {
        path: 'category', 
        component: CMSCategoryItemComponent
      }, 
      {
        path: 'role', 
        component: CMSRoleComponent
      }, 
      {
        path: 'groupclient', 
        component: CMSGroupClientComponent
      }, 
      {
        path: 'chat', 
        component: CMSChatComponent
      }, 
      {
        path: 'dashboard',
        component: CMSDashboardComponent
      }, 
      {
        path: 'order', 
        component: CMSOrderComponent
      }
    ]
  }
];


export const CMSRoutingRoutes = RouterModule.forChild(cmsRoutes)
