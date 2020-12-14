import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
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
  public login_data = {
    password: "",
    confirmpassword: ""
  }

  
  constructor(public service: AppService, private _activeroute: ActivatedRoute, private route: Router) {

  }  


  ngOnInit(): void {
  }

  cambiarClave() {

    if (this.login_data.password == this.login_data.confirmpassword) {

      var load = {
        password: this.login_data.password,
        token: this._activeroute.snapshot.paramMap.get('token')
      }

      this.service.put_cambiarClave(load).subscribe(
        err => {
          console.log("Ha ocurrido un error al llamar el servicio ", err);
        },
        ()=>{
          this.route.navigateByUrl('/iniciar_sesion');
        }
      )
    }
    else{
      swal.fire({
        title: 'Error, Las contraseñas no coinciden',
        icon: 'error'
    });
    }


  }
}
