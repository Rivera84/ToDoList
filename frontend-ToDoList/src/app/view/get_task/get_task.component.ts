import {
  Component
} from '@angular/core';
import {
  AppService
} from '../../app.service'

@Component({
  selector: 'get_task',
  templateUrl: './get_task.component.html'
})

export class GetTaskComponent {
  public list_task: any[];

  public Task = {
    titulo: "",
    descripcion: "",
    estado: "",
    idUsuario: ""
  }


  constructor(public service: AppService) {
    this.list_task = []
  }


  ngOnInit(): void {
    this.get_task();
  }


  get_task() {
    var response;
    this.service.get_task().subscribe(
      data => response = data,
      err => {
        console.log("ha ocurrido un error al llamar el servicio" + err);
      },
      () => {
        this.list_task = response;        
      }
    )
  }
  cambiar_estado_task(tarea) {
    var response;
    var load = {
      id: tarea._id,
      estado: tarea.estado
    }

    this.service.cambiar_estado_task(load).subscribe(
      data => response = data,
      err => {
        console.log("ha ocurrido un error al cambiar el estado de la tarea " + err);
      },
      () => {
        this.get_task();
      }
    )
  }
  pasarDatosTarea(tarea) {
    var response;
    var load = {
      id: tarea._id,      
    }
    
    this.service.encontrar_tarea(load).subscribe(
      data => response = data,
      err => {
        console.log("ha ocurrido un error al cambiar el estado de la tarea " + err);
      },
      () => {
        this.Task = response;              
      }
    )
  }
  eliminar_tarea(id){    
      var response;
      var load = {
        id: id
      }
      this.service.eliminar_tarea(load).subscribe(
          data => response = data,
          err => {
              console.log("Ocurrió un problema al eliminar el vehículo", err);
          },
          () => {
              this.get_task();
          }
      )        
  }

 
  
}
