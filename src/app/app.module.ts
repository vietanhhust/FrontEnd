import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GuardModule } from './shared/modules/guard.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtInterceptor } from './shared/guards/JwtInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { APP_CONFIG, AppConfig } from './common/config/app.config';
import { HomeModule } from './home/home.module';
import { SystemModule } from './system/system.module';
import { LoginModule } from './login/login.module';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { RemoveHostDirective } from './shared/directives/remove-host.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PopupComponent } from './shared/components/popup/popup.component';
import { SharedModule } from './shared/shared.module';

// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
// UrlService
import {UrlServices} from 'src/app/login/UrlServices';


// StateModule
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule} from '@ngrx/store';
import { stateRegister } from './shared/store/appstate';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './shared/store/effects';

// Ck-Editor
@NgModule({
  declarations: [
    AppComponent,
    RemoveHostDirective,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LayoutComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GuardModule,
    HttpClientModule,
    SharedModule,
    HomeModule,
    SystemModule,
    LoginModule,
    NgxPaginationModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    StoreModule.forRoot(stateRegister),
    EffectsModule.forRoot(effects),
  ],

  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    UrlServices
  ],
  bootstrap: [AppComponent], 
  exports:[
    SharedModule
  ]
})
export class AppModule { }
