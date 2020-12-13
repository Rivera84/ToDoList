import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable( {providedIn: 'root'} )
export class AppService {
    private endpoint: string;

    constructor(private httpClient: HttpClient) {
        this.endpoint = "http://" + window.location.hostname + ":3000/api";
    }

    get_task(load): Observable<any> {
        return this.httpClient.get(this.endpoint + "/ver_tareas", {params: load, responseType: "json" })
    }

    insert_task(load): Observable<any> {
        return this.httpClient.post(this.endpoint + "/nueva_tarea", load, { responseType: "json" })
    }
    cambiar_estado_task(load): Observable<any> {
        return this.httpClient.put(this.endpoint + "/cambiar_estado_tarea", load, { responseType: "json" })
    }
    encontrar_tarea(load): Observable<any> {
        return this.httpClient.post(this.endpoint + "/encontrar_tarea", load, { responseType: "json" })
    }
    eliminar_tarea(load): Observable<any> {
        return this.httpClient.delete(this.endpoint + "/eliminar_tarea", { params: load, responseType: "json" })
    }
    update_tarea(load): Observable<any> {
        return this.httpClient.put(this.endpoint + "/actualizar_tarea", load, { responseType: "json" })
    }
    iniciar_sesion(payload): Observable<any> {
        return this.httpClient.post(this.endpoint + "/iniciar_sesion", payload, { responseType: 'json' });
    }
    set_session(token) {
        localStorage.setItem("tarea", JSON.stringify({token}));
    }
    ver_usuario(user) {
        localStorage.setItem("usuario", JSON.stringify({user}));        
    }
    reset_session() {
        localStorage.removeItem("tarea");
        localStorage.removeItem("usuario");
    }
    insert_user(load):Observable<any>{
        return this.httpClient.post(this.endpoint + '/registrar_usuario', load, {responseType:'json'});
    }
}
