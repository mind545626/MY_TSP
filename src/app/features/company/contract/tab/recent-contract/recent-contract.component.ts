import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Customer } from '@app/services/customer';

import { SellerService } from '@app/core/services/Seller.service';
import { UserDataService } from '@app/core/services/UserData.service';
import { RegisterService } from '@app/core/services/Register.service';
// import { CustomerService } from '@app/services/customerservice';

import { FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterUtils } from 'primeng/utils';
import { FESysCode, ResponseLoginData, ResponseObj } from '@app/core/models/user';
import { Observable } from 'rxjs/Rx';
import { ContractList, ContractListData, SearchContractList, WasteDatainfo, WasteDataName } from '@app/core/models/case';
import { Router } from '@angular/router';
import { of } from 'rxjs';



@Component({
  selector: 'app-recent-contract',
  templateUrl: './recent-contract.component.html',
  styleUrls: ['./recent-contract.component.scss']
})
export class RecentContractComponent implements OnInit {

  // 將子層資料數量回傳給父層
  @Output() ContractListEvt = new EventEmitter();

  // 載入開關
  progressSpinner: boolean;
  ProgressSpinnerDlg

  //查詢條件用變數
  ClearAddress: any[];
  UserTaxIDNumber: string;

  UserData: ResponseLoginData;


  ContractStatus$: Observable<SelectItem[]>;
  ContractStatus: FESysCode;

  QuoteType$: Observable<SelectItem[]>;
  QuoteType: FESysCode;

  newToday: string;
  startDay: string;

  contract: ContractList[];

  WasteDataName: WasteDataName[];


  keyword: SearchContractList;

  cleanaddress: SelectItem[];
  contractprogress: SelectItem[];

  WasteName: string[]

  date1: Date;
  date2: Date;
  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  tw: any;
  invalidDates: Array<Date>

  //table用變數
  customers: Customer[];
  selecteContracts: ContractList
  cols: any[];

  //驗證用變數
  submitted = false;
  valid = true;

  @ViewChild('dt', { static: false }) table: Table;

  constructor(
    protected router: Router,
    private UserDataService: UserDataService,
    private RegisterService: RegisterService,
    private SellerService: SellerService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.progressSpinner = true
    this.UserData = JSON.parse(localStorage.getItem('UserData'))
    console.log(this.UserData, '登入資料載入')

    $("html, body").animate({ scrollTop: 0 }, "slow");

    // 今日
    this.newToday = new Date().toLocaleString('zh-TW',
      {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
      });

    // 三年
    var forDefault = new Date();
    forDefault.setFullYear(forDefault.getFullYear() - 3);
    this.startDay = forDefault.toLocaleString('zh-TW',
      {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
      });


    // 載入查詢
    this.keyword = {
      QueryDateTimeStart: this.startDay,
      QueryDateTimeEnd: "",
      TaxIDNumber: this.UserData.body.TaxIDNumber,
      KeyWord: "",
      ContractStatus: ""
    }
    console.log( this.keyword, ' this.keyword')

    this.cols = [
      { field: 'no', header: '項次', width: '75px' },
      { field: 'Code', header: 'TPS_Deal', width: '180px' },
      { field: 'ApplyWasteType', header: '申請廢棄物類型', width: '250px' },
      { field: 'ClearAddress', header: '宅配地址', width: '200px' },
      { field: 'ContractStatus', header: 'TPS_Deal狀態', width: '180px' },
      { field: 'ApplyDateTime', header: '申請TPS_Deal日期', width: '180px' },
      { field: 'StartDateTime', header: 'TPS_Deal生效日期', width: '180px' },
      { field: 'EndDateTime', header: 'TPS_Deal結束日期', width: '180px' },
    ];

    setTimeout(() => {
      //TPS_Deal狀態
      this.RegisterService.getSysCodeDropDown({ Type: "ContractStatus" }).subscribe((data: ResponseObj) => {
        this.ContractStatus$ = of(<SelectItem[]>data.body);
        this.ContractStatus = data.body
      });

      // 獲取TSP_Quotation_List
      this.SellerService.getContractList(this.keyword).subscribe((data: ContractListData) => {
        this.contract = data.body;
        console.log(this.contract, 'this is getContractList Data')
        // 獲取子層資料數量並回傳給父層
        if (this.contract === null) {
          this.ContractListEvt.emit(0)
          this.progressSpinner = false
        }
        else {
          this.ContractListEvt.emit(this.contract.length);
          this.progressSpinner = false
        }
        this.progressSpinner = false
      });
    }, 200)

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
      clear: 'Delet '
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

    this.UserTaxIDNumber = this.UserData.body.TaxIDNumber
    console.log(this.UserTaxIDNumber, 'this.UserTaxIDNumber')
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

  deleteProduct(i) {

  }

  getContId(Code) {
    // this.UserDataService.QuoteID = this.contract[i].Code
    // 帶參數導向網頁
    this.router.navigate(['/company/contract/contract-info'], { queryParams: { id: Code } });
  }


}
