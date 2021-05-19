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

    if (window.location.href.indexOf("192.0.0.1") != -1) {   //外網
      this.Url = "http://192.0.0.1:1000/TSPAPI/";
    } else {   //內網
      // this.Url = "http://192.0.0.1:1000/TSPAPI/api/";
      this.Url = "/TSPAPI/";
    }
    //console.info(' url ' , this.Url+this.router.url);
    return this.Url;
  }
}
