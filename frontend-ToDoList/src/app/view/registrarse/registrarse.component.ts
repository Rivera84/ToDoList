import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppService
} from '../../app.service'
import swal from 'sweetalert2';

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
    password: "",
    confirmpassword:"", 
    email: "",
  }

  insert_user() {
    if (this.User.password == this.User.confirmpassword) {
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
  } else{
    swal.fire({
      title: 'Error, Las contraseñas no coinciden',
      icon: 'error'
  });
  }
}

}
