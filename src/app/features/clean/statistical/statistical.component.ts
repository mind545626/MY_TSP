import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss']
})
export class StatisticalComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  items: MenuItem[];

  ngOnInit() {
    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/clean/clean-dispatch' },
      { label: '統計資料查詢' },
    ];
  }

  goBack(): void {
    this.location.back();
  }

}