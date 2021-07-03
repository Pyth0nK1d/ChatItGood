import { Message } from '../../models/message';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    });
  }
  
  private treatData(data: Message[]): Message[] {
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
    if(typeof scrolldiv === "undefined"){
      var scrolldiv = document.getElementById("chat");
    }
    scrolldiv.scrollTop = scrolldiv.scrollHeight;
  }
}
