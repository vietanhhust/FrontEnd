import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './loginpage/login.page.component';

const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent
    }
];
export const LoginRoutingRoutes = RouterModule.forChild(loginRoutes);

