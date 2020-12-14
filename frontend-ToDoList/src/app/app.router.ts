import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { GetTaskComponent } from './view/get_task/get_task.component';
import { EditTaskComponent } from './view/edit_task/edit_task.component';
import { IniciarSesionComponent } from './view/iniciar_sesion/iniciar_sesion.component';
import { RegistrarseComponent } from './view/registrarse/registrarse.component';
import {RecuperarClaveComponent} from '../app/view/recuperar-clave/recuperar-clave.component'
import {CambiarClaveComponent} from './view/cambiar-clave/cambiar-clave.component'
import { AuthGuard } from './guards/auth.guard';
import { AppService } from './app.service';
import { DatosService } from './services/datos.service';
import { NavbarComponent } from './view/navbar/navbar.component';


const routes: Routes = [
    {
        path: '',
        component: GetTaskComponent,
        canActivate: [AuthGuard],                
    },
    {
        path: 'edit_task/:id',
        component: EditTaskComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'iniciar_sesion',
        component: IniciarSesionComponent
    },
    {
        path: 'registrarse',
        component: RegistrarseComponent
    }  ,
    {
        path: 'recuperar_clave',
        component: RecuperarClaveComponent
    },
    {
        path: 'cambiar_contrasena/:token',
        component: CambiarClaveComponent
    }  
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})

export class AppRoutingModule { }