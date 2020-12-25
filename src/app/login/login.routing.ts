import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './loginpage/login.page.component';
import { CMSLoginPageComponent } from './cmsLoginPage/cmslogin.page.component';

const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent
    }
    ,{
        path: 'logins', 
        component: CMSLoginPageComponent
    }
];
export const LoginRoutingRoutes = RouterModule.forChild(loginRoutes);

