import { Component, OnInit, ViewChild } from '@angular/core';

import { Customer, Quotation } from '@app/services/customer';
import { CustomerService } from '@app/services/customerservice';

import { FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterUtils } from 'primeng/utils';

@Component({
  selector: 'app-all-quotation',
  templateUrl: './all-quotation.component.html',
  styleUrls: ['./all-quotation.component.scss']
})
export class AllQuotationComponent implements OnInit {

  //查詢條件用變數
  cleanaddress: any[];
  quotationprogress: any[];

  quotationtype: any[];

  //datepicker
  date1: Date;
  date2: Date;
  date3: Date;
  date4: Date;
  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  tw: any;
  invalidDates: Array<Date>
  public calendar_en: any;
  //table用變數
  quotation: Quotation[]
  customers: Customer[];
  selectedCustomers: Customer;
  selectedOrders: Customer;
  onSelect: any[];
  cols: any[];
  orderprogress: SelectItem[];

  //驗證用變數
  submitted = false;
  valid = true;

  @ViewChild('dt', { static: false }) table: Table;

  constructor(private customerService: CustomerService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.customerService.getQuotation().then(customers => this.quotation = customers)

    this.cols = [
      { field: 'no', header: '項次', width: '75px' },
      { field: 'QuotationID', header: 'TSP_Quotation號', width: '180px' },
      { field: 'CleanAddress', header: '清運地址', width: '300px' },
      { field: 'QuotationDateApply', header: '申請估價日期', width: '180px' },
      { field: 'QuotationType', header: '申請估價類型', width: '180px' },
      { field: 'QuotationProgress', header: '估價狀態', width: '180px' },
      { field: 'QuotationDateAgreeing', header: '現場估價日期', width: '180px' },
      { field: 'QuotationDateStart', header: '報價日期', width: '180px' },
      { field: 'QuotationDateEnd', header: '報價完成日期', width: '180px' },
      { field: 'QuotationItems', header: '估價項目', width: '200px' },
      // { field: 'Edit', header: '功能', width: '180px' }
    ];
    this.cleanaddress = [
      { label: '全部', value: null },
      { label: '彰化縣員林鎮中山路218號', value: '彰化縣員林鎮中山路218號' },
      { label: '台北市大安區信義路四段205號', value: '台北市大安區信義路四段205號' },
      { label: '台北市信義區福德街5號', value: '台北市信義區福德街5號' },
      { label: '台中市中區中正路116號', value: '台中市中區中正路116號' }
    ];
    this.quotationprogress = [
      { label: '全部', value: null },
      { label: '申請審核中', value: '申請審核中' },
      { label: '申請處理中', value: '申請處理中' },
      { label: '已報價', value: '已報價' },
      { label: '報價完成', value: '報價完成' },
    ];
    this.quotationtype = [
      { label: '全部', value: null },
      { label: '現場估價', value: '現場估價' },
      { label: '線上報價', value: '線上報價' },
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


    $("html, body").animate({ scrollTop: 0 }, "slow");


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
