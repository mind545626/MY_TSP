import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ResponseLoginData } from '@app/core/models/user';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  items: MenuItem[];
  home

  ContractLength: string;

  UserData: ResponseLoginData;

  ngOnInit() {

    this.UserData = JSON.parse(localStorage.getItem('UserData'))

    $("html, body").animate({ scrollTop: 0 }, "slow");


    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/company/contract' },
      { label: '合約管理列表' },
    ];
  }

  goBack(): void {
    this.location.back();
  }

  // 子元件的值載入到父元件{{QuoteLength}}欄位
  ContractListEvtCal(cal: string) {
    this.ContractLength = cal
  }

}
