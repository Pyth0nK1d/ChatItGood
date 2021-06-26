import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnDemandPreloadStrategy } from './strategies/on-demand-preload-strategy';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/Login/Login.module').then(m => m.LoginModule),
    data: {preload: true} 
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule),
    data: {preload: false} 
  },
  {
    path: 'chat',
    loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule),
    data: {preload: false} 
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    data: {preload: false} 
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {preloadingStrategy: OnDemandPreloadStrategy}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
