import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';

import { TestTSP, BaseResult, FEBillboard, FENews, FEBillboardDetail, FENewsDetail } from '@app/services/TestTSP';

import { HttpClientService } from "@app/core/services/HttpClientService";
import { config } from "@app/core/app.config";
import { MessageService } from './message.service';
import { UrlService } from "@app/core/services/Url.service";
import { CreateContactUs } from '../models/case';

// @Injectable({ providedIn: 'root' })
@Injectable()

export class TestTSPService {

  // private TSPFEBillboardUrl = 'http://192.168.89.17:8011/TSPAPI/api/FEBillboard/GetBillboardList';
  // private TSPFEBillboardDetailUrl = 'http://192.168.89.17:8011/TSPAPI/api/FEBillboard/GetBillboardDetail';
  // private TSPFENewsUrl = 'http://192.168.89.17:8011/TSPAPI/api/FENews/GetNewsList';
  // private TSPFENewsDetailUrl = 'http://192.168.89.17:8011/TSPAPI/api/FENews/GetNewsDetail';
  // private MyTSPUrl = 'api/TestApi';

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Access-Control-Allow-Origin': '*',
  //     'cache-control': 'no-cache',
  //     'content-length': '168',
  //     'content-type': 'application/json; charset=utf-8',
  //     'date': 'Mon, 30 Nov 2020 06:20:34 GMT',
  //     'expires': '-1',
  //     'pragma': 'no-cache',
  //     'server': 'Microsoft-IIS/10.0',
  //     'x-aspnet-version': '4.0.30319',
  //     'x-powered-by': 'ASP.NET'
  //   })
  // };

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
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEBillboardListUrl, "");      // 公告列表
  }

  // getBaseResultToBillboard() {
  // const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
  // const body = { title: 'Angular POST Request Example' };
  // return this.http.post<any>(this.TSPFEBillboardUrl, body, { headers })
  //   .toPromise()
  //   .then(data => { return <BaseResult<FEBillboard>>data; });
  // }

  // getVisitHistory(customerid): Observable<any> {
  //   return this.httpService.httpGet(this.UrlService.getUrl() + config.custInfoUrl + '/revisit');
  // }

  // 公告內容
  getBaseResultToBillboardDetail(): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEBillboardDetailUrl, "");
  }
  // getBaseResultToBillboardDetail() {
  //   const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
  //   const body = { title: 'Angular POST Request Example' };
  //   return this.http.post<any>(this.TSPFEBillboardDetailUrl, body, { headers })
  //     .toPromise()
  //     .then(data => { return <BaseResult<FEBillboardDetail>>data; });
  // }

  // 消息列表
  getBaseResultToNews(): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFENewsListUrl, "");
  }
  // 消息內容
  getBaseResultToNewsDetail(): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFENewsDetailUrl, "");
  }
  // 新增聯絡我們
  createContactUs(ContactData: CreateContactUs): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPContactUrl, ContactData);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
