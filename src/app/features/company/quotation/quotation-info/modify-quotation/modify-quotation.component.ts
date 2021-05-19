import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, OnChanges, IterableDiffers, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem, SelectItem } from 'primeng/api';
import { of, pipe } from 'rxjs';
// import { map } from "rxjs/operators";
import { FESysCode, FESysCode2Level, FESysCodeAddress, FESysCodeBoolean, ResponseLoginData, ResponseObj } from '@app/core/models/user';
import { ResponseQuoteData, Quote, QuoteList, Product, QuoteinfoData, ResponseQuoteinfoData, CodeKey, WasteData } from '@app/core/models/case';
import { Dropdown } from 'primeng';
import { Table } from 'primeng/table';
import { FilterUtils } from 'primeng/utils';

import { RegisterService } from '@app/core/services/Register.service';
import { SellerService } from '@app/core/services/Seller.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

import { UserDataService } from '@app/core/services/UserData.service';
// 載用外掛驗證器(相同輸入的代碼)
import { RxwebValidators } from '@rxweb/reactive-form-validators';
// import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operator/map';
import { Observable } from "rxjs/Rx"

@Component({
  selector: 'app-modify-quotation',
  templateUrl: './modify-quotation.component.html',
  styleUrls: ['./modify-quotation.component.scss'],
  providers: [MessageService],
})
export class ModifyQuotationComponent implements OnInit {

  // @Input() addQuoteinfoData: string;
  QuoteinfoData: QuoteinfoData;

  // 登入資料
  UserData: ResponseLoginData

  // 表單值
  Code: string
  SellerName: string;
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
  home: any;

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

  // TSP_Quotation參數
  CodeKey: CodeKey;

  WasteSysCode: FESysCode[];

  @ViewChild('dt', { static: false }) table: Table;

