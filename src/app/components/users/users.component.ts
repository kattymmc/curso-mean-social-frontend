import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    providers: [UserService, FollowService]
})
export class UsersComponent implements OnInit{
    public title: string;
    public identity;
    public token;
    public status: string;
    public page;
    public next_page;
    public prev_page;
    public total;
    public pages;
    public users: User[];
    public url: string;
    public follows;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _followService: FollowService
    ){
        this.title = 'Gente';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('user.component cargado');
        this.actualPage();
    }

    // Captura la página actual, desde la url
    actualPage(){
        this._route.params.subscribe(params => {
            let page = +params['page'];
            this.page = page;

            if(!params['page']){
                page=1;
            }

            if(!page){
                page = 1;
            }else{
                this.next_page = page + 1;
                this.prev_page = page - 1;

                if(this.prev_page <= 0){
                    this.prev_page = 1;
                }
            }

            this.getUsers(page);
        });
    }

    // Obtiene los users segun la página que se le indica
    getUsers(page){
        this._userService.getUsers(page).subscribe(
            response => {
                if(!response.users){
                    this.status = 'error';
                }else{
                    console.log(response);
                    this.total = response.total;
                    this.users = response.users;
                    this.pages = response.pages;
                    this.follows = response.users_following;
                    if(page > this.pages){
                        this._router.navigate(['/gente',1]);
                    }
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

    // Eventos para los botones al momento que el mouse entre o salga del boton
    public followUserOver;
    mouseEnter(user_id){
        this.followUserOver = user_id;
    }
    mouseLeave(user_id){
        this.followUserOver = 0;
    }

    // SEGUIR A UN USUARIO
    followUser(followed){
        var follow = new Follow('',this.identity._id,followed);

        this._followService.addFollow(this.token, follow).subscribe(
            response => {
                if(!response.follow){
                    this.status = 'error';
                } else {
                    this.status = 'status';
                    this.follows.push(followed)
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

    // DEJAR DE SEGUIR A UN USUARIO
    unfollowUser(followed){
        this._followService.deleteFollow(this.token, followed).subscribe(
            response => {
                // Buscar el elemento followed en el array Follows
                var search = this.follows.indexOf(followed);
                // Si lo encuentra
                if(search != -1){
                    this.follows.splice(search, 1);
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