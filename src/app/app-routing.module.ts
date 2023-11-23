import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksModule )
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersModule )
  },
  // {
  //   path: '**',
  //   redirectTo: 'tasks'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
