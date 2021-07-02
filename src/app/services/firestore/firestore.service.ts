import { Message } from '../../models/message';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, timestamp } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  public getMessages(): Observable<any> {
    return this.firestore
      .collection('messages')
      .valueChanges()
      .pipe(map(this.treatData));
  }

  public createMessage(userData, text) {
    this.firestore.collection('messages').add(
      {
        alias: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
        text: text,
        createdAt: new Date()
      }
    ).then(onfulfilled => {
      this.autoscroll();
      //console.log(res);
      
    });
  }
  
/*
  public updateImagen(url: string): void {
    this.firestore.doc(`imagen/${this.ID_IMAGEN}`).update({ url: url });
  }
*/
  private treatData(data: Message[]): Message[] {
    //console.log("Getting new data");
    return data.map((message: Message) => (
      {
        alias: message.alias,
        email: message.email,
        photoURL: message.photoURL,
        text: message.text,
        createdAt: message.createdAt
      }
    )).sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
  }

  private autoscroll(){
    // Scroll down chat
    if(typeof objDiv === "undefined"){
      var objDiv = document.getElementById("chat");
    }
    objDiv.scrollTop = objDiv.scrollHeight;
  }
}
