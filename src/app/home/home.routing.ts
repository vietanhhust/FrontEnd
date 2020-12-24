
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { HomePageComponent } from './homepage/home.page.component';

const homeRoutes: Routes = [{
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
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


