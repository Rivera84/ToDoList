import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  AppService
} from '../../app.service'
import swal from 'sweetalert2';
import { FormControlDirective } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  @ViewChild('registro_form') registro_form: FormControlDirective;
  public submitted = false;
  public loading = false;
  public registro_data = {
    username: "",
    email: "",
    password: "",
    confirmpassword: ""
  }

  constructor(public servive: AppService, private _router: Router) { }

  ngOnInit(): void { }

  // public User = {
  //   username: "",
  //   password: "",
  //   confirmpassword: "",
  //   email: "",
  // }

  insert_user() {
    if (this.registro_form.valid) {
      if (this.registro_data.password == this.registro_data.confirmpassword) {
        this.submitted = false;
        this.loading = true;
        var response;
        var load = {
          username: this.registro_data.username,
          email: this.registro_data.email,
          password: this.registro_data.password
        };
        this.servive.insert_user(load).subscribe(
          data => response = data,
          err => {
            if (err.status == 400) {
              swal.fire({
                title: 'Ya existe una persona registrada con ese nombre de usuario',
                icon: 'error'
              });
            }
            console.log("Ha ocurrido un error al llamar el servicio ", err);
            this.loading = false;
          },
          () => {
            // console.log("Usuario insertado")

            swal.fire({
              title: 'Confirma tu cuenta',
              text: 'Te hemos enviado un correo electrónico para que puedas completar tu registro',
              icon: 'info'
            }).then((result) => {
                this.loading = false;
                this._router.navigateByUrl('/');
            });
          }
        )
      } else {
        swal.fire({
          title: 'Error, Las contraseñas no coinciden',
          icon: 'error'
        });
        this.loading = false;
      }
    } else {
      this.submitted = true;
    }

  }

}
