import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { MaterialDesignModule } from '../material-design/material-design.module';


@NgModule({
  declarations: [
    ChatViewComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialDesignModule
  ]
})
export class ChatModule { }
