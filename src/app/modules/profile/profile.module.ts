import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { MaterialDesignModule } from '../material-design/material-design.module';


@NgModule({
  declarations: [
    ProfileViewComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialDesignModule
  ]
})
export class ProfileModule { }
