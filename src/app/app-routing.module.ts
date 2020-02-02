import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'add-user', component: AddUserComponent },
  { path: '', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  //{path : '', component : AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
