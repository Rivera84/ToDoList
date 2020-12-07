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
        console.log(this.list_task)
        typeof (this.list_task);
      }
    )
  }
}
