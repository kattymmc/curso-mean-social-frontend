import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

@Injectable()
export class UploadService{
    public url: string;

    constructor(){
        this.url = GLOBAL.url;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>,
                    token: string, name: string){
        return new Promise(function(resolve, reject){
            var formData: any = new FormData();
            // Objeto que nos permite hacer peticiones AJAX
            var xhr = new XMLHttpRequest();
            // almacenar todos los ficheros subidos a formData
            for(var i = 0; i<files.length; i++){
                formData.append(name, files[i], files[i].name);
            } 

            // Peticion AJAX
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response)
                    }
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }
}