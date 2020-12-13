import {
  Component
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AppService
} from '../../app.service'

import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})

export class UpdateTaskComponent {

  public Task = {
      titulo: "",
      descripcion: "",
      estado: "",
      idUsuario: ""
  }


  constructor(public service: AppService, private _route: ActivatedRoute,  private router: Router) {

  }


  ngOnInit(): void {
            
  }


  get_task(id) {
      var response;
      var load = {
          id: id
      }
      this.service.encontrar_tarea(load).subscribe(
          data => response = data,
          err => {
              console.log("ha ocurrido un error al llamar el servicio" + err);
          },
          () => {
              this.Task = response;
          }
      )
  }
  actualizar_tarea(tarea) {

      var response;

      var load = {
          id: tarea._id,
          titulo: tarea.titulo,
          descripcion: tarea.descripcion,
          idUsuario: tarea.idUsuario
      }

      this.service.update_tarea(load).subscribe(
          data => response = data,
          err => {
              console.log("Ocurrió un problema al actualizar la tarea", err);
          },
          () => {
              swal.fire({
                  title: 'Tarea actualizada con éxito',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'                                            
              }).then((result) => {
                  this.router.navigateByUrl('/');
              });
          }
      )
  }

}
