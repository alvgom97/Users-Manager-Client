import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { UsersEditComponent } from './containers/users-edit/users-edit.component';
import { UsersDetailsComponent } from './containers/users-details/users-details.component';
import { UsersCreateComponent } from './containers/users-create/users-create.component';
import { Error404Component } from './containers/error404/error404.component';


const routes: Routes = [
  { path: '', redirectTo: "users", pathMatch: "full" },
  { path: 'users', component: UsersListComponent },
  { path: 'users/new', component: UsersCreateComponent },
  { path: 'users/:id', component: UsersDetailsComponent },
  { path: 'users/:id/edit', component: UsersEditComponent },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
