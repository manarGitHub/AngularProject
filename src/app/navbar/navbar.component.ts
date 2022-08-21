import { Component, OnInit } from '@angular/core';
import  firebase from 'firebase';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuth:boolean
  imageUrl:"assets/image/w.png"

  constructor(private userservice:UserService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth=true;
        } else {
          this.isAuth=false;
        }
      }
    );
  }
  onSignOut() {
    this.userservice.signOutUser();
  }

}
