import { Component, OnInit } from '@angular/core';
import { NgForm, FormControlDirective } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {
  public login_data = {
    username: "",
}
  constructor(public service: AppService) { }

  ngOnInit(): void {
  }



  restaurarClave(){
    console.log(this.login_data);
    this.service.get_restaurarClave(this.login_data).subscribe(
        err =>{
            console.log("Ha ocurrido un error al llamar el servicio" , this.login_data);
        }
    )
}

}
