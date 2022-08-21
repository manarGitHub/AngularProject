import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'helloworld';
  constructor(){

    var firebaseConfig = {
      apiKey: "AIzaSyDfq9ku2WVyETz2aTcK5MgEl96P0iCvb5U",
      authDomain: "stage2-16435.firebaseapp.com",
      databaseURL: "https://stage2-16435-default-rtdb.firebaseio.com",
      projectId: "stage2-16435",
      storageBucket: "stage2-16435.appspot.com",
      messagingSenderId: "445706935235",
      appId: "1:445706935235:web:40d8fa9cd81c68a2527b76"
    };
    
    // Initialize Firebase
    firebase. initializeApp(firebaseConfig);
  }
}
