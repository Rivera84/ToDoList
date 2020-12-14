import { Component, OnInit } from '@angular/core';
import {
  AppService
} from '../../app.service';
import { Router } from '@angular/router';
import { GetTaskComponent } from '../get_task/get_task.component';
import swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public list_task: any[];

  public Task = {
    titulo: "",
    descripcion: "",
    estado: "",
    idUsuario: ""
  }

  public us = JSON.parse(localStorage.getItem("usuario")); 
  
  constructor(public service: AppService, private router: Router, public getTask: GetTaskComponent) {
    this.list_task = [];
     
  }

  limpiarDatos() {
    this.Task = {
      titulo: "",
      descripcion: "",
      estado: "",
      idUsuario: ""
    }
  }


  get_task() {
    var response;

    var us= JSON.parse(localStorage.getItem("usuario"));  
    var load = {
      usuario: us.user
    }
    this.service.get_task(load).subscribe(
      data => response = data,
      err => {
        console.log("ha ocurrido un error al llamar el servicio" + err);
      },
      () => {
        this.list_task = response;
        console.log(this.list_task)
      }
    )
  }


  post_task() {

    if(this.Task.titulo =="" || this.Task.descripcion ==""){
      swal.fire('¡Recuerda agregar una tarea!', '', 'error');
   
  }else{
    var respone;

    var us= JSON.parse(localStorage.getItem("usuario"));    

    var load = {
      titulo: this.Task.titulo,
      descripcion: this.Task.descripcion,
      usuario: us.user
    }
    this.service.insert_task(load).subscribe(
      data => respone = data,
      err => {
        console.log("Ha ocurrido un error con la llamada del servicio");
      },
      () => {
        this.limpiarDatos();
        this.get_task();
        swal.fire('¡Agregado Correctamente!', '', 'success');
        this.router.navigateByUrl('/');
        this.getTask.get_task();
      }
    )
    // this.router.navigateByUrl('/');
  }
  
  }

  cerrar_sesion(){
    this.service.reset_session();
    this.router.navigateByUrl('/iniciar_sesion');
  }

}
