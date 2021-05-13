import { Component, OnInit, ViewChild } from '@angular/core';

import { Customer, Dispatch } from '@app/services/customer';
import { CustomerService } from '@app/services/customerservice';

import { FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterUtils } from 'primeng/utils';

@Component({
  selector: 'app-abnormal',
  templateUrl: './abnormal.component.html',
  styleUrls: ['./abnormal.component.scss']
})
export class AbnormalComponent implements OnInit {

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
  dispatch: Dispatch[]
  customers: Customer[];
  cols: any[];
  orderprogress: SelectItem[];
  cleanaddress: SelectItem[];
  dispatchprogress: SelectItem[];
  // new
  payment: SelectItem[];
  progress: SelectItem[];

  //驗證用變數
  submitted = false;
  valid = true;

  @ViewChild('dt', { static: false }) table: Table;


  constructor(private customerService: CustomerService, private fb: FormBuilder) {

    this.querydate = [
      { name: '近半年內訂單', value: '近半年內訂單' },
      { name: '近一年內訂單', value: '近一年內訂單' },
      { name: '所有訂單', value: '所有訂單' },
    ];
  }
  ngOnInit() {

    this.customerService.getDispatch().then(customers => this.dispatch = customers)

    this.cols = [
      { field: 'no', header: '項次', width: '75px' },
      { field: 'DispatchID', header: '派車單編號', width: '180px' },
      { field: 'DispatchDate', header: '執行任務日期', width: '180px' },
      { field: 'CarNumber', header: '車號', width: '150px' },
      { field: 'PreDispatchPrice', header: '預估派車單總價', width: '150px' },
      { field: 'DispatchPrice', header: '實際派車單總價', width: '150px' },
      // { field: 'DispatchProgress', header: '執行狀態', width: '180px' },
      { field: 'Payment', header: '付款狀況', width: '180px' },
      { field: 'DispatchFulfillDate', header: '完成任務日期', width: '180px' },
    ];
    this.dispatchprogress = [
      { label: '全部', value: null },
      { label: '尚未執行', value: '尚未執行' },
      { label: '執行中', value: '執行中' },
      { label: '執行完畢', value: '執行完畢' },
      { label: '異常', value: '異常' }
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

}

