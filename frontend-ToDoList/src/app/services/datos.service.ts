import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DatosService{
    
    constructor(){ }    

    authenticado(){
        
        if(localStorage.getItem('tarea')){
            return true;
        } else{
            return false;
        }
        
    }
}