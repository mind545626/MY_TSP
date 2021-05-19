import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs/index';
import { catchError, delay, map } from 'rxjs/internal/operators';
import { ResponseObj } from "@app/core/models/user";

// import { ResponseContentType } from "@angular/http";
import { pipe } from 'rxjs';

// const SERVER_URL = '//220.134.112.174:8087/GTAISapi'; // env

const VALIDATION = {
    // headers: new HttpHeaders({
    //   // 'Access-Control-Allow-Origin': 'http://localhost:4200',
    //   // 'Access-Control-Expose-Headers': 'header1, header2',
    // Origin: 'http://client.s3-website-ap-northeast-1.amazonaws.com',
    //   'Content-Security-Policy': 'upgrade-insecure-requests'
    // }),
    // headers: new HttpHeaders({
    // 'Access-Control-Allow-Credentials' : 'true',
    // }),
    withCredentials: true
};

// 使Service成為可被注入的元件
@Injectable({
    // 請把我註冊在整個系統都是使用同一個實體的注射器裡
    // 整個系統就只會有一個實體，類似 Singleton 的概念
    // 如果這個 Service 在整個 Angular 的生命週期裡都沒有被使用到，
    // Angular 在編譯的時候，會透過 Tree-Shaking 機制把這個 Service 剔除
    providedIn: 'root'
})
export class HttpClientService {

    // 注入 HttpClient 到 service
    constructor(private httpClient: HttpClient) {
    }

    /**
     * Observable負責產生資料，創建後不會馬上啟動，須待_關注(subscribe)後開始啟動_。
     */
    public httpPost(url, JSONobj): Observable<any> {
        return this.httpClient.post<ResponseObj>(url, JSONobj, VALIDATION)
            .pipe(this.httpPipeLogic());
    }
    public httpPut(url, JSONobj): Observable<any> {
        return this.httpClient.put<ResponseObj>(url, JSONobj, VALIDATION)
            .pipe(this.httpPipeLogic());
    }
    public httpGet(url): Observable<any> {
        return this.httpClient.get<ResponseObj>(url, VALIDATION)
            .pipe(this.httpPipeLogic());
    }
    public httpGetByImage(url): Observable<any> {
        return this.httpClient.get(url, {responseType: 'blob' as 'json'});
    }
    public httpPatch(url, JSONobj): Observable<any> {
        return this.httpClient.patch<ResponseObj>(url, JSONobj, VALIDATION)
            .pipe(this.httpPipeLogic());
    }
    public httpDelete(url): Observable<any> {
        return this.httpClient.delete<ResponseObj>(url, VALIDATION)
            .pipe(this.httpPipeLogic());
    }

    private httpPipeLogic = () => pipe(
        delay(100),
        map((data: ResponseObj) => data.isSuccess === true ? data : throwError(data)),
        catchError((err: ResponseObj) => throwError(err))

    );

    /**
     * 處理http發生的錯誤，讓程式可以繼續正確的運作而不產生exception
     * @param operation - 失敗的操作，這邊是getHeroes
     * @param result - 可不傳入，最後要回傳出去的Observable物件內容，可在裡面塞一些失敗時要回傳的資料
     * 在上面的T是泛型參數。
     * 這可以讓程式在打api失敗時可Get 符合應用程式期望類型的回傳值。
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // return throwError(error);
            return of(error, result as T);

            // console.error(error);
            // this.log(`${operation} failed: ${error.message}`);
            // return of(result as T);
        };
    }

}

