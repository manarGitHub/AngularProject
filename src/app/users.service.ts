import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Evenement } from './evenement.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userList: AngularFireList<any>


  constructor(private db:AngularFireDatabase) { 
    this.userList = db.list('people')

  }

  createUser(user: Evenement) {
    
    this.userList.push({
   
    firstname: user.firstname ,
    type: user.type,
    date: user.date,
    description:user.description,
    url:user.url

   
    
}).catch(error=>{
console.error(error)

})

}
getUsers() : Observable<any>{
return this.db.list('people').snapshotChanges();
}

getUserById(id:string) : Observable<any>{
  return this.db.list('people', ref => ref.orderByKey().equalTo(id)).snapshotChanges();
}
}
