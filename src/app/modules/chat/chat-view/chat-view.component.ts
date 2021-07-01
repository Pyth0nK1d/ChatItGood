import { Component, OnChanges, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { environment } from '../../../../environments/environment';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {
  /*
  public userData = {
    photoURL: environment.baseWebUrl+"/assets/img/default-image.png"
  };

  */
  public messageList: Message[] = [
    /*
    {
      alias: "Samu96",
      email: "samu96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Hola, chicos!"
    },
    {
      alias: "David96",
      email: "dprieto96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Que pacha! Como andamios?"
    },
    {
      alias: "Tabi93",
      email: "dprieto93@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Pues bien, aquí estamos!"
    },
    */
    {
      alias: "Samu96",
      email: "samu96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Hola, chicos!"
    },
    {
      alias: "David96",
      email: "dprieto96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Que pacha! Como andamios?"
    },
    {
      alias: "Tabi93",
      email: "dprieto93@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Pues bien, aquí estamos!"
    },
    {
      alias: "Samu96",
      email: "samu96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Hola, chicos!"
    },
    {
      alias: "David96",
      email: "dprieto96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Que pacha! Como andamios?"
    },
    {
      alias: "Tabi93",
      email: "dprieto93@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Pues bien, aquí estamos!"
    },
    {
      alias: "Samu96",
      email: "samu96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Hola, chicos!"
    },
    {
      alias: "David96",
      email: "dprieto96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Que pacha! Como andamios?"
    },
    {
      alias: "Tabi93",
      email: "dprieto93@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Pues bien, aquí estamos!"
    },
    {
      alias: "Samu96",
      email: "samu96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Hola, chicos!"
    },
    {
      alias: "David96",
      email: "dprieto96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Que pacha! Como andamios?"
    },
    {
      alias: "Tabi93",
      email: "dprieto93@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Pues bien, aquí estamos!"
    },
    {
      alias: "Samu96",
      email: "samu96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Hola, chicos!"
    },
    {
      alias: "David96",
      email: "dprieto96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Que pacha! Como andamios?"
    },
    {
      alias: "Tabi93",
      email: "dprieto93@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Pues bien, aquí estamos!"
    },
    {
      alias: "Samu96",
      email: "samu96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Hola, chicos!"
    },
    {
      alias: "David96",
      email: "dprieto96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Que pacha! Como andamios?"
    },
    {
      alias: "Tabi93",
      email: "dprieto93@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Pues bien, aquí estamos!"
    },

    {
      alias: "Samu96",
      email: "samu96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Hola, chicos!"
    },
    {
      alias: "David96",
      email: "dprieto96@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Que pacha! Como andamios?"
    },
    {
      alias: "Tabi93",
      email: "dprieto93@hotmail.com",
      photoURL: "https://i.redd.it/jeuusd992wd41.jpg",
      text: "Pues bien, aquí estamos!"
    },
  ];

  public userData = null;

  chatForm = new FormGroup({
    message: new FormControl('', []),
  });
  
  constructor(public authService: AuthService, public afAuth: AngularFireAuth) { }

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
      }else{
        currentUser = {
          photoURL: environment.baseWebUrl+"/assets/img/default-image.png"
        };
        this.userData = currentUser;
      }

      // Scroll down chat
      var objDiv = document.getElementById("chat");
      objDiv.scrollTop = objDiv.scrollHeight;
    });
    
  }

  sendMessage(){
    console.log(this.chatForm.value.message);
    this.chatForm.reset();
  }

  logout(){
    this.authService.SignOut();
  }

}
