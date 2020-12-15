import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControlDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { AppService } from '../../app.service'
//import { ActivatedRoute, Params } from '@angular/router';
//import {HttpClient, HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {

  @ViewChild('login_form') login_form: FormControlDirective;
  public submitted = false;
  public loading = false;
  public noCoinciden = false;
  public login_data = {
    password: "",
    confirmpassword: ""
  }


  constructor(public service: AppService, private _activeroute: ActivatedRoute, private route: Router) {

  }


  ngOnInit(): void {
  }

  cambiarClave() {

    if (this.login_form.valid) {
      if (this.login_data.password == this.login_data.confirmpassword) {

        this.submitted = false;
        this.loading = true;
        var response;

        var load = {
          password: this.login_data.password,
          token: this._activeroute.snapshot.paramMap.get('token')
        }

        this.service.put_cambiarClave(load).subscribe(
          // data => response = data,
          err => {
            console.log("Ha ocurrido un error al llamar el servicio ", err);
            this.loading = false;
          },
          () => {
            swal.fire({
              title: '¡Contraseña cambiada exitosamente!',
              text: 'Tu contraseña ha cambiado, debes iniciar sesión con tus nuevas credenciales',
              icon: 'success'
            }).then((result) => {
              this.route.navigateByUrl('/iniciar_sesion');
              this.loading = false;
            });

          }
        )
      }
      else {
        // swal.fire({
        //   title: 'Error, Las contraseñas no coinciden',
        //   icon: 'error'
        // });
        this.noCoinciden = true;
        this.submitted = true;
        this.loading = false;
      }
    } else {
      this.submitted = true;
    }


  }
}
