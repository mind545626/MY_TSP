import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {

  items: MenuItem[];

  constructor(private location: Location) {

  }
  ngOnInit() {

    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/clean/clean-dispatch' },
      { label: '派車單管理列表', routerLink: '/clean/clean-dispatch'},
      { label: 'TSP_Order資料' },
    ];
  }
  goBack(): void {
    this.location.back();
  }
}
