import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-modify-car',
  templateUrl: './modify-car.component.html',
  styleUrls: ['./modify-car.component.scss']
})
export class ModifyCarComponent implements OnInit {
  date: Date;
  date1: Date;
  items: MenuItem[];
  minDate: Date;
  maxDate: Date;
  es: any;
  tw: any;
  invalidDates: Array<Date>


  constructor(private location: Location) {

  }

  ngOnInit() {

    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/company/order-progress' },
      { label: '車輛管理列表', routerLink: '/clean/clean-cars' },
      { label: '編輯車輛' },

    ];
    // this.es = {
    //   firstDayOfWeek: 1,
    //   dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
    //   dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
    //   dayNamesMin: [ "D","L","M","X","J","V","S" ],
    //   monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
    //   monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
    //   today: 'Hoy',
    //   clear: 'Borrar'
    // }

    this.tw = {
      /** 每周第一天，0代表周日 */
      firstDayOfWeek: 1,
      /** 每周天数正常样式 */
      dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      /** 每周天数短样式（位置较小时显示） */
      dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      /** 每周天数最小样式 */
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      /** 每月月份正常样式 */
      monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      /** 每月月份短样式 */
      monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      today: '今日',
      clear: '刪除'
    }


    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];

  }
  goBack(): void {
    this.location.back();
  }

}
