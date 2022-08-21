import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  MyForm:FormGroup

  

  constructor(private fb:FormBuilder) { 

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
  get phone() {
    return this.MyForm.get('phone');
  }
  ngOnInit(): void {
  }
  save(){
    console.log(this.MyForm.value);
  }

}