  constructor(
    private UserDataService: UserDataService,
    private router: Router,
    private location: Location,
    private messageService: MessageService,
    private RegisterService: RegisterService,
    private SellerService: SellerService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {

    this.SelectIsTrue = [
      { label: '否', value: false },
      { label: '是', value: true }
    ];
  }

  ngOnInit() {
    this.progressSpinner = true

    this.QuoteinfoData = this.UserDataService.QuoteinfoData

    // 獲取登入資料
    this.UserData = JSON.parse(localStorage.getItem('UserData'))


    this.SellerName = this.UserData.body.SellerName
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

    setTimeout(() => {
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

          //TSP_Quotation類型
          this.RegisterService.getSysCodeDropDown({ Type: "QuoteType" }).subscribe((data: ResponseObj) => {
            this.QuoteType$ = of(<SelectItem[]>data.body);
          });

          //存放位置
          this.RegisterService.getSysCodeDropDown({ Type: "WasteStoragePlace" }).subscribe((data: ResponseObj) => {
            this.WasteStoragePlace$ = of(<SelectItem[]>data.body);
          });

          // 從參數獲取CodeTSP_Quotation號
          this.activatedRoute.queryParams.subscribe(params => {
            this.CodeKey = {
              Code: params['id'],
              TaxIDNumber: this.UserData.body.TaxIDNumber,
            }
          });

          // 獲取TSP_Quotation資料
          if (this.QuoteinfoData == null) {
            this.SellerService.getQuoteDetai(this.CodeKey).subscribe((data: ResponseQuoteinfoData) => {
              this.QuoteinfoData = data.body
              setTimeout(() => {
                this.getdata()
              }, 800);
              console.log(this.QuoteinfoData, 'this QuoteinfoData is from API')
            })
          }
          else {
            setTimeout(() => {
              this.getdata()
            }, 800);
            console.log(this.QuoteinfoData, 'this QuoteinfoData is from UserDataService')
          }
        }
        else {
          this.messageService.add({ severity: 'error', summary: '載入失敗', detail: '請確認連線是否正常' });
          this.progressSpinner = false
        }
      });
    }, 500)

    this.QuoteDataForm =
      this.fb.group({
        //TSP_Quotation編號
        Code: null,
        //顧客統編
        CustomerId: this.UserData.body.TaxIDNumber,
        //報價類型
        QuoteType: null,
        //收集頻率
        CollectFrequency: null,
        //收集週日
        CollectWeekDay: null,
        //簽收
        IsAgreeSignFree: null,
        //申請廢物類型
        ApplyWasteType: null,
        //宅配郵遞區號
        ClearZipCode: null,
        //宅配城市
        ClearCity: null,
        //宅配鄉鎮
        ClearDistrict: null,
        //宅配路段
        ClearRoad: [null, Validators.required],
        //廢物存放處
        WasteStoragePlace: null,
        //付款方式
        PayMethod: null,
        //付款項目
        PayItem: null,
        //需要記錄紙本收據
        IsNeedRecord: null,

        // 提供設備
        ProvideEquip: this.fb.array([this.newProvideEquip()]),
        // 廢棄物資料
        WasteData: this.fb.array([this.newWasteData()]),

        //顧客ID
        UP_UserId: this.UserData.body.UserId,
      });


    // 載入Delet 設備(暫寫)
    this.removeAll()

    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/company/order-progress' },
      { label: 'TSP_Quotation管理_List', routerLink: '/company/quotation' },
      { label: 'TSP_Quotation資料' },
      { label: '編輯TSP_Quotation' },
    ];

    this.cols = [
      { field: 'QuoteId', header: '項次', width: '10%' },
      { field: 'QuoteProvideEquip', header: '設備名稱', width: '50%' },
      { field: 'Qty', header: '數量(個)', width: '15%' },
      { field: 'QuoteProvideEquipPrice', header: '單價', width: '15%' },
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
      clear: 'Delet '
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
      Qty: ['', Validators.required],
    })
  }
  addContactForm() {
    (this.QuoteDataForm.get('ProvideEquip') as FormArray).push(this.newProvideEquip());
  }
  removeContact(No: number): void {
    (this.QuoteDataForm.get('ProvideEquip') as FormArray).removeAt(No);
    this.addbtn()
  }
  // 全部Delet
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
      WasteCode: ['', [Validators.required, RxwebValidators.unique()]],
      WasteStatus: '',
      WasteCodename: '',
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
  // 全部Delet (保留第一個)
  removeWasteDataAll(): void {
    const WasteDataformArray = (this.QuoteDataForm.get('WasteData') as FormArray);
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
    let WasteDataformArray = this.WasteDataData().controls[id].get('WasteCodename');
    WasteDataformArray.patchValue(GetSubArray.label);
  }

  // 送出表單
  onSubmit(): void {
    console.log(this.updataQuote, 'the form')
    if (this.QuoteDataForm.valid == true) {
      this.updataQuote = this.QuoteDataForm.value;
      this.SellerService.addUpdateQuote(this.updataQuote)
        .subscribe((data: ResponseObj) => {
        })
      this.messageService.add({ severity: 'success', summary: '成功', detail: 'TSP_Quotation編輯儲存成功' });
      setTimeout(() => {
        this.router.navigate(['/company/quotation/quotation-info/'], { queryParams: { id: this.Code } });
        // this.router.navigateByUrl('/company/quotation/quotation-info');
      }, 2000);
    }
    else {
      this.messageService.add({ severity: 'error', summary: '失敗', detail: 'TSP_Quotation編輯儲存失敗，請確認表單填寫正確或者網路連線問題' });
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }
  }

  // 設定初始化並載入編輯資料
  getdata() {
    this.Code = this.QuoteinfoData.Code;
    // 先載入第一層dropdown的值
    this.QuoteDataForm.controls.ApplyWasteType.patchValue(this.QuoteinfoData.ApplyWasteType)
    this.QuoteDataForm.controls.ClearCity.patchValue(this.QuoteinfoData.ClearCity)
    this.QuoteDataForm.controls.PayMethod.patchValue(this.QuoteinfoData.PayMethod)

    setTimeout(() => {
      this.ClearDistrict$ = of(<SelectItem[]>this.FESysCodeAddress
        .find(data1 => data1.value === this.QuoteDataForm.controls.ClearCity.value).Items)

      this.PayItem$ = of(<SelectItem[]>this.PayItemType
        .find(data2 => data2.value === this.QuoteDataForm.controls.PayMethod.value).Items)
    }, 500);

    // 延遲載入第二層dropdown的值，同時置換值
    setTimeout(() => {
      var GetSItemsArray = this.FESysCode2Level
        .find((data) => data.value === this.QuoteinfoData.ApplyWasteType)
      var newArray = GetSItemsArray.Items.map((data) => {
        return {
          label: data.value,
          value: data.value
        }
      });
      this.WasteCode$ = of(<SelectItem[]>newArray)
    }, 1200);

    // 利用資料筆數產生出對應的Row欄位
    let ProvideEquiplength = this.QuoteinfoData.ProvideEquip.length
    let WasteDatalength = this.QuoteinfoData.WasteData.length
    let int1: number
    let int2: number
    // 利用for迴圈Add  ProvideEquip Array的對應的Row欄位
    for (int1 = 0; int1 < ProvideEquiplength; int1++) {
      this.addContactForm()
    }
    // 利用for迴圈Add  WasteData Array的對應的Row欄位
    for (int2 = 1; int2 < WasteDatalength; int2++) {
      this.addWasteDataForm()
    }

    // 利用時間差再在欄位載入值
    setTimeout(() => {
      // 利用for迴圈載入ProvideEquip Array的資料
      for (int1 = 0; int1 < ProvideEquiplength; int1++) {
        this.ProvideEquipData().controls[int1].get('QuoteProvideEquip').patchValue(this.QuoteinfoData.ProvideEquip[int1].QuoteProvideEquip)
        this.ProvideEquipData().controls[int1].get('Qty').patchValue(this.QuoteinfoData.ProvideEquip[int1].Qty)
      }
      // 利用for迴圈載入WasteData Array的資料
      for (int2 = 0; int2 < WasteDatalength; int2++) {
        this.WasteDataData().controls[int2].get('WasteCode').patchValue(this.QuoteinfoData.WasteData[int2].WasteCode)
        this.WasteDataData().controls[int2].get('WasteCodename').patchValue(this.QuoteinfoData.WasteData[int2].WasteName)
        this.WasteDataData().controls[int2].get('WasteStatus').patchValue(this.QuoteinfoData.WasteData[int2].WasteStatus)
        this.WasteDataData().controls[int2].get('MonthlyQty').patchValue(this.QuoteinfoData.WasteData[int2].MonthlyQty)
        this.WasteDataData().controls[int2].get('WasteUnit').patchValue(this.QuoteinfoData.WasteData[int2].WasteUnit)
      }
    }, 1000);

    // 逐筆帶入資料
    this.QuoteDataForm.controls.Code.patchValue(this.QuoteinfoData.Code)
    this.QuoteDataForm.controls.QuoteType.patchValue(this.QuoteinfoData.QuoteType)
    this.QuoteDataForm.controls.IsAgreeSignFree.patchValue(this.QuoteinfoData.IsAgreeSignFree)
    this.QuoteDataForm.controls.CollectFrequency.patchValue(this.QuoteinfoData.CollectFrequency)
    this.QuoteDataForm.controls.CollectWeekDay.patchValue(this.QuoteinfoData.CollectWeekDay)
    this.QuoteDataForm.controls.ClearZipCode.patchValue(this.QuoteinfoData.ClearZipCode)
    this.QuoteDataForm.controls.ClearRoad.patchValue(this.QuoteinfoData.ClearRoad)
    this.QuoteDataForm.controls.WasteStoragePlace.patchValue(this.QuoteinfoData.WasteStoragePlace)
    this.QuoteDataForm.controls.IsNeedRecord.patchValue(this.QuoteinfoData.IsNeedRecord)
    this.QuoteDataForm.controls.ClearDistrict.patchValue(this.QuoteinfoData.ClearDistrict)
    this.QuoteDataForm.controls.PayItem.patchValue(this.QuoteinfoData.PayItem)

    this.progressSpinner = false
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
}
