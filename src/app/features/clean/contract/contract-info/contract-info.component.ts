import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-contract-info',
  templateUrl: './contract-info.component.html',
  styleUrls: ['./contract-info.component.scss']
})
export class ContractInfoComponent implements OnInit {

  items: MenuItem[];

  constructor(private location: Location) {

  }

  ngOnInit() {

    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/clean/clean-dispatch' },
      { label: '合約管理列表', routerLink: '/clean/contract' },
      { label: '合約資料' },
    ];

  }

  goBack(): void {
    this.location.back();
  }
}
