import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit{
    public title:string;
    public user:User;
    public status:string;
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Iniciar sesion';
        this.user = new User("","","","","","","ROLE_USER","");
    }

    ngOnInit(){
        console.log('Componente de login cargado ...')
    }

    onSubmit(){
        this._userService.signup(this.user).subscribe(
            response => {
               this.identity = response.user;
               console.log(this.identity);
               if(!this.identity || !this.identity._id){
                   this.status = 'error';
               }else {
                    this.status = 'success';
                    // PERSISTIR TOKEN DEL USUARIO
                    // Guardar una variable dentro del local storage (almacenamiento del navegador)
                    // Se debe convertir el objeto JSON a un String
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    // conseguir el token
                    this.getToken();
               }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        )
    }

    // Luego de identificar al usuario se obtendrá el token
    getToken(){
        this._userService.signup(this.user, 'true').subscribe(
            response => {
               this.token = response.token;
               console.log(this.token);
               if(this.token.length <= 0){
                   this.status = 'error';
               }else {
                   this.status = 'success';
                   // PERSISTIR TOKEN DEL USUARIO
                   localStorage.setItem('token', this.token);
               }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        )
    }
}