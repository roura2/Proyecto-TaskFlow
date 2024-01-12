import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';

import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksModule ),
    ...canActivate(() => redirectUnauthorizedTo(['/auth/login']))
  },
  // {
  //   path: '404',
  //   component: ErrorPageComponent
  // },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
