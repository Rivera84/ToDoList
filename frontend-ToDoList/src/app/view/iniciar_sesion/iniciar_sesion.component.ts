import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControlDirective } from '@angular/forms';
import swal from 'sweetalert2';
import { AppService } from '../../app.service';
import * as jQuery from 'jquery';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar_sesion.component.html',
  styleUrls: ['./iniciar_sesion.component.css']
})
export class IniciarSesionComponent implements OnDestroy {

  @ViewChild('login_form') login_form: FormControlDirective;
  public submitted = false;
  public loading = false;
  public login_data = {
      username: "",
      password: ""
  }

  constructor(public service: AppService, private router: Router, private _datos: DatosService) {
  }

  ngOnInit(): void {
    //   console.log(localStorage.getItem('tarea'));
       
      
    $(function() {

        $('#login-form-link').click(function(e) {
            $(".login-form").delay(100).fadeIn(100);
             $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
        $('#register-form-link').click(function(e) {
            $("#register-form").delay(100).fadeIn(100);
             $(".login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
    
    });
  }

  ngOnDestroy() {
  }

  login() {
      if (this.login_form.valid) {
          this.submitted = false;
          this.loading = true;
          var response;
          var load = {
              username: this.login_data.username,
              password: this.login_data.password
          };
          this.service.iniciar_sesion(load).subscribe(
              data => response = data,
              err => {
                  if (err.status == 400) {
                      swal.fire({
                          title: 'Error de Autenticación,Las credenciales proporcionadas son incorrectas',
                          icon: 'error'
                      });
                    //   this._datos.logueado = false;
                  } else {
                      swal.fire({
                          title: 'Error interno del servidor',
                          icon: 'error'
                      });
                    //   this._datos.logueado = false;
                  }
                  this.loading = false;
              },
              () => {
                  try {
                      if (response) {                          
                          this.service.set_session(response);
                          this.router.navigateByUrl('/');
                        //   this._datos.logueado = true;
                      } else {
                          swal.fire({
                              title: 'Error interno del servidor',
                              icon: 'error'
                          });
                        //   this._datos.logueado = false;
                          this.loading = false;
                      }
                      this.loading = false;
                  } catch (error) {
                      swal.fire({
                          title: 'Error interno del servidor',
                          icon: 'error'
                      });
                    //   this._datos.logueado = false;
                      this.loading = false;
                  }
              }
          );
      } else {
          this.submitted = true;
      }
  }

}
