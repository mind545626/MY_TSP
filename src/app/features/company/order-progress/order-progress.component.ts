import { Component, OnInit, ViewChild } from '@angular/core';
// 回上一頁用
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { UserDataService } from '@app/core/services/UserData.service.ts';
import { ResponseLoginData } from '@app/core/models/user';

// 原頁面載入
// import { FormBuilder } from '@angular/forms';
// import { SelectItem } from 'primeng/api';
// import { Table } from 'primeng/table';
// import { FilterUtils } from 'primeng/utils';
// import { Customer } from '@app/services/customer';
// import { CustomerService } from '@app/services/customerservice';

@Component({
  selector: 'app-order-progress',
  templateUrl: './order-progress.component.html',
  styleUrls: ['./order-progress.component.scss']
})
export class OrderProgressComponent implements OnInit {

  constructor(
    private UserDataService: UserDataService,
    private location: Location
  ) { }

  items: MenuItem[];
  home: any

  OrderLength: string;

  // 載入開關
  progressSpinner: boolean;
  ProgressSpinnerDlg

  UserData: ResponseLoginData;
  // home: MenuItem[];

  ngOnInit() {
    this.progressSpinner = true

    this.UserData = JSON.parse(localStorage.getItem('UserData'))


    $("html, body").animate({ scrollTop: 0 }, "slow");


    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/company/order-progress' },
      { label: '訂單管理列表' },
    ];

    setTimeout(() => {
      this.progressSpinner = false
    }, 1000)

  }

  // 子元件的值載入到父元件{{QuoteLength}}欄位
  counterCal(cal: string) {
    this.OrderLength = cal
  }

  goBack(): void {
    this.location.back();
  }

  reload() {
    location.reload();
  }

}
