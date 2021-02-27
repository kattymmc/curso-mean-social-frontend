import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService{
    public url:string;
    public identity;
    public token;
    public stats;

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

    getIdentity(){
        // Convertir el String en objeto JSON
        let identity = JSON.parse(localStorage.getItem('identity'))

        console.log(identity);
    
        if(identity != "undefined"){
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        console.log(token);

        if(token != "undefined"){
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    getStats(){
        let stats = JSON.parse(localStorage.getItem('stats'));

        if(stats != "undefined"){
            this.stats = stats;
        }else{
            this.stats = null;
        }
        return this.getStats;
    }

    getCounters(userId = null): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                       .set('Authorization', this.getToken());

        if(userId != null){
            return this._http.get(this.url+'counters/'+userId, {headers: headers});
        }else{
            return this._http.get(this.url+'counters', {headers: headers});
        }
    }
}