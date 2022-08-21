import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  MyForm:FormGroup
  errorMessage:String


  constructor(private fb:FormBuilder, private userservice:UserService ,private router:Router) { 
    let formControls={
      email:new FormControl('',[
       Validators.required,
       Validators.email
     ]),
   
      password:new FormControl('',[
       Validators.required,
      Validators.minLength(5)
     ]),
     }
   
     this.MyForm=this.fb.group(formControls)
   
   }
  get email() {
    return this.MyForm.get('email');
  }
  get password() {
    return this.MyForm.get('password');
  }

  ngOnInit(): void {
  }
  save(){
    const email=this.MyForm.get('email').value;
    const password=this.MyForm.get('password').value;
     this.userservice.signInUser(email,password).then (
       () => {
         this.router.navigate(['/list']);
       },
       (error) => {
         this.errorMessage=error
         alert("connexion invalide");
       }
     )
   }
  }


