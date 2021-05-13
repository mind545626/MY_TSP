import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';


import { Customer, Order } from '@app/services/customer';
import { CustomerService } from '@app/services/customerservice';

// -------------API伺服器頁面-------------
import { FEBillboardDetail, FENewsDetail, BaseResult } from '@app/services/TestIrms';
import { TestIrmsService } from '@app/core/services/TestIrms.service';
import { ActivatedRoute } from '@angular/router';
// ---------------------------------

import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { Location } from '@angular/common';



@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss'],
})
export class MyDialogComponent implements OnInit {

  //  todayNumber: number = Date.now();
  //  todayDate : Date = new Date();
  //  todayString : string = new Date().toDateString();
  //  todayISOString : string = new Date().toISOString();


  //table用變數
  order: Order[];
  customers: Customer[];
  cols: any[];

  // -------------API伺服器頁面-------------
  FEBillboardDetail: FEBillboardDetail[];
  // hero: TestIrms;
  FENewsDetail: FENewsDetail[];
  // ---------------------------------

  today: string;

  @ViewChild('dt', { static: false }) table: Table;

  constructor(
    // -------------API伺服器頁面-------------
    private MyIrmsService: TestIrmsService,
    private route: ActivatedRoute,
    // ---------------------------------
    private customerService: CustomerService,
    private fb: FormBuilder,
    private location: Location) {
  }

  ngOnInit() {
    $('#MyDialog').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })

    // this.customerService.getOrder().then(customers => this.order = customers)


    // -------------API伺服器頁面-------------
    // this.MyIrmsService.getBaseResultToBillboardDetail().then(data => {
    //   this.FEBillboardDetail = data.body;
    // });

    // this.MyIrmsService.getBaseResultToNewsDetail().then(data => {
    //   this.FENewsDetail = data.body;
    // });
    // ---------------------------------


    this.cols = [
      { field: 'no', header: '項次', width: '75px' },
      { field: 'OrderID', header: '訂單編號', width: '180px' },
      { field: 'OrderDate', header: '申請日期', width: '180px' },
      // { field: 'CarNumber', header: '車號', width: '150px' },
      { field: 'CleanAddress', header: '清運地址', width: '300px' },
      { field: 'OrderItems', header: '申報項目', width: '200px' },
      { field: 'PreOrderPrice', header: '預估訂單總價', width: '150px' },
      { field: 'OrderPrice', header: '實際訂單總價', width: '150px' },
      { field: 'OrderProgress', header: '處理狀態', width: '180px' },
      { field: 'Progress', header: '交易狀態', width: '180px' },
      { field: 'Payment', header: '付款狀況', width: '180px' },
      { field: 'OrderFulfillDate', header: '完成日期', width: '180px' },
      // { field: 'OrderImage', header: '圖片' },
    ];

    this.today = new Date().toLocaleString('zh-TW', { hour12: false }).substr(0, 16);
  }
  goBack(): void {
    this.location.back();
  }

}
