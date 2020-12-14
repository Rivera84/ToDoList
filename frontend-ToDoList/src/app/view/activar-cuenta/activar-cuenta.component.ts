import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service'
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-activar-cuenta',
  templateUrl: './activar-cuenta.component.html',
  styleUrls: ['./activar-cuenta.component.css']
})
export class ActivarCuentaComponent implements OnInit {

  constructor(public service: AppService,  private _activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cambiarClave();
  }

  cambiarClave() {

    if (this._activeroute.snapshot.paramMap.get('token')=="") {

      swal.fire({
        title: 'Error, link de activacion invalido',
        icon: 'error'
    });

    }else{
      var load = {
        token: this._activeroute.snapshot.paramMap.get('token')
      }

      this.service.put_activarCuenta(load).subscribe(
        err => {
          console.log("Ha ocurrido un error al llamar el servicio ", err);
        }
      )
    }


  }

}
