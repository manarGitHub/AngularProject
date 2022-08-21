import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  userList: AngularFireList<any>;
  addUserForm: FormGroup;
  firstname:string;
  type:string;
  date:string;
  description:string;
  url:string;
  errorMessage:string;
  errorMessage1:string;


  constructor(private usersservice:UsersService, public router:Router , private db : AngularFireDatabase, private fire:AngularFireAuth) {
    this.userList = db.list('people')
   }

  ngOnInit(): void {
    this.addUserForm= new FormGroup(
      {
        
        Firstname: new FormControl ('',[
          Validators.required,
          Validators.minLength(3)
        ]),
        Type: new FormControl ('',[
          Validators.required,
          Validators.pattern("[A-Za-z]+"),
          Validators.minLength(3)
        ]),
        Date: new FormControl ('',[
          Validators.required,
         
        ]),
        Description: new FormControl ('',[
          Validators.required,
          Validators.minLength(10)
        ]),
        Url: new FormControl ('',[
          Validators.required,
        ]),
       
      
      }
    )
  }
  onSubmit(){
    let create ='false'
    this.userList.push({
     firstname: this.firstname,
     type:this.type,
     date:this.date,
     description:this.description,
     url:this.url
     
    }).then(added=>{
      this.router.navigate(['/list'])


    }).catch(error=>{
      console.error(error)
      this.errorMessage1=error.message 
      console.log('error',error)
      console.log(error.message)
    })

  }

}
