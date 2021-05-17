import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, OnChanges, IterableDiffers } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem, SelectItem } from 'primeng/api';
import { Observable, of, pipe } from 'rxjs';
import { FESysCode, FESysCode2Level, FESysCodeAddress, FESysCodeBoolean, ResponseLoginData, ResponseObj } from '@app/core/models/user';
import { ResponseQuoteData, Quote, QuoteList, Product } from '@app/core/models/case';
import { Dropdown } from 'primeng';
import { Table } from 'primeng/table';
import { FilterUtils } from 'primeng/utils';

import { RegisterService } from '@app/core/services/Register.service';
import { CorporateService } from '@app/core/services/Corporate.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
// 載用外掛驗證器(相同輸入的代碼)
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-new-quotation',
  templateUrl: './new-quotation.component.html',
  styleUrls: ['./new-quotation.component.scss'],
  providers: [MessageService],
})
export class NewQuotationComponent implements OnInit {
  // 登入資料
  UserData: ResponseLoginData

  // 表單值
  CorporateName: string;
  CareerTypeDesc: string;
  CareerSubTypeDesc: string;
  ContactPerson: string;
  ContactPhoneNumber: string;
  ContactPhoneExtension: string;
  ContactMobilePhone: string;
  ControlNumber: string;
  ClearZipCode: string;
  ClearRoad: string;

  date: Date;
  items: MenuItem[];
  minDate: Date;
  maxDate: Date;
  tw: any;
  invalidDates: Array<Date>
  today: string;
  home;

  PhoneNumber: boolean = false;
  MobilePhone: boolean = false;
  removeBtn: boolean;
  add_btn: boolean = true;

  // 表單名稱
  newQuoteForm: Quote;
  QuoteDataForm: FormGroup;

  // 地址
  ClearCity$: Observable<SelectItem[]>;
  ClearDistrict$: void | Observable<SelectItem[]>;

  // 廢棄物
  ApplyWasteType$: Observable<SelectItem[]>;
  WasteCode$: void | Observable<SelectItem[]>;

  CollectFrequency$: Observable<SelectItem[]>;
  CollectWeekDay$: Observable<SelectItem[]>;
  WasteUnit$: Observable<SelectItem[]>;
  WasteStatus$: Observable<SelectItem[]>;
  QuoteProvideEquip$: Observable<SelectItem[]>;
  QuoteType$: Observable<SelectItem[]>;
  WasteStoragePlace$: Observable<SelectItem[]>;

  ApplyWasteType: FESysCode2Level[];

  // 付款方式
  PayMethod$: Observable<SelectItem[]>;
  PayItem$: void | Observable<SelectItem[]>;

  // SysCode
  FESysCode: FESysCode[];
  FESysCode2Level: FESysCode2Level[];
  FESysCodeAddress: FESysCodeAddress[];

  // CollectFrequencyType: FESysCode[];
  // CollectWeekDayType: FESysCode[];
  // WasteUnitType: FESysCode[];

  PayItemType: FESysCode2Level[];
  CareerType: FESysCode2Level[];

  // TSP_Quotation欄位
  SelectIsTrue: FESysCodeBoolean[];
  SelectApplyWasteType: FESysCode2Level[];

  SelectQuoteType: FESysCode[];
  SelectCollectFrequency: FESysCode[];
  SelectCollectWeekDay: FESysCode[];
  SelectWasteStoragePlace: FESysCode[];
  SelectPayMethod: FESysCode[];
  SelectPayItem: FESysCode[];
  SelectQuoteProvideEquip: FESysCode[];
  SelectWasteStatus: FESysCode[];
  SelectWasteUnit: FESysCode[];

  // table用變數
  onSelect: any[];
  cols: any[];
  orderprogress: SelectItem[];

  // 查詢條件用變數
  cleanaddress: any[];
  quotationprogress: any[];
  quotationtype: any[];

  // 載入開關
  progressSpinner: boolean;
  ProgressSpinnerDlg


  updataQuote: Quote;
  WasteCodename: string


  @ViewChild('dt', { static: false }) table: Table;

