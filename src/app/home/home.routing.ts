
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { HomePageComponent } from './homepage/home.page.component';
import { CMSAuthGuard } from '../shared/guards/cmsAuth.guard';
import { CMSLayoutComponent } from '../shared/components/cmsLayout/cmsLayout.component';

const homeRoutes: Routes = [{
    path: '',
    canActivate: [CMSAuthGuard],
    component: CMSLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
  })
export class HomeRoutingModule {}


