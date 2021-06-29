import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileViewComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
