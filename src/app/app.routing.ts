import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegisterComponent}
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);