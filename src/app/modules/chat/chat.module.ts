import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { LifeCycleDirective } from 'src/app/directives/life-cycle.directive';


@NgModule({
  declarations: [
    ChatViewComponent,
    LifeCycleDirective    
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [LifeCycleDirective]
})
export class ChatModule { }
