import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppConfig } from './common/config/app.config';
import { Error403Page } from './shared/pages/error403/error403.page';
import { Error404Page } from './shared/pages/error404/error404.page';
import { CMSLayoutComponent } from './shared/components/cmsLayout/cmsLayout.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'error', component: CMSLayoutComponent, children: [
      {
        path: 'access-denied',
        component: Error403Page
      },
    ]
  },
  {
    path: 'error', component: CMSLayoutComponent, children: [
      {
        path: 'access-denied/:id',
        component: Error403Page
      },
    ]
  },
  {
    path: 'error', component: CMSLayoutComponent, children: [
      {
        path: '403',
        component: Error403Page
      },
    ]
  },
  {
    path: 'error', component: CMSLayoutComponent, children: [
      {
        path: '404',
        component: Error404Page
      },
    ]
  },
  {
    path: '**', component: CMSLayoutComponent, children: [
      {
        path: '**',
        component: Error404Page
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules,
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
