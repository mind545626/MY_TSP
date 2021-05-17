import { Component, OnInit, ViewChild } from '@angular/core';

import { Customer, Order } from '@app/services/customer';
import { CustomerService } from '@app/services/customerservice';

import { FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterUtils } from 'primeng/utils';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  orderprogresses: any[];
  querydate: any[];

  //datepicker
  date1: Date;
  date2: Date;
  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  tw: any;
  invalidDates: Array<Date>

  //table用變數
  order: Order[];
  customers: Customer[];
  cols: any[];
  orderprogress: SelectItem[];
  cleanaddress: SelectItem[];
  // new
  payment: SelectItem[];
  progress: SelectItem[];

  //驗證用變數
  submitted = false;
  valid = true;

  @ViewChild('dt', { static: false }) table: Table;


  constructor(private customerService: CustomerService, private fb: FormBuilder) {

    this.querydate = [
      { name: '近半年內TSP_Order', value: '近半年內TSP_Order' },
      { name: '近一年內TSP_Order', value: '近一年內TSP_Order' },
      { name: '所有TSP_Order', value: '所有TSP_Order' },
    ];
  }
  ngOnInit() {

    this.customerService.getOrder().then(customers => this.order = customers)

    this.cols = [
      { field: 'no', header: '項次', width: '75px' },
      { field: 'OrderID', header: 'TSP_Order編號', width: '180px' },
      { field: 'OrderDate', header: '申請日期', width: '180px' },
      { field: 'CleanAddress', header: '清運地址', width: '300px' },
      { field: 'OrderItems', header: '申報項目', width: '200px' },
      { field: 'PreOrderPrice', header: '預估TSP_Order總價', width: '150px' },
      { field: 'Progress', header: '交易狀態', width: '180px' },
      { field: 'Payment', header: '付款狀況', width: '180px' },
      { field: 'OrderFulfillDate', header: '完成日期', width: '180px' },
      { field: 'Edit', header: '功能', width: '180px' }
    ];
    this.orderprogress = [
      { label: '全部', value: null },
      { label: '待處理', value: '待處理' },
      { label: '待派車', value: '待派車' },
      { label: '已處理', value: '已處理' },
      { label: '異常', value: '異常' }
    ];

    this.cleanaddress = [
      { label: '全部', value: null },
      { label: '彰化縣員林鎮中山路218號', value: '彰化縣員林鎮中山路218號' },
      { label: '台北市大安區信義路四段205號', value: '台北市大安區信義路四段205號' },
      { label: '台北市信義區福德街5號', value: '台北市信義區福德街5號' },
      { label: '台中市中區中正路116號', value: '台中市中區中正路116號' }
    ];

    this.progress = [
      { label: '全部', value: null },
      { label: '正常', value: '正常' },
      { label: '停止', value: '停止' },
    ];
    this.payment = [
      { label: '全部', value: null },
      { label: '已完成', value: '已完成' },
      { label: '未完成', value: '未完成' },
    ];



    FilterUtils['custom'] = (value, filter): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return parseInt(filter) > value;
    }

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
  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'date', 'equals')
  }
  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return date.getFullYear() + '-' + month + '-' + day;
  }

  editProduct(){

  }
  deleteProduct(){

  }

}

