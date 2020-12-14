import {
  Component
} from '@angular/core';
import {
  AppService
} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  public list_task: any[];

  public Task = {
    titulo: "",
    descripcion: "",
    estado: "",
    idUsuario: ""
  }

  constructor(public service: AppService) {
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
    var respone;
    this.service.insert_task(this.Task).subscribe(
      data => respone = data,
      err => {
        console.log("Ha ocurrido un error con la llamada del servicio");
      },
      () => {
        this.limpiarDatos();
        this.get_task();
      }
    )
  }

}