  constructor(
    private router: Router,
    private location: Location,
    private messageService: MessageService,
    private RegisterService: RegisterService,
    private CorporateService: CorporateService,
    private fb: FormBuilder,
  ) {
    // this.SelectQuoteType = [
    //   { label: '現場報價', value: '現場報價' },
    //   { label: '線上估價', value: '線上估價' }
    // ];
    this.SelectIsTrue = [
      { label: '否', value: false },
      { label: '是', value: true }
    ];
    // this.form = this.fb.group({
    //   ProvideEquip: this.fb.array([this.newProvideEquip()]),
    // })
  }




  ngOnInit() {
    this.progressSpinner = true

    // 獲取登入資料
    this.UserData = JSON.parse(localStorage.getItem('UserData'))
    this.CorporateName = this.UserData.body.CorporateName
    this.CareerTypeDesc = this.UserData.body.CareerTypeDesc
    this.CareerSubTypeDesc = this.UserData.body.CareerSubTypeDesc
    this.ContactPerson = this.UserData.body.ContactPerson
    this.ContactPhoneNumber = this.UserData.body.ContactPhoneNumber
    this.ContactPhoneExtension = this.UserData.body.ContactPhoneExtension
    this.ContactMobilePhone = this.UserData.body.ContactMobilePhone
    this.ControlNumber = this.UserData.body.ControlNumber
    if (this.ContactPhoneNumber !== null) {
      this.PhoneNumber = true
    }
    if (this.ContactMobilePhone !== null) {
      this.MobilePhone = true
    }


    // 地址資料
    this.RegisterService.getAddressDropDown().subscribe((data: ResponseObj) => {
      if (data.code === "000") {
        this.ClearCity$ = of(<SelectItem[]>data.body);
        this.FESysCodeAddress = data.body;
        // 廢棄物資料
        this.RegisterService.getSysCode2LevelDropDown({ Type: "ApplyWasteType" }).subscribe((data: ResponseObj) => {
          this.ApplyWasteType$ = of(<SelectItem[]>data.body);
          this.FESysCode2Level = data.body;
        });

        // 付款方式
        this.RegisterService.getSysCode2LevelDropDown({ Type: "PayMethod" }).subscribe((data: ResponseObj) => {
          this.PayMethod$ = of(<SelectItem[]>data.body);
          this.PayItemType = data.body;
        });

        // 頻率資料1
        this.RegisterService.getSysCodeDropDown({ Type: "CollectFrequency" }).subscribe((data: ResponseObj) => {
          this.CollectFrequency$ = of(<SelectItem[]>data.body);
          console.log(this.CollectFrequency$, '55555555555')
          // this.CollectFrequencyType = data.body;
          // console.log(this.CollectFrequency$)
        });

        // 頻率資料2
        this.RegisterService.getSysCodeDropDown({ Type: "CollectWeekDay" }).subscribe((data: ResponseObj) => {
          this.CollectWeekDay$ = of(<SelectItem[]>data.body);
        });

        // 重量單位
        this.RegisterService.getSysCodeDropDown({ Type: "WasteUnit" }).subscribe((data: ResponseObj) => {
          this.WasteUnit$ = of(<SelectItem[]>data.body);
        });

        // 廢棄物型態
        this.RegisterService.getSysCodeDropDown({ Type: "WasteStatus" }).subscribe((data: ResponseObj) => {
          this.WasteStatus$ = of(<SelectItem[]>data.body);
        });

        // 設備
        this.RegisterService.getSysCodeDropDown({ Type: "QuoteProvideEquip" }).subscribe((data: ResponseObj) => {
          this.QuoteProvideEquip$ = of(<SelectItem[]>data.body);
        });

        //估價類型
        this.RegisterService.getSysCodeDropDown({ Type: "QuoteType" }).subscribe((data: ResponseObj) => {
          this.QuoteType$ = of(<SelectItem[]>data.body);
        });

        //存放位置
        this.RegisterService.getSysCodeDropDown({ Type: "WasteStoragePlace" }).subscribe((data: ResponseObj) => {
          this.WasteStoragePlace$ = of(<SelectItem[]>data.body);
        });
        this.progressSpinner = false
      }
      else {
        this.messageService.add({ severity: 'error', summary: '載入失敗', detail: '請確認連線是否正常' });
        this.progressSpinner = false
      }
    });



    this.QuoteDataForm =
      this.fb.group({
        //TSP_Quotation編號
        Id: null,
        //TSP_Quotation准許碼
        Code: null,
        //申請日期時間
        ApplyDateTime: null,
        //顧客統編
        CustomerId: this.UserData.body.TaxIDNumber,
        //顧客ID
        UP_UserId: this.UserData.body.UserId,
        //報價類型
        QuoteType: null,
        //收集頻率
        CollectFrequency: null,
        //收集週日
        CollectWeekDay: null,
        //同意免簽
        IsAgreeSignFree: null,
        //申請廢物類型
        ApplyWasteType: null,
        //清運郵遞區號
        ClearZipCode: null,
        //清運城市
        ClearCity: null,
        //清運鄉鎮
        ClearDistrict: null,
        //清運路段
        ClearRoad: [null, Validators.required],
        //廢物存放處
        WasteStoragePlace: null,
        //付款方式
        PayMethod: null,
        //付款項目
        PayItem: null,
        //需要記錄(退水費妥善處理記錄三聯單)
        IsNeedRecord: null,
        // //報價狀態
        // QuoteStatus: [null],
        // //報價日期時間
        // QuoteDateTime: [null],
        // //報價回复日期時間
        // QuoteReplyDateTime: [null],
        // //報價完成日期時間
        // QuoteCompleteDateTime: [null],

        // 提供設備
        ProvideEquip: this.fb.array([this.newProvideEquip()]),
        // 廢棄物資料
        WasteData: this.fb.array([this.newWasteData()]),
      });

    // 載入刪除設備(暫寫)
    this.removeAll()

    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/company/order-progress' },
      { label: '估價管理列表', routerLink: '/company/quotation' },
      { label: '初次估價申請單' },
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
    this.today = new Date().toLocaleString('zh-TW', { hour12: false }).substr(0, 16);

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

  // 返回
  goBack(): void {
    this.location.back();
  }

  // 連動地址
  onCityChange = (event: any, dropdown: Dropdown): Observable<SelectItem[]> | void => event.value != null ?
    of(<SelectItem[]>this.FESysCodeAddress
      .find(data => data.value === event.value).Items
    ) : dropdown.clear(null);

  // 連動廢棄物代碼
  onWasteTypeChange = (event: any, dropdown: Dropdown): Observable<SelectItem[]> | void => event.value != null ?
    of(<SelectItem[]>this.FESysCode2Level
      .find(data => data.value === event.value).Items
      .map(data => <SelectItem>{
        label: data.value,
        value: data.value,
      })
    ) : dropdown.clear(null);

  // 連動付款項目
  onPayMethodChange = (event: any, dropdown: Dropdown): Observable<SelectItem[]> | void => event.value != null ?
    of(<SelectItem[]>this.PayItemType
      .find(data => data.value === event.value).Items
    ) : dropdown.clear(null);


  // 提供設備FormArray
  ProvideEquipData(): FormArray {
    return this.QuoteDataForm.get('ProvideEquip') as FormArray;
  }
  newProvideEquip(): FormGroup {
    return this.fb.group({
      QuoteProvideEquip: ['', [Validators.required, RxwebValidators.unique()]],
      // Qty:'',
      Qty: ['', Validators.required],
    })
  }
  addContactForm() {
    (this.QuoteDataForm.get('ProvideEquip') as FormArray).push(this.newProvideEquip());
  }
  // addContactForm(): void {
  //   (<FormArray>this.QuoteProvideEquipform.get('ProvideEquips')).push(this.ProvideEquip());
  // }

  removeContact(No: number): void {
    (this.QuoteDataForm.get('ProvideEquip') as FormArray).removeAt(No);
    this.addbtn()
    // console.log(this.QuoteDataForm.get('ProvideEquip'),'this new ProvideEquip')
  }
  // 全部刪除
  removeAll(): void {
    const formArray = (this.QuoteDataForm.get('ProvideEquip') as FormArray);
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
    this.addbtn()
  }
  // 廢棄物資料FormArray
  WasteDataData(): FormArray {
    return this.QuoteDataForm.get('WasteData') as FormArray;
  }
  newWasteData(): FormGroup {
    return this.fb.group({
      // this.modifyRegisterForm.controls.BillingDistrict.value;
      // [null,[ Validators.required,RxwebValidators.unique()]]
      // RxwebValidators.unique()
      WasteCode: ['', [Validators.required, RxwebValidators.unique()]],
      WasteStatus: '',
      WasteCodename: '',
      // MonthlyQty: '',
      MonthlyQty: ['', Validators.required],
      WasteUnit: '',
    })
  }
  addWasteDataForm() {
    (this.QuoteDataForm.get('WasteData') as FormArray).push(this.newWasteData());
  }
  removeWasteData(No: number): void {
    (this.QuoteDataForm.get('WasteData') as FormArray).removeAt(No);
  }
  // 全部刪除(保留第一個)
  removeWasteDataAll(): void {
    const WasteDataformArray = (this.QuoteDataForm.get('WasteData') as FormArray);
    // while (formArray.length !== 0) {
    //   formArray.removeAt(0)
    // }
    while (WasteDataformArray.length > 1) {
      WasteDataformArray.removeAt(1)
    }
  }

  editProduct() { }

  deleteProduct() { }

  OnChangeslabel(event, id) {
    var TypeArray = this.QuoteDataForm.value.ApplyWasteType
    var GetSItemsArray = this.FESysCode2Level.find((data) => data.value === TypeArray)
    var TypeSubArray = this.QuoteDataForm.value.WasteData[id].WasteCode
    var GetSubArray = GetSItemsArray.Items.find((data2) => data2.value === TypeSubArray)
    // this.WasteCodename = GetSubArray.label
    let WasteDataformArray = this.WasteDataData().controls[id].get('WasteCodename');
    WasteDataformArray.patchValue(GetSubArray.label);
    // console.log(WasteDataformArray)
  }

  // 送出表單
  onSubmit(): void {
    this.progressSpinner = true
    console.log(this.updataQuote, 'the form')
    if (this.QuoteDataForm.valid == true) {
      this.updataQuote = this.QuoteDataForm.value;
      // console.log(JSON.stringify(updataQuote), ' ************************** ')
      // updataQuote.WasteData[0].WasteCode = this.QuoteDataForm.value.WasteData[0].WasteCode.value;
      // for (i = 0; i < WasteDataformArray.length; i++) {
      //   this.QuoteDataForm.value.WasteData[i].WasteCode = this.QuoteDataForm.value.WasteData[i].WasteCode.label;
      // }
      // console.log(this.QuoteDataForm.value.WasteData[i].WasteCode)
      this.CorporateService.CreateQuote(this.updataQuote)
        .subscribe((data: ResponseObj) => {
          if (data.code === "000") {
            this.messageService.add({ severity: 'success', summary: '成功', detail: '估價申請成功，平台審核中' });
            setTimeout(() => {
              this.router.navigateByUrl('/company/quotation');
            }, 2000);
            this.progressSpinner = false
          }
          else {
            this.messageService.add({ severity: 'error', summary: '失敗', detail: '估價申請失敗，請檢查連線是否正常' });
            $("html, body").animate({ scrollTop: 0 }, "slow");
            this.progressSpinner = false
          }
        })
    }
    else {
      this.messageService.add({ severity: 'error', summary: '失敗', detail: '尚有必填欄位未填' });
      $("html, body").animate({ scrollTop: 0 }, "slow");
      this.progressSpinner = false
    }
  }

  // 設備上限2個
  addbtn() {
    let add = (this.QuoteDataForm.get('ProvideEquip') as FormArray).length
    if (add > 1) {
      this.add_btn = false
    }
    else {
      this.add_btn = true
    }
  }


  // OnChangeslabel(event,id){
  //   let changedValue = event.value;
  //   this.QuoteDataForm.value.WasteData[id].WasteCade = this.WasteCode$
  //   this.updataQuote = this.QuoteDataForm.value;
  //   // this.FESysCode2Level.filter(data => data.Items === changedValue).find(data => changedValue)
  // }
}
