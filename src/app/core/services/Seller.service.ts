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

export class SellerService {
  constructor(
    private UrlService: UrlService,
    private http: HttpClient,
    private httpService: HttpClientService,) { }


  // Get TSP_Quotation_List
  getQuoteList(Keyword: SearchQuoteList): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetQuoteListUrl, Keyword);
  }
  // Create TSP_Quotation
  CreateQuote(Quote: Quote): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFECreateQuoteUrl, Quote);
  }
  // Modify TSP_Quotation
  addUpdateQuote(Quote: Quote): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEUpdateQuoteUrl, Quote);
  }
  // Get TSP_Quotation_Detail
  getQuoteDetai(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetQuoteDetailUrl, Code);
  }

  // TSP_Quotation轉TPS_Deal
  CreateContract(QuoteinfoData: QuoteinfoData): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFECreateContractUrl, QuoteinfoData);
  }
  // Get TPS_Deal_List
  getContractList(Keyword: SearchContractList): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetContractListUrl, Keyword);
  }
  // Get TPS_Deal_Detail
  getContractDetail(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetContractDetailUrl, Code);
  }

  // Get TSP_Order_List
  getOrderList(Keyword: SearchOrderList): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetOrderListUrl, Keyword);
  }

  // Get TSP_Order_Detail
  getOrderDetail(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetOrderDetailUrl, Code);
  }
  // Get TPS_Deal_Detail_List
  getContractCodeList(TaxIDNumber: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEGetContractCodeListUrl, TaxIDNumber);
  }
  // Add TSP_Order
  CreateOrderUrl(CreateOrder: CreateOrder): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFECreateOrderUrl, CreateOrder);
  }
  // Delet TSP_Order
  DeleteOrderUrl(Code: CodeKey): Observable<any> {
    return this.httpService.httpPost(this.UrlService.getUrl() + config.TSPFEDeleteOrderUrl, Code);
  }

}


