
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing';
import { HomePageComponent } from './homepage/home.page.component';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],

  declarations: [HomePageComponent]
})
export class HomeModule { }
