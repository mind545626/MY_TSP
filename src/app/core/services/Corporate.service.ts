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
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetQuoteListUrl, Keyword);
  }
  // 建立估價單
  CreateQuote(Quote: Quote): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFECreateQuoteUrl, Quote);
  }
  // 修改估價單
  addUpdateQuote(Quote: Quote): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEUpdateQuoteUrl, Quote);
  }
  // 取得估價單明細
  getQuoteDetai(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetQuoteDetailUrl, Code);
  }

  // 估價單轉合約
  CreateContract(QuoteinfoData: QuoteinfoData): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFECreateContractUrl, QuoteinfoData);
  }
  // 取得合約列表
  getContractList(Keyword: SearchContractList): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetContractListUrl, Keyword);
  }
  // 取得合約明細
  getContractDetail(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetContractDetailUrl, Code);
  }

  // 取得訂單列表
  getOrderList(Keyword: SearchOrderList): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetOrderListUrl, Keyword);
  }

  // 取得訂單明細
  getOrderDetail(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetOrderDetailUrl, Code);
  }
  // 取得合約明細列表
  getContractCodeList(TaxIDNumber: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetContractCodeListUrl, TaxIDNumber);
  }
  // 新增訂單
  CreateOrderUrl(CreateOrder: CreateOrder): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFECreateOrderUrl, CreateOrder);
  }
  // 刪除訂單
  DeleteOrderUrl(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEDeleteOrderUrl, Code);
  }

}

// Corporate
// WasteDeal
// WasteMove
