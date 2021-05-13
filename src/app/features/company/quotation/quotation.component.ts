import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { UserDataService } from '@app/core/services/UserData.service.ts';
import { ResponseLoginData } from '@app/core/models/user';


@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {

  constructor(
    private UserDataService: UserDataService,
    private location: Location
  ) { }

  QuoteLength: string;
  items: MenuItem[];
  home: any;
  UserData: ResponseLoginData;

  // 載入開關
  progressSpinner: boolean;
  ProgressSpinnerDlg

  ngOnInit() {

    this.progressSpinner = true

    this.UserData = JSON.parse(localStorage.getItem('UserData'))

    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/company/order-progress' },
      { label: '估價管理列表' },
    ];

    this.progressSpinner = false
  }

  // 子元件的值載入到父元件{{QuoteLength}}欄位
  counterCal(cal: string) {
    this.QuoteLength = cal
  }


  goBack(): void {
    this.location.back();
  }
}
