import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {


  constructor(
    private location: Location
  ) { }

  items: MenuItem[];

  ngOnInit() {
    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/refuse-processing/clean-dispatch' },
      { label: '我的會員資料' },
    ];
  }

  goBack(): void {
    this.location.back();
  }

}