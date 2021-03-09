import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { Follow } from '../../models/follow';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    providers: [UserService, PublicationService]
})
export class TimelineComponent implements OnInit{
  public identity;
  public token;
  public title: string;
  public url: string;
  public status: string;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public publications: Publication[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService
  ){
    this.title = 'Timeline';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
  }

  ngOnInit(){
    console.log('timeline.component cargado correctamente');
    this.getPublications(this.page);
  }

  getPublications(page, adding = false){
    this._publicationService.getPublications(this.token, page).subscribe(
      response => {
        console.log(response);
        if(response.publications){
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.items_per_page;

          // SCROLL INFINITO
          // concatenar el array actual con la respuesta según el numero de paginas
          if(!adding){
            this.publications = response.publications;
            if(this.page == this.pages) this.noMore = true;
          } else {
            var arrayA = this.publications;
            var arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);

            $("html, body").animate({ scrollTop: $('body').prop("scrollHeight")}, 500);
          }

          if(page > this.pages){
            //this._router.navigate(['/home']);
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

  public noMore = false;
  viewMore(){

    if(this.page == this.pages - 1){ // 1 , 2
      this.noMore = true;
    }
    this.page += 1;
    this.getPublications(this.page, true);
  }
}
