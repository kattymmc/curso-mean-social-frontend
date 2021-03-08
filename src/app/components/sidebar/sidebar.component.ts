import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    providers: [UserService, PublicationService]
})
export class SidebarComponent implements OnInit{
    public identity;
    public token;
    public stats;
    public url: string;
    public status;
    public publication: Publication;

    constructor(
        private _userService: UserService,
        private _publicationService: PublicationService
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.url = GLOBAL.url;
        this.publication = new Publication("","","","",this.identity._id);
    }

    ngOnInit(){
        console.log('sidebar.component cargado');
    }

    onSubmit(form){
      this._publicationService.addPublication(this.token, this.publication).subscribe(
        response => {
          if(response.publication){
            this.status = 'success';
            // limpiar el formulario
            form.reset()
          } else {
            this.status = 'error';
          }
        },
        error => {
          var errorMenssage = <any>error;
          console.log(errorMenssage);
          if(errorMenssage != null){
            this.status = 'error';
          }
        }
      );
    }

}
