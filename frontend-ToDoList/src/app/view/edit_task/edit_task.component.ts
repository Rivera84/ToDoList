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
    selector: 'edit_task',
    templateUrl: './edit_task.component.html',
    styleUrls: ['./edit_task.component.css']
})

export class EditTaskComponent {

    public Tarea = {
        titulo: "",
        descripcion: "",
        estado: "",
        idUsuario: ""
    }


    constructor(public service: AppService, private _route: ActivatedRoute,  private router: Router) {

    }


    ngOnInit(): void {
        console.log('AQUI ESTOY');
        
        this.get_tarea(this._route.snapshot.paramMap.get('id'));
    }


    get_tarea(id) {
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
                this.Tarea = response;
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
