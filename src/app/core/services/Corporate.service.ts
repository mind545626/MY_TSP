import { HttpClientService } from '@app/core/services/HttpClientService';
import { Login, ResponseLoginData } from '@app/core/models/user';
import { CodeKey, Quote, SearchQuoteList, QuoteinfoData, SearchContractList, SearchOrderList, CreateOrder } from '@app/core/models/case';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
// import { Observable } from "rxjs/Rx";


import { config } from "@app/core/app.config";
import { MessageService } from './message.service';
import { UrlService } from "@app/core/services/Url.service";


// import { catchError, map, tap } from 'rxjs/operators';

@Injectable()

export class CorporateService {
  constructor(
    private UrlService: UrlService,
    private http: HttpClient,
    private httpService: HttpClientService,) { }


  // 取得估價單列表
  getQuoteList(Keyword: SearchQuoteList): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEGetQuoteListUrl, Keyword);
  }
  // 建立估價單
  CreateQuote(Quote: Quote): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFECreateQuoteUrl, Quote);
  }
  // 修改估價單
  addUpdateQuote(Quote: Quote): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEUpdateQuoteUrl, Quote);
  }
  // 取得估價單明細
  getQuoteDetai(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEGetQuoteDetailUrl, Code);
  }

  // 估價單轉合約
  CreateContract(QuoteinfoData: QuoteinfoData): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFECreateContractUrl, QuoteinfoData);
  }
  // 取得合約列表
  getContractList(Keyword: SearchContractList): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEGetContractListUrl, Keyword);
  }
  // 取得合約明細
  getContractDetail(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEGetContractDetailUrl, Code);
  }

  // 取得訂單列表
  getOrderList(Keyword: SearchOrderList): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEGetOrderListUrl, Keyword);
  }

  // 取得訂單明細
  getOrderDetail(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEGetOrderDetailUrl, Code);
  }
  // 取得合約明細列表
  getContractCodeList(TaxIDNumber: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEGetContractCodeListUrl, TaxIDNumber);
  }
  // 新增訂單
  CreateOrderUrl(CreateOrder: CreateOrder): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFECreateOrderUrl, CreateOrder);
  }
  // 刪除訂單
  DeleteOrderUrl(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.IrmsFEDeleteOrderUrl, Code);
  }

}

// Corporate
// WasteDeal
// WasteMove
