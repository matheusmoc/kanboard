import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board/board.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {path: '', component:BoardComponent,  canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
