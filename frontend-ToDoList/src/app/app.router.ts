import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {GetTaskComponent} from './view/get_task/get_task.component'

const routes: Routes = [{
    path: 'user_task',
    component: GetTaskComponent
}];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})

export class AppRoutingModule{}