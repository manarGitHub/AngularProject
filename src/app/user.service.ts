import { Injectable } from '@angular/core';
import  firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  createNewUser(email:string,password:string) {
    return new Promise (
      (resolve,reject) => {
        firebase.auth().createUserWithEmailAndPassword(email,password).then (
          () => {
            resolve(true);
            console.log("Welcome");
          },
          (error) =>{
            reject(error)
          }
        )
  
      }
    )
  }
  signInUser(email:string,password:string) {
    return new Promise(
      (resolve,reject) => {
        firebase.auth().signInWithEmailAndPassword(email,password).then(
          () => {
            resolve(true);
            console.log("Welcome");
          },
          (error) =>{
            reject(error)
          }
        )
      }
    )
  }
  signOutUser() {
    firebase.auth().signOut()
  }

resetPassword(email:string) {
  return new Promise (
    (resolve,reject) => {
  firebase.auth().sendPasswordResetEmail(email).then(
    () => { 
      resolve (true)
      console.log("we've sent you a password reset link")
    

  },
  (error) => {
    reject(error);
  }
  );

}
  );
}
}