import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/services/auth/auth-guard.service';
import { ExerciseListComponent } from './exercise/exercise-list/exercise-list.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'exercise',
    component: ExerciseListComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
