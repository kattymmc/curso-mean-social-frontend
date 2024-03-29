import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegisterComponent},
    { path: 'mis-datos', component: UserEditComponent},
    { path: 'gente', component: UsersComponent},
    { path: 'gente/:page', component: UsersComponent},
    { path: 'timeline', component: TimelineComponent},
    { path: 'perfil/:id', component: ProfileComponent},
    { path: 'siguiendo/:id/:page', component: FollowingComponent},
    { path: 'seguidores/:id/:page', component: FollowedComponent},
    { path: '**', component: HomeComponent} // Si la ruta no existe
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);
