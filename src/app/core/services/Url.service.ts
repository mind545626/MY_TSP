import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class UrlService {

  Url: string;


  constructor(
    private router: Router,
  ) { }

  getUrl() {

    if (window.location.href.indexOf("220.134.112.17") != -1) {   //外網
      this.Url = "http://220.134.112.174:8011/IRMSAPI/";
    } else {   //內網
      // this.Url = "http://192.168.89.17:8011/IRMSAPI/api/";
      this.Url = "/IRMSAPI/";
    }
    //console.info(' url ' , this.Url+this.router.url);
    return this.Url;
  }
}
