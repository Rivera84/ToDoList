import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControlDirective } from '@angular/forms';
import { AppService } from '../../app.service';
import swal from 'sweetalert2';
import { title } from 'process';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  @ViewChild('login_form') login_form: FormControlDirective;
  public submitted = false;
  public loading = false;
  public login_data = {
    username: "",
    password: ""
  }
  constructor(public service: AppService, private router: Router) { }

  ngOnInit(): void {
  }
  f


  restaurarClave() {
    if (this.login_form.valid) {
      this.submitted = false;
      this.loading = true;
      var response;
      console.log(this.login_data);
      try {


        this.service.get_restaurarClave(this.login_data).subscribe(
          data => response = data,
          err => {
            if (err.status == 404) {
              swal.fire({
                title: 'Error! Usuario no encontrado',
                icon: 'error'
              });
            }
            console.log("Ha ocurrido un error al llamar el servicio", err);
            this.loading = false;
          },
          () => {
            swal.fire({
              title: '¡Revisa tu correo!',
              text: 'Hemos enviado un enlace a tu correo para que puedas restablecer tu contraseña',
              icon: 'success'
            }).then((result) => {
              this.router.navigateByUrl('/iniciar_sesion');
            });
            this.loading = false;
          }
        )
      } catch (error) {
        console.log("Ha ocurrido un error al llamar el servicio", error);

        this.loading = false;
      }
    } else {
      this.submitted = true;
    }
  }

}
