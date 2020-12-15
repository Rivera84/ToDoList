import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { DatosService } from '../services/datos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _datos: DatosService, private _router: Router, private service: AppService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this._datos.authenticado()) {        
        // alert('Debes iniciar sesión primero');
        this.service.reset_session();
        this._router.navigate(['/iniciar_sesion']);
        return false;
      } else {
        return true;
      }
    // return this._datos.authenticado();
  }
}
