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


  // 取得TSP_Quotation列表
  getQuoteList(Keyword: SearchQuoteList): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetQuoteListUrl, Keyword);
  }
  // 建立TSP_Quotation
  CreateQuote(Quote: Quote): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFECreateQuoteUrl, Quote);
  }
  // 修改TSP_Quotation
  addUpdateQuote(Quote: Quote): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEUpdateQuoteUrl, Quote);
  }
  // 取得TSP_Quotation明細
  getQuoteDetai(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetQuoteDetailUrl, Code);
  }

  // TSP_Quotation轉合約
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

  // 取得TSP_Order列表
  getOrderList(Keyword: SearchOrderList): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetOrderListUrl, Keyword);
  }

  // 取得TSP_Order明細
  getOrderDetail(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetOrderDetailUrl, Code);
  }
  // 取得合約明細列表
  getContractCodeList(TaxIDNumber: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetContractCodeListUrl, TaxIDNumber);
  }
  // 新增TSP_Order
  CreateOrderUrl(CreateOrder: CreateOrder): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFECreateOrderUrl, CreateOrder);
  }
  // 刪除TSP_Order
  DeleteOrderUrl(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEDeleteOrderUrl, Code);
  }

}

// Corporate
// WasteDeal
// WasteMove
