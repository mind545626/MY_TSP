import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-clean-cars',
  templateUrl: './clean-cars.component.html',
  styleUrls: ['./clean-cars.component.scss']
})
export class CleanCarsComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  items: MenuItem[];

  ngOnInit() {
    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/clean/clean-dispatch' },
      { label: '車輛管理列表'},
    ];
  }

  goBack(): void {
    this.location.back();
  }

}
