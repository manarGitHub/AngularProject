import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { AuthGuardService } from './auth-guard.service';
import { ListComponent } from './list/list.component';
import { LocalComponent } from './local/local.component';
import { LoginComponent } from './login/login.component';

import { Page404Component } from './page404/page404.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes =[
  {path:'',component:LoginComponent},
  {path:'local',component:LocalComponent},
  {path:'register',component:RegisterComponent},
  {path:'sign_in',component:SignInComponent},
  {path:'sign_up',component:SignUpComponent},
  {path:'resetpassword',component:ResetPasswordComponent},
  {path:'add',component:AddComponent},
  {path:'update/:id',component:UpdateComponent},
  {path:'list', canActivate:[AuthGuardService], component:ListComponent},
  {path:'**',component:Page404Component}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
