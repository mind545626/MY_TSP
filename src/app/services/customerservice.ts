import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import { Notice, Customer, News, Order, Quotation, Contract, Dispatch, Cars, Note } from './customer';
import { Notice, Customer, News, Order, Quotation, Contract, Dispatch, Cars, Note } from './customer';

@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) { }
    // getNotice() {
    //     return this.http.get<any>('/assets/josn/notice.json')
    //         .toPromise()
    //         .then(res => <Notice[]>res.data)
    //         .then(data => { return data; });
    // }
    getNotice() {
        return this.http.get<any>('/assets/josn/notice.json')
            .toPromise()
            .then(res => <Notice[]>res.data)
            .then(data => { return data; });
    }
    getNews() {
        return this.http.get<any>('/assets/josn/news.json')
            .toPromise()
            .then(res => <News[]>res.data)
            .then(data => { return data; });
    }
    getOrder() {
        return this.http.get<any>('/assets/josn/order-progress.json')
            .toPromise()
            .then(res => <Order[]>res.data)
            .then(data => { return data; });
    }
    getQuotation() {
        return this.http.get<any>('/assets/josn/quotation.json')
            .toPromise()
            .then(res => <Quotation[]>res.data)
            .then(data => { return data; });
    }
    getContract() {
        return this.http.get<any>('/assets/josn/contract.json')
            .toPromise()
            .then(res => <Contract[]>res.data)
            .then(data => { return data; });
    }
    getDispatch() {
        return this.http.get<any>('/assets/josn/dispatch.json')
            .toPromise()
            .then(res => <Dispatch[]>res.data)
            .then(data => { return data; });
    }
    getCars() {
        return this.http.get<any>('/assets/josn/cars.json')
            .toPromise()
            .then(res => <Cars[]>res.data)
            .then(data => { return data; });
    }
    getNote() {
        return this.http.get<any>('/assets/josn/cars-note.json')
            .toPromise()
            .then(res => <Note[]>res.data)
            .then(data => { return data; });
    }
    getCustomersLarge() {
        return this.http.get<any>('/assets/customers-large.json')
            .toPromise()
            .then(res => <Customer[]>res.data)
            .then(data => { return data; });
    }
}
























// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Observable, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';

// import { TestIrms, BaseResult, FEBillboard, FENews, FEBillboardDetail, FENewsDetail } from '../../app/services/TestIrms';
// import { MessageService } from '../message.service';


// @Injectable({ providedIn: 'root' })
// export class TestIrmsService {

//   private IrmsFEBillboardUrl = 'http://192.168.89.17:8011/IRMSAPI/api/FEBillboard/GetBillboardList';
//   private IrmsFEBillboardDetailUrl = 'http://192.168.89.17:8011/IRMSAPI/api/FEBillboard/GetBillboardDetail';

//   private IrmsFENewsUrl = 'http://192.168.89.17:8011/IRMSAPI/api/FENews/GetNewsList';
//   private IrmsFENewsDetailUrl = 'http://192.168.89.17:8011/IRMSAPI/api/FENews/GetNewsDetail';

//   private MyIrmsUrl = 'api/TestApi'; 

//   httpOptions = {
//     headers: new HttpHeaders({
//       'Access-Control-Allow-Origin': '*',
//       'cache-control': 'no-cache',
//       'content-length': '168',
//       'content-type': 'application/json; charset=utf-8',
//       'date': 'Mon, 30 Nov 2020 06:20:34 GMT',
//       'expires': '-1',
//       'pragma': 'no-cache',
//       'server': 'Microsoft-IIS/10.0',
//       'x-aspnet-version': '4.0.30319',
//       'x-powered-by': 'ASP.NET'
//     })
//   };


//   constructor(
//     private http: HttpClient,
//     private messageService: MessageService) { }


//   getBaseResultToBillboard() {
//     const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
//     const body = { title: 'Angular POST Request Example' };
//     return this.http.post<any>(this.IrmsFEBillboardUrl, body, { headers })
//       .toPromise()
//       .then(data => { return <BaseResult<FEBillboard>>data; });
//   }


//   getBaseResultToBillboardDetail() {
//     const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
//     const body = { title: 'Angular POST Request Example' };
//     return this.http.post<any>(this.IrmsFEBillboardDetailUrl, body, { headers })
//       .toPromise()
//       .then(data => { return <BaseResult<FEBillboardDetail>>data; });
//   }


//   getBaseResultToNews() {
//     const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
//     const body = { title: 'Angular POST Request Example' };
//     return this.http.post<any>(this.IrmsFENewsUrl, body, { headers })
//       .toPromise()
//       .then(data => { return <BaseResult<FENews>>data; });
//   }

//   getBaseResultToNewsDetail() {
//     const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
//     const body = { title: 'Angular POST Request Example' };
//     return this.http.post<any>(this.IrmsFENewsDetailUrl, body, { headers })
//       .toPromise()
//       .then(data => { return <BaseResult<FENewsDetail>>data; });
//   }


//   getHeroes(): Observable<TestIrms[]> {
//     return this.http.get<TestIrms[]>(this.MyIrmsUrl)
//   }

//   getHeroNo404<Data>(id: number): Observable<TestIrms> {
//     const url = `${this.MyIrmsUrl}/?id=${id}`;
//     return this.http.get<TestIrms[]>(url)
//       .pipe(
//         map(heroes => heroes[0]),
//         tap(h => {
//           const outcome = h ? `fetched` : `did not find`;
//           this.log(`${outcome} hero id=${id}`);
//         }),
//         catchError(this.handleError<TestIrms>(`getHero id=${id}`))
//       );
//   }

//   getHero(id: number): Observable<TestIrms> {
//     const url = `${this.MyIrmsUrl}/${id}`;
//     return this.http.get<TestIrms>(url).pipe(
//       tap(_ => this.log(`fetched hero id=${id}`)),
//       catchError(this.handleError<TestIrms>(`getHero id=${id}`))
//     );
//   }

//   searchHeroes(term: string): Observable<TestIrms[]> {
//     if (!term.trim()) {
//       return of([]);
//     }
//     return this.http.get<TestIrms[]>(`${this.MyIrmsUrl}/?name=${term}`).pipe(
//       tap(x => x.length ?
//         this.log(`found heroes matching "${term}"`) :
//         this.log(`no heroes matching "${term}"`)),
//       catchError(this.handleError<TestIrms[]>('searchHeroes', []))
//     );
//   }

//   addHero(testpost: TestIrms): Observable<TestIrms> {
//     return this.http.post<TestIrms>(this.MyIrmsUrl, testpost, this.httpOptions)
//   }

//   deleteHero(testpost: TestIrms | number): Observable<TestIrms> {
//     const id = typeof testpost === 'number' ? testpost : testpost.id;
//     const url = `${this.MyIrmsUrl}/${id}`;

//     return this.http.delete<TestIrms>(url, this.httpOptions)
//   }


//   updateHero(testpost: TestIrms): Observable<any> {
//     return this.http.put(this.MyIrmsUrl, testpost, this.httpOptions)
//   }

//   /**
//    * Handle Http operation that failed.
//    * Let the app continue.
//    * @param operation - name of the operation that failed
//    * @param result - optional value to return as the observable result
//    */
//   private handleError<T>(operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {

//       console.error(error);

//       this.log(`${operation} failed: ${error.message}`);

//       return of(result as T);
//     };
//   }

//   private log(message: string) {
//     this.messageService.add(`IrmsService: ${message}`);
//   }
// }
