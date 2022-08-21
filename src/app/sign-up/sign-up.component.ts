import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  MyForm:FormGroup
  errorMessage:String


  constructor(private fb:FormBuilder,private userservice:UserService ,private router:Router) {

    let formControls={

      firstname:new FormControl('',[
       Validators.required,
       Validators.pattern("[A-Za-z]+")
     ]),
   
      lastname:new FormControl('',[
       Validators.required,
       Validators.pattern("[A-Za-z]+")
     ]),
   
      email:new FormControl('',[
       Validators.required,
       Validators.email
     ]),

     password:new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
   
      phone:new FormControl('',[
       Validators.required,
       Validators.pattern("[0-9]+"),
       Validators.minLength(8)
     ]),

     }
   
     this.MyForm=this.fb.group(formControls)
   
   }

   get firstname() {
    return this.MyForm.get('firstname');
  }
  get lastname() {
    return this.MyForm.get('lastname');
  }
  get email() {
    return this.MyForm.get('email');
  }

  get password() {
    return this.MyForm.get('password');
  }
  get phone() {
    return this.MyForm.get('phone');
  }

  ngOnInit(): void {
  }
  save() {   
    const email=this.MyForm.get('email').value;
    const password=this.MyForm.get('password').value;
     this.userservice.createNewUser(email,password).then (
       () => {
         this.router.navigate(['/sign_in']);
       },
       (error) => {
         this.errorMessage=error
         alert("connexion invalide");
       }
     )
   }

}
