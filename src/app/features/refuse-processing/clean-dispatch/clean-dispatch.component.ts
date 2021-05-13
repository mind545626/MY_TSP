import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-clean-dispatch',
  templateUrl: './clean-dispatch.component.html',
  styleUrls: ['./clean-dispatch.component.scss']
})
export class CleanDispatchComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  items: MenuItem[];

  ngOnInit() {
    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/refuse-processing/clean-dispatch' },
      { label: '派車單管理列表'},
    ];
  }

  goBack(): void {
    this.location.back();
  }

}