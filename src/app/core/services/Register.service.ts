import { Key } from './../models/user';
import { Customer, Product, RegisterData } from '@app/core/models/case';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
// import { Observable } from "rxjs/Rx";

import { HttpClientService } from "@app/core/services/HttpClientService";
import { config } from "@app/core/app.config";
import { MessageService } from './message.service';
import { UrlService } from "@app/core/services/Url.service";
import { SysCode } from "../models/syscode";
import { FESysCode2Level, ResponseObj, SysCodeInput } from "../models/user";

// import { catchError, map, tap } from 'rxjs/operators';


@Injectable()

export class RegisterService {

  constructor(
    private UrlService: UrlService,
    private http: HttpClient,
    private httpService: HttpClientService,
    private messageService: MessageService,) { }


  //地址與事業別下拉選單
  getSysCodeDropDown(Type: SysCodeInput): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFESysCodeUrl, Type);
  }
  getSysCode2LevelDropDown(Type: SysCodeInput): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFESysCode2LevelUrl, Type);
  }
  getAddressDropDown(): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEAddressPartUrl, '');
  }


  // 申請事業會員
  addCreateCorporate(RegisterData: Customer): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFECreateCorporateUrl, RegisterData);
  }
  // 取得暫時會員資料(修改審核不通過)
  getTempCorporate(Id: Key): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFETempCorporateUrl, Id);
  }
  // 修改暫時會員資料
  UpdateTempCorporate(ModifyRegisterData: Customer): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEUpdateTempCorporateUrl, ModifyRegisterData);
  }
  // 修改事業單位
  getUpdateCorporate(Userdata: Customer): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEUpdateCorporateUrl, Userdata);
  }

}
