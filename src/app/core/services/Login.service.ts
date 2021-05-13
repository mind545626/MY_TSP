import { HttpClientService } from '@app/core/services/HttpClientService';
import { ForgetPassword, Login, ResponseLoginData } from '@app/core/models/user';
import { Key } from '../models/user';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
// import { Observable } from "rxjs/Rx";


import { config } from "@app/core/app.config";
import { MessageService } from './message.service';
import { UrlService } from "@app/core/services/Url.service";
import { newPassword } from '../models/case';


// import { catchError, map, tap } from 'rxjs/operators';

@Injectable()

export class LoginService {
  constructor(
    private UrlService: UrlService,
    private http: HttpClient,
    private httpService: HttpClientService,
    private messageService: MessageService,) { }


  // 使用者信箱驗證開通(審核通過)
  // getUserActive(Id: Key): Observable<any> {
  //   return this.httpService.httpPost(config.IrmsUserInfoUrl + '/UserActive', Id);
  // }
  getUserActive(Id: Key): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsUserInfoUserActiveUrl, Id);
  }

  // 登入
  // getUserLogin(User: Login): Observable<any> {
  //   return this.httpService.httpPost(config.IrmsUserInfoUrl + '/UserLogin', User);
  // }
  getUserLogin(User: Login): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsUserInfoUserLoginUrl, User);
  }

  // 忘記密碼
  submitForgetPassword(User: ForgetPassword): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsForgetPasswordUrl, User);
  }

  // 更新密碼
  updataForgetPassword(newPassword: newPassword): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsForgetPasswordUpdateUrl, newPassword);
  }

  // 更新密碼驗證
  getForgetPasswordCheck(Id: Key): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsForgetPasswordCheckUrl, Id);
  }


}
