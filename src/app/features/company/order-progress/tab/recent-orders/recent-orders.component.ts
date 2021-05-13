import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Customer, Order } from '@app/services/customer';
import { CustomerService } from '@app/services/customerservice';
import { CorporateService } from '@app/core/services/Corporate.service';
import { UserDataService } from '@app/core/services/UserData.service';
import { RegisterService } from '@app/core/services/Register.service';

import { FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterUtils } from 'primeng/utils';

import { Observable, of } from 'rxjs';
import { FESysCode, ResponseLoginData, ResponseObj } from '@app/core/models/user';

import { Router } from '@angular/router';
import { CodeKey, OrderList, OrderListData, SearchOrderList } from '@app/core/models/case';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss']
})
export class RecentOrdersComponent implements OnInit {

  // 將子層資料數量回傳給父層
  @Output() counterEvt = new EventEmitter();

  orderprogresses: any[];
  querydate: any[];

  UserData: ResponseLoginData;

  selectedOrders: Customer;

  keyword: SearchOrderList;
  CodeKey: CodeKey;

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
  order: OrderList[];
  customers: Customer[];
  cols: any[];
  TransactionStatus: SelectItem[];
  PaymentStatus: SelectItem[];
  // new
  payment: SelectItem[];
  progress: SelectItem[];


  newToday: string;
  startDay: string;

  //驗證用變數
  submitted = false;
  valid = true;

  // delete_btn: boolean = true;

  //SysCode
  ProcessStatus$: Observable<SelectItem[]>;
  ProcessStatus: FESysCode;

  // 載入開關
  progressSpinner: boolean;
  ProgressSpinnerDlg


  @ViewChild('dt', { static: false }) table: Table;


  constructor(
    protected router: Router,
    private UserDataService: UserDataService,
    private RegisterService: RegisterService,
    private CorporateService: CorporateService,
    private messageService: MessageService,
    // private customerService: CustomerService,
    private fb: FormBuilder
  ) {

    this.TransactionStatus = [
      { label: '正常', value: 'true' },
      { label: '停止', value: 'false' },
    ];

    this.PaymentStatus = [
      { label: '已完成', value: 'true' },
      { label: '未完成', value: 'false' },
    ];
  }
  ngOnInit() {

    this.progressSpinner = true
    this.UserData = JSON.parse(localStorage.getItem('UserData'))
    // this.customerService.getOrder().then(customers => this.order = customers)

    // 今日
    this.newToday = new Date().toLocaleString('zh-TW',
      {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
      });

    // 三個月
    var forDefault = new Date();
    forDefault.setMonth(forDefault.getMonth() - 3);
    this.startDay = forDefault.toLocaleString('zh-TW',
      {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
      });
    // 載入查詢
    this.keyword = {
      QueryDateTimeStart: this.startDay,
      QueryDateTimeEnd: this.newToday,
      TaxIDNumber: this.UserData.body.TaxIDNumber,
      KeyWord: "",
      ProcessStatus: ""
    }

    this.CodeKey = {
      Code: "",
      TaxIDNumber: this.UserData.body.TaxIDNumber,
    }

    setTimeout(() => {
      //處理狀態
      this.RegisterService.getSysCodeDropDown({ Type: "ProcessStatus" }).subscribe((data: ResponseObj) => {
        this.ProcessStatus$ = of(<SelectItem[]>data.body);
        this.ProcessStatus = data.body
      });

      // 獲取訂單列表
      this.CorporateService.getOrderList(this.keyword).subscribe((data: OrderListData) => {
        this.order = data.body;
        console.log(this.order, 'this is getorderList Data')
        // this.UserDataService.QuoteLength = this.order.length
        // 獲取子層資料數量並回傳給父層
        if (this.order === null) {
          this.counterEvt.emit(0)
          this.progressSpinner = false
        }
        else {
          this.counterEvt.emit(this.order.length);
          this.progressSpinner = false
        }
        this.progressSpinner = false
      });
    }, 200)


    this.cols = [
      { field: 'no', header: '項次', width: '75px' },
      { field: 'Code', header: '訂單編號', width: '180px' },
      { field: 'WasteCode', header: '廢棄物項目', width: '200px' },
      { field: 'CarPlate', header: '車號', width: '150px' },
      { field: 'ClearAddress', header: '清運地址', width: '300px' },
      { field: 'EstimatedPrice', header: '預估訂單總價', width: '150px' },
      { field: 'ActualPrice', header: '實際訂單總價', width: '150px' },

      { field: 'ProcessStatus', header: '處理狀態', width: '180px' },
      { field: 'TransactionStatus', header: '交易狀態', width: '180px' },
      { field: 'PaymentStatus', header: '付款狀況', width: '180px' },

      { field: 'ApplyDateTime', header: '申請日期', width: '180px' },
      { field: 'CompleteDateTime', header: '完成日期', width: '180px' },
      // { field: 'OrderImage', header: '圖片' },
      { field: 'Edit', header: '功能', width: '180px' }
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

  getOrderId(Code) {
    // this.UserDataService.QuoteID = this.order[i].Code
    // 帶參數導向網頁
    this.router.navigate(['/company/order-progress/order-info'], { queryParams: { id: Code } });
  }

  editProduct() {

  }

  deleteProduct(Code) {
    this.progressSpinner = true
    this.CodeKey.Code = Code
    console.log(this.CodeKey.Code,'this.CodeKey.Code')
    this.CorporateService.DeleteOrderUrl(this.CodeKey).subscribe((data: ResponseObj) => {
      if (data.code === "000") {
        location.reload();
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: '成功', detail: '刪除訂單成功' });
          this.progressSpinner = false
        }, 500)
      }
      else {
        this.messageService.add({ severity: 'error', summary: '載入失敗', detail: '刪除訂單失敗' });
        this.progressSpinner = false
      }
    })
  }


}
