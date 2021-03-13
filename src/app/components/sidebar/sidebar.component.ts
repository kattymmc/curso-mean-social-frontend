import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from '../../services/upload.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    providers: [UserService, PublicationService, UploadService]
})
export class SidebarComponent implements OnInit{
    public identity;
    public token;
    public stats;
    public url: string;
    public status;
    public publication: Publication;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _uploadService: UploadService
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

    onSubmit(form, $event){
      this._publicationService.addPublication(this.token, this.publication).subscribe(
        response => {
          if(response.publication){
            if(this.filesToUpload && this.filesToUpload.length){
              // Subir imagen
              this._uploadService.makeFileRequest(this.url+'upload-image-pub/'+response.publication._id, [], this.filesToUpload, this.token, 'image')
              .then((result:any) => {
                this.publication.file = result.image;

                this.status = 'success';
                // limpiar el formulario
                form.reset();
                // redireccionar
                this._router.navigate(['/timeline']);
                this.sended.emit({send: 'true'});
            });
            } else {
              this.status = 'success';
              // limpiar el formulario
              form.reset();
              // redireccionar
              this._router.navigate(['/timeline']);
              this.sended.emit({send: 'true'});
            }

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

    // METODO PARA LA SUBIDA DE ARCHIVOS
    public filesToUpload: Array<File>;
    filesChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    // Output
    // Evento para indicar cuando se añadio una publicacion
    // En el timeline se actualizara la vista de publicaciones
    @Output() sended = new EventEmitter();
    sendPublication(event){
      console.log(event);
      this.sended.emit({send: 'true'});
    }

}
