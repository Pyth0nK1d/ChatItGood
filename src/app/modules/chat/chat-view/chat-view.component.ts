import { AfterContentInit, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { environment } from '../../../../environments/environment';
import { Message } from 'src/app/models/message';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit, AfterContentInit, OnChanges, DoCheck, OnDestroy {
  /*
  public userData = {
    photoURL: environment.baseWebUrl+"/assets/img/default-image.png"
  };

  */
  public messageList: Message[] = [];

  public userData = null;
  
  public subscriptions = new Subscription();

  chatForm = new FormGroup({
    message: new FormControl('', []),
  });
  
  constructor(private firestore: FirestoreService, public authService: AuthService, public afAuth: AngularFireAuth) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.autoscroll();
  }

  ngOnInit() {
    //this.userData = JSON.parse(localStorage.getItem('user'));
    var currentUser;
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
          currentUser = user;
          localStorage.setItem('user',JSON.stringify(currentUser));
          if(localStorage.getItem('user') !== null){
            this.userData = JSON.parse(localStorage.getItem('user'));
          }
          this.autoscroll();
      }else{
        currentUser = {
          photoURL: "/assets/img/default-image.png"
        };
        this.userData = currentUser;
        this.autoscroll();
      }

      this.subscriptions.add(this.firestore.getMessages()
      .subscribe((messages: Message[]) => {
        if(this.messageList.length < messages.length && this.messageList.length > 0 && messages.length > 0){
          this.playNotification();
        }
        this.messageList = messages;       
        this.autoscroll();
      }));

      this.autoscroll();
    });

    this.autoscroll();
  }

  ngAfterContentInit(){
    this.autoscroll();
  }

  ngDoCheck(){
    this.autoscroll();
  }

  sendMessage(){
    this.firestore.createMessage(this.userData, this.chatForm.value.message);
    this.chatForm.reset();
    this.autoscroll();
  }

  private playNotification(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/notification.wav";
    audio.load();
    audio.play();
  }

  autoscroll(){
    // Scroll down chat
    if(typeof objDiv === "undefined"){
      var objDiv = document.getElementById("chat");
    }
    objDiv.scrollTop = objDiv.scrollHeight;
  }

/*
  autoscroll() {
    if(typeof messages === "undefined"){
      var messages = document.getElementById("chat");
    }
    let newMessage = <HTMLElement>messages.lastElementChild;
    if(newMessage !== null){
      console.log(newMessage);
      let newMessageStyles = getComputedStyle(newMessage);
      let newMessageMargin = parseInt(newMessageStyles.marginBottom);
      let newMessageHeight = newMessage.offsetHeight + newMessageMargin;

      let visibleHeight = messages.offsetHeight;

      let containerHeight = messages.scrollHeight;

      let scrollOffset = messages.scrollTop + visibleHeight;

      if(containerHeight - newMessageHeight <= scrollOffset) {
        messages.scrollTop = messages.scrollHeight;
      }
    }
    
  }

  */
  logout(){
    this.authService.SignOut();
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}
