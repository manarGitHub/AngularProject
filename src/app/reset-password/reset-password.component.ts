import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
 

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email:string
  errorMessage:string

  constructor( private userservice:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  resetPassword(email:string){
    
    this.userservice.resetPassword(email).then(
      () => {
        this.router.navigate(['/sign_in']);
      },
      (error: string) => {
        this.errorMessage=error
       
      }
    )
    
    }

}
