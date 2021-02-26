import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService{
    public url:string;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }

    //Método para registrar un usuario
    register(user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        // Se concatena los valores necesarios en la URL para pasarlos al backend
        return this._http.post(this.url + 'register', params, {headers: headers});
    }

    // Este método llamara a /login, se le pasará el User con usuario y contraseña, 
    // luego que verifique se le pasará el token
    signup(user: User, gettoken = null): Observable<any>{
        if(gettoken != null){
            // Se le asigna un objeto User, añadiendole la propiedad 'gettoken'
            user = Object.assign(user, {gettoken});
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'login', params, {headers: headers});
    }
}