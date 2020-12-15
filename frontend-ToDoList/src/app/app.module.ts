import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from '../app/app.router';
import { GetTaskComponent } from './view/get_task/get_task.component';

import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { RelojComponent } from './view/reloj/reloj.component';
import { EditTaskComponent } from './view/edit_task/edit_task.component';
import { IniciarSesionComponent } from './view/iniciar_sesion/iniciar_sesion.component';
import { RegistrarseComponent } from './view/registrarse/registrarse.component';
import { NavbarComponent } from './view/navbar/navbar.component';
import { DatosService } from './services/datos.service';
import { NavActComponent } from './view/nav-act/nav-act.component';
import { FooterComponent } from './view/footer/footer.component';
import { RecuperarClaveComponent } from './view/recuperar-clave/recuperar-clave.component';
import { CambiarClaveComponent } from './view/cambiar-clave/cambiar-clave.component';
import { ActivarCuentaComponent } from './view/activar-cuenta/activar-cuenta.component';
import { WidgetClimaComponent } from './view/widget-clima/widget-clima.component';


@NgModule({
  declarations: [
    AppComponent,
    GetTaskComponent,
    RelojComponent,
    EditTaskComponent,
    IniciarSesionComponent,
    RegistrarseComponent,
    NavbarComponent,
    NavActComponent, FooterComponent, RecuperarClaveComponent, CambiarClaveComponent, ActivarCuentaComponent, WidgetClimaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule
  ],
  providers: [AppService, DatosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
