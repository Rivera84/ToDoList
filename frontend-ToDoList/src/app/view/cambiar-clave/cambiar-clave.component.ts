import { Component, OnInit } from '@angular/core';
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
    password: ""
  }

  constructor(public service:AppService) {

   }

  ngOnInit(): void {
  }

  cambiarClave(){
    console.log(this.login_data);
    this.service.put_cambiarClave(this.login_data).subscribe(
        err =>{
            console.log("Ha ocurrido un error al llamar el servicio" , this.login_data);
        }
    )
}
}
