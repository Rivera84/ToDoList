import {
  Component
} from '@angular/core';
import {
  AppService
} from '../../app.service'

import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

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


  constructor(public service: AppService, private router: Router) {
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
  eliminar_tarea(id) {
    var response;
    var load = {
      id: id
    }
    swal.fire({
      title: '¿Está seguro que desea eliminar esta tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#c20a0a',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar_tarea(load).subscribe(
          data => response = data,
          err => {
            console.log("Ocurrió un problema al eliminar la tarea", err);
            swal.fire('Ocurrió un problema al eliminar la tarea', '', 'error');
          },
          () => {
            swal.fire('¡Eliminado Correctamente!', '', 'success');
            this.get_task();
          }
        )

      } else if (result.isDenied) {
        this.get_task();
      }
    });

  } 
}
