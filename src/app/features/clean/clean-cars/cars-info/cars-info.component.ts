import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

import * as $ from 'jquery';

@Component({
  selector: 'app-cars-info',
  templateUrl: './cars-info.component.html',
  styleUrls: ['./cars-info.component.scss']
})
export class CarsInfoComponent implements OnInit {

  items: MenuItem[];

  constructor(private location: Location) {

  }

  ngOnInit() {

    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/clean/clean-dispatch' },
      { label: '車輛管理列表', routerLink: '/clean/clean-cars' },
      { label: '車輛資料' },
    ];

  }

  goBack(): void {
    this.location.back();
  }
}
