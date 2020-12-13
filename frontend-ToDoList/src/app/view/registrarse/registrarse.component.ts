import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppService
} from '../../app.service'

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  constructor(public servive: AppService) {}

  ngOnInit(): void {}

  public User = {
    username: "",
    password: ""
  }

  insert_user() {
    var response;
    this.servive.insert_user(this.User).subscribe(
      data => response = data,
      err => {
        console.log("Ha ocurrido un error al llamar el servicio");
      },
      () => {
        console.log("Usuario insertado")
      }
    )
  }

}
