import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-nav-act',
  templateUrl: './nav-act.component.html',
  styleUrls: ['./nav-act.component.css']
})
export class NavActComponent implements OnInit {

  public us = JSON.parse(localStorage.getItem("usuario")); 

  constructor(public service: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  cerrar_sesion(){
    this.service.reset_session();
    this.router.navigateByUrl('/iniciar_sesion');
  }
}
