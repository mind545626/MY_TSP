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
import { FESysCode2Level, ResponseObj, SysCodeInput } from "../models/user";

// import { catchError, map, tap } from 'rxjs/operators';


@Injectable()

export class RegisterService {

  constructor(
    private UrlService: UrlService,
    private http: HttpClient,
    private httpService: HttpClientService,
    private messageService: MessageService,) { }


  //地址與行業類別下拉選單
  getSysCodeDropDown(Type: SysCodeInput): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFESysCodeUrl, Type);
  }
  getSysCode2LevelDropDown(Type: SysCodeInput): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFESysCode2LevelUrl, Type);
  }
  getAddressDropDown(): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEAddressPartUrl, '');
  }


  // 申請事業會員
  addCreateSeller(RegisterData: Customer): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFECreateSellerUrl, RegisterData);
  }
  // Get 暫時會員資料(Modify 審核不通過)
  getTempSeller(Id: Key): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFETempSellerUrl, Id);
  }
  // Modify 暫時會員資料
  UpdateTempSeller(ModifyRegisterData: Customer): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEUpdateTempSellerUrl, ModifyRegisterData);
  }
  // Modify 賣家會員
  getUpdateSeller(Userdata: Customer): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEUpdateSellerUrl, Userdata);
  }

}
