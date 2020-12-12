import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {AppRoutingModule} from '../app/app.router';
import {GetTaskComponent} from './view/get_task/get_task.component';

import { AppService } from './app.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RelojComponent } from './view/reloj/reloj.component';
import { EditTaskComponent } from './view/edit_task/edit_task.component';


@NgModule({
  declarations: [
    AppComponent,
    GetTaskComponent,
    RelojComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
