// import { Component, OnInit, ViewChild } from '@angular/core';
// import * as $ from 'jquery';


// import { Customer, Order } from '@app/services/customer';
// import { CustomerService } from '@app/services/customerservice';

// // -------------API伺服器頁面-------------
// import { FEBillboardDetail, FENewsDetail, BaseResult } from '../../../services/TestTSP';
// import { TestTSPService } from '@app/core/services/TestTSP.service';
// import { ActivatedRoute } from '@angular/router';
// // ---------------------------------

// import { FormBuilder } from '@angular/forms';
// import { Table } from 'primeng/table';
// import { Location } from '@angular/common';

// import {DynamicDialogRef} from 'primeng/dynamicdialog';
// import {DynamicDialogConfig} from 'primeng/dynamicdialog';


// @Component({
//   selector: 'app-my-modal',
//   templateUrl: './my-modal.component.html',
//   styleUrls: ['./my-modal.component.scss'],
// })
// export class MyModalComponent implements OnInit {

//   //  todayNumber: number = Date.now();
//   //  todayDate : Date = new Date();
//   //  todayString : string = new Date().toDateString();
//   //  todayISOString : string = new Date().toISOString();


//   //table用變數
//   order: Order[];
//   customers: Customer[];
//   cols: any[];

//   // -------------API伺服器頁面-------------
//   FEBillboardDetail: FEBillboardDetail[];
//   // hero: TestTSP;
//   FENewsDetail: FENewsDetail[];
//   // ---------------------------------

//   today: string;

//   @ViewChild('dt', { static: false }) table: Table;

//   constructor(
//     // -------------API伺服器頁面-------------
//     private MyTSPService: TestTSPService,
//     private route: ActivatedRoute,
//     // ---------------------------------
//     private customerService: CustomerService,
//     private fb: FormBuilder,
//     private location: Location) {
//   }

//   ngOnInit() {
//     $('#myModal').on('shown.bs.modal', function () {
//       $('#myInput').trigger('focus')
//     })

//     // this.customerService.getOrder().then(customers => this.order = customers)


//     // -------------API伺服器頁面-------------
//     // this.MyTSPService.getBaseResultToBillboardDetail().then(data => {
//     //   this.FEBillboardDetail = data.body;
//     // });

//     // this.MyTSPService.getBaseResultToNewsDetail().then(data => {
//     //   this.FENewsDetail = data.body;
//     // });
//     // ---------------------------------


//     this.cols = [
//       { field: 'no', header: '項次', width: '75px' },
//       { field: 'OrderID', header: '訂單編號', width: '180px' },
//       { field: 'OrderDate', header: '申請日期', width: '180px' },
//       // { field: 'CarNumber', header: '車號', width: '150px' },
//       { field: 'CleanAddress', header: '清運地址', width: '300px' },
//       { field: 'OrderItems', header: '申報項目', width: '200px' },
//       { field: 'PreOrderPrice', header: '預估訂單總價', width: '150px' },
//       { field: 'OrderPrice', header: '實際訂單總價', width: '150px' },
//       { field: 'OrderProgress', header: '處理狀態', width: '180px' },
//       { field: 'Progress', header: '交易狀態', width: '180px' },
//       { field: 'Payment', header: '付款狀況', width: '180px' },
//       { field: 'OrderFulfillDate', header: '完成日期', width: '180px' },
//       // { field: 'OrderImage', header: '圖片' },
//     ];

//     this.today = new Date().toLocaleString('zh-TW', { hour12: false }).substr(0, 16);
//   }
//   goBack(): void {
//     this.location.back();
//   }

// }
