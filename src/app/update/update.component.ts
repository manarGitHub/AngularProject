import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id: any
  errorMessage: string = '';
  formGroup: FormGroup;
  errorMessage1: string = '';
  firstname: string;
  type: string;
  date: string;
  description: string;
  url: string;
  userdetails: any = []
  userforupdate: AngularFireList<any>
  data = {
    firstname: '',
    type: '',
    date: '',
    description: '',
    url: '',

  }
  id1: any;
  addUserForm: FormGroup;
  constructor(private router: Router, private firebase: AngularFireDatabase,
    private route: ActivatedRoute, private usersService: UsersService) {
    this.route.params.subscribe(params => {
      this.id = params
    });

    this.userforupdate = this.firebase.list('people');
    this.id1 = this.route.snapshot.paramMap.get('id');
    console.log(this.id1)
  }

  ngOnInit(): void {
    this.addUserForm = new FormGroup(
      {
        Firstname: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        Type: new FormControl('', [
          Validators.required,
          Validators.pattern("[A-Za-z]+"),
          Validators.minLength(3)
        ]),
        Date: new FormControl('', [
          Validators.required,
        ]),
        Description: new FormControl('', [
          Validators.required,
          Validators.minLength(10)
        ]),
        Url: new FormControl('', [
          Validators.required,
        ]),
      }
    );

    this.usersService.getUserById(this.id1).subscribe((results) => {
    this.getuser(results)
    })
  }

  getuser(entries: any) {
    this.userdetails = [];
    entries.forEach((element: { payload: { toJSON: () => any; }; key: any; }) => {
      let y = element.payload.toJSON()
      y["$key"] = element.key
      this.userdetails.push(y as User);
      this.data.firstname = this.userdetails[0]['firstname']
      this.data.type = this.userdetails[0]['type']
      this.data.date = this.userdetails[0]['date']
      this.data.description = this.userdetails[0]['description']
      this.data.url = this.userdetails[0]['url']
    })
  }

  onSubmit1() {
    let create = 'false';
    this.userforupdate.update(this.id1, {
      firstname: this.data.firstname,
      type: this.data.type,
      date: this.data.date,
      description: this.data.description,
      url: this.data.url,
    }).then(added => {
      this.router.navigate(['/list'])
    }).catch(error => {
      console.error(error)
      this.errorMessage1 = error.messaage
    })

  }
}
