import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';

import { TestIrms, BaseResult, FEBillboard, FENews, FEBillboardDetail, FENewsDetail } from '@app/services/TestIrms';

import { HttpClientService } from "@app/core/services/HttpClientService";
import { config } from "@app/core/app.config";
import { MessageService } from './message.service';
import { UrlService } from "@app/core/services/Url.service";
import { CreateContactUs } from '../models/case';

// @Injectable({ providedIn: 'root' })
@Injectable()

export class TestIrmsService {

  // private IrmsFEBillboardUrl = 'http://192.168.89.17:8011/IRMSAPI/api/FEBillboard/GetBillboardList';
  // private IrmsFEBillboardDetailUrl = 'http://192.168.89.17:8011/IRMSAPI/api/FEBillboard/GetBillboardDetail';
  // private IrmsFENewsUrl = 'http://192.168.89.17:8011/IRMSAPI/api/FENews/GetNewsList';
  // private IrmsFENewsDetailUrl = 'http://192.168.89.17:8011/IRMSAPI/api/FENews/GetNewsDetail';
  // private MyIrmsUrl = 'api/TestApi';

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
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEBillboardListUrl, "");      // 公告列表
  }

  // getBaseResultToBillboard() {
  // const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
  // const body = { title: 'Angular POST Request Example' };
  // return this.http.post<any>(this.IrmsFEBillboardUrl, body, { headers })
  //   .toPromise()
  //   .then(data => { return <BaseResult<FEBillboard>>data; });
  // }

  // getVisitHistory(customerid): Observable<any> {
  //   return this.httpService.httpGet(this.UrlService.getUrl() + config.custInfoUrl + '/revisit');
  // }

  // 公告內容
  getBaseResultToBillboardDetail(): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEBillboardDetailUrl, "");
  }
  // getBaseResultToBillboardDetail() {
  //   const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
  //   const body = { title: 'Angular POST Request Example' };
  //   return this.http.post<any>(this.IrmsFEBillboardDetailUrl, body, { headers })
  //     .toPromise()
  //     .then(data => { return <BaseResult<FEBillboardDetail>>data; });
  // }

  // 消息列表
  getBaseResultToNews(): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFENewsListUrl, "");
  }
  // 消息內容
  getBaseResultToNewsDetail(): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFENewsDetailUrl, "");
  }
  // 新增聯絡我們
  createContactUs(ContactData: CreateContactUs): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsContactUrl, ContactData);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
