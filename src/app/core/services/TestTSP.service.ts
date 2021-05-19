import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';

import { HttpClientService } from "@app/core/services/HttpClientService";
import { config } from "@app/core/app.config";
import { MessageService } from './message.service';
import { UrlService } from "@app/core/services/Url.service";
import { CreateContactUs } from '../models/case';

// @Injectable({ providedIn: 'root' })
@Injectable()

export class TestTSPService {

  constructor(
    private UrlService: UrlService,
    private http: HttpClient,
    private httpService: HttpClientService,
    // private http: HttpClient,
    private messageService: MessageService) { }
  // ----------API伺服器頁面----------

  getBaseResultToBillboard(): Observable<any> {
    // const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    // const body = { title: 'Angular POST Request Example' };
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEBillboardListUrl, "");      // 公告_List
  }


  // 公告內容
  getBaseResultToBillboardDetail(): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEBillboardDetailUrl, "");
  }

  // 消息_List
  getBaseResultToNews(): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFENewsListUrl, "");
  }
  // 消息內容
  getBaseResultToNewsDetail(): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFENewsDetailUrl, "");
  }
  // Add 聯絡我們
  createContactUs(ContactData: CreateContactUs): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPContactUrl, ContactData);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
