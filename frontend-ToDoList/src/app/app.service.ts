import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
    export class AppService{
        private endpoint: string;

        constructor(private httpClient: HttpClient){
            this.endpoint = "http://" + window.location.hostname + ":3000/api";
        }

        get_task():Observable<any>{
            return this.httpClient.get(this.endpoint + "/ver_tareas", {responseType:"json"})
        }

        insert_task(load):Observable<any>{
            return this.httpClient.post(this.endpoint + "/nueva_tarea", load, {responseType: "json"})
        }
    }