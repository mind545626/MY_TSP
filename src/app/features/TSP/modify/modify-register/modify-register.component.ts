import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Injectable, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Checkbox, Dropdown, InputText, SaveEditableRow, SelectItem } from "primeng";
import { Observable, of } from "rxjs";
import { RegisterService } from '@app/core/services/Register.service';
import { ResponseObj, FESysCode, FESysCode2Level, FESysCodeAddress, Key } from '@app/core/models/user';
import { SysCode } from '@app/core/models/syscode';
import { map, shareReplay, switchMap, tap } from "rxjs/internal/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer, CustomerDataImp, MemberRegisterData, RegisterData } from '@app/core/models/case';
import * as $ from 'jquery';



@Component({
  selector: 'app-modify-register',
  templateUrl: './modify-register.component.html',
  styleUrls: ['./modify-register.component.scss'],
  providers: [MessageService],
  // 利用它來修改theme的mat-tab-label樣式
  encapsulation: ViewEncapsulation.None
})


@Injectable({
  providedIn: 'root',
})

export class ModifyRegisterComponent implements OnInit, OnChanges {

  Vaild : number
  progressSpinner: boolean;
  ProgressSpinnerDlg

  params: string;
  Key: Key;
  isSucceed: string;
  Message: string;


  toCareerType: string;
  toCareerSubType: string;

  CareerType: FESysCode2Level[];

  tabIndex: number;

  FESysCode: FESysCode[];
  FESysCode2Level: FESysCode2Level[];
  FESysCodeAddress: FESysCodeAddress[];

  item: SelectItem[];

  CareerType$: Observable<SelectItem[]>;
  CareerSubType$: void | Observable<SelectItem[]>;
  checked: boolean = true;

  BillingCity$: Observable<SelectItem[]>;
  BillingDistrict$: void | Observable<SelectItem[]>;
  MailingCity$: Observable<SelectItem[]>;
  MailingDistrict$: void | Observable<SelectItem[]>;
  Type: string;


  date1: Date;
  date2: Date;
  date3: Date;
  date4: Date;
  minDate: Date;
  maxDate: Date;
  tw: any;
  invalidDates: Array<Date>;


  RegisterData: Customer;
  MemberRegisterData: MemberRegisterData;

  modifyRegisterForm: FormGroup;


  Attach = this.fb.array([{
    FileName: "",
    FileBase64: "",
  }])

  Box = this.fb.group({
    ItisOK: [null]
  })


  TaxIDNumber: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    protected router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
    private RegisterService: RegisterService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.Key = {
        Id: params['id']
      }
    });
    // console.log(this.Key, 'this is my params'); // Print the parameter to the console.
  }


  ngOnInit(): void {
    this.progressSpinner = true

    this.modifyRegisterForm =
      this.fb.group({
        Id: "",
        //事業單位字串
        CorporateType: "Corporate",
        //統一編號
        TaxIDNumber: [null, [Validators.required, Validators.minLength(8)]],
        //密碼
        Password: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,12}\w*$/)]],
        //公司名稱
        CorporateName: [null, [Validators.required, Validators.minLength(2), Validators.pattern("([^\x00-\x40\x5B-\x60\x7B-\x7F])+")]],
        //負責人
        Representative: [null, [Validators.required, Validators.minLength(2), Validators.pattern("([^\x00-\x40\x5B-\x60\x7B-\x7F])+")]],
        //公司電話
        PhoneNumber: [null, [Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]],
        //公司傳真
        Fax: [null, Validators.pattern(/^[0-9]{2}-[0-9]{7}/)],
        //事業別-大項
        CareerType: [null],
        //事業別-中項
        CareerSubType: [null],
        //管制編號
        ControlNumber: [null, [Validators.required, Validators.minLength(1)]],
        //聯絡人
        ContactPerson: [null, [Validators.required, Validators.minLength(2), Validators.pattern("([^\x00-\x40\x5B-\x60\x7B-\x7F])+")]],
        //聯絡人號碼
        ContactPhoneNumber: [null, [Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]],
        //聯絡人分機
        ContactPhoneExtension: [null, Validators.pattern(/^[0-9]{2,}/)],
        //聯絡人手機
        ContactMobilePhone: [null, [Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]],
        //聯絡信箱
        ContactMail: [null, [Validators.email, Validators.required]],
        //帳寄地址-郵遞區號
        BillingZipCode: [null],
        //帳寄地址-城市
        BillingCity: [null],
        //帳寄地址-鄉鎮區
        BillingDistrict: [null],
        //帳寄地址-路
        BillingRoad: [null, Validators.required],
        //通訊地址-郵遞區號
        MailingZipCode: [null],
        //通訊地址-城市
        MailingCity: [null],
        //通訊地址-鄉鎮區
        MailingDistrict: [null],
        //通訊地址-路
        MailingRoad: [null, Validators.required],
        //備用信箱
        BackupMail: [null, [Validators.email, Validators.required]],
        //密碼確認
        confirmPassword: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,12}\w*$/)]]
      });

    //頁籤初始值
    this.tabIndex = 0;

    this.RegisterService.getSysCode2LevelDropDown({ Type: "CareerType" }).subscribe((data: ResponseObj) => {
      this.CareerType$ = of(<SelectItem[]>data.body);
      this.FESysCode2Level = data.body;
    });

    this.RegisterService.getAddressDropDown().subscribe((data: ResponseObj) => {
      this.BillingCity$ = of(<SelectItem[]>data.body);
      this.MailingCity$ = of(<SelectItem[]>data.body);
      this.FESysCodeAddress = data.body;
    });



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


    // 開始與伺服器請求載入資料
    this.RegisterService.getTempCorporate(this.Key)
      .subscribe((data: MemberRegisterData) => {
        // 延遲一秒再載入資料
        if (data.code === "000") {
          setTimeout(() => {
            // this.RegisterData = data.body;
            // 先變更連動項目的值
            this.modifyRegisterForm.controls.CareerType.patchValue(data.body.CustomerData.CareerType)
            this.modifyRegisterForm.controls.BillingCity.patchValue(data.body.CustomerData.BillingCity)
            this.modifyRegisterForm.controls.MailingCity.patchValue(data.body.CustomerData.MailingCity)
            this.CareerSubType$ = of(<SelectItem[]>this.FESysCode2Level
              .find(data1 => data1.value === this.modifyRegisterForm.controls.CareerType.value).Items)
            this.MailingDistrict$ = of(<SelectItem[]>this.FESysCodeAddress
              .find(data2 => data2.value === this.modifyRegisterForm.controls.MailingCity.value).Items)
            this.BillingDistrict$ = of(<SelectItem[]>this.FESysCodeAddress
              .find(data3 => data3.value === this.modifyRegisterForm.controls.BillingCity.value).Items)
            this.modifyRegisterForm.controls.Id.patchValue(data.body.CustomerData.Id)
            this.modifyRegisterForm.controls.CorporateType.patchValue(data.body.CustomerData.CorporateType)
            this.modifyRegisterForm.controls.TaxIDNumber.patchValue(data.body.CustomerData.TaxIDNumber)
            // 避免密碼驗證失效 須重填
            // this.modifyRegisterForm.controls.Password.patchValue(data.body.CustomerData.Password)
            this.modifyRegisterForm.controls.CorporateName.patchValue(data.body.CustomerData.CorporateName)
            this.modifyRegisterForm.controls.Representative.patchValue(data.body.CustomerData.Representative)
            this.modifyRegisterForm.controls.PhoneNumber.patchValue(data.body.CustomerData.PhoneNumber)
            this.modifyRegisterForm.controls.Fax.patchValue(data.body.CustomerData.Fax)
            this.modifyRegisterForm.controls.ControlNumber.patchValue(data.body.CustomerData.ControlNumber)
            this.modifyRegisterForm.controls.ContactPerson.patchValue(data.body.CustomerData.ContactPerson)
            this.modifyRegisterForm.controls.ContactPhoneNumber.patchValue(data.body.CustomerData.ContactPhoneNumber)
            // 呼叫修改驗證
            // this.VaildPhone()
            this.VaildPhoneNumber()
            this.modifyRegisterForm.controls.ContactPhoneExtension.patchValue(data.body.CustomerData.ContactPhoneExtension)
            this.modifyRegisterForm.controls.ContactMobilePhone.patchValue(data.body.CustomerData.ContactMobilePhone)
            this.VaildMobilePhone()
            this.modifyRegisterForm.controls.ContactMail.patchValue(data.body.CustomerData.ContactMail)
            this.modifyRegisterForm.controls.BillingZipCode.patchValue(data.body.CustomerData.BillingZipCode)
            this.modifyRegisterForm.controls.BillingRoad.patchValue(data.body.CustomerData.BillingRoad)
            this.modifyRegisterForm.controls.MailingZipCode.patchValue(data.body.CustomerData.MailingZipCode)
            this.modifyRegisterForm.controls.MailingRoad.patchValue(data.body.CustomerData.MailingRoad)
            this.modifyRegisterForm.controls.BackupMail.patchValue(data.body.CustomerData.BackupMail)
            // 連動次項目緩衝一下再開始載入
            this.modifyRegisterForm.controls.CareerSubType.patchValue(data.body.CustomerData.CareerSubType)
            this.modifyRegisterForm.controls.BillingDistrict.patchValue(data.body.CustomerData.BillingDistrict)
            this.modifyRegisterForm.controls.MailingDistrict.patchValue(data.body.CustomerData.MailingDistrict)
            console.log(this.modifyRegisterForm.value, 'this is RegisterData')
            this.messageService.add({ severity: 'success', summary: '載入成功', detail: '請詳細確認您的資料填寫是否正確' });
            this.progressSpinner = false
          }, 1000)
        }
        else {
          this.messageService.add({ severity: 'error', summary: '載入失敗', detail: '三秒後將立即跳轉至登入頁面' });
          setTimeout(() => {
            this.router.navigateByUrl('/login');
            this.progressSpinner = false
          }, 3000);
        }
      });
  }

  ngOnChanges() {
    console.log('Price Component Input Changed');
  }

  onIndustryChange = (event: any, dropdown: Dropdown, CareerTypeObj: Dropdown): Observable<SelectItem[]> | void => event.value != null ? of(<SelectItem[]>this.FESysCode2Level
    .find(data => {
      this.toCareerType = CareerTypeObj.selectedOption.label;
      // console.log(event, 'onIndustryChange is OK');
      return data.value === event.value;
    }).Items) : dropdown.clear(null);



  CareerSubTypeChange(event: any, CareerTypeSubObj: Dropdown) {
    this.toCareerSubType = CareerTypeSubObj.selectedOption.label;
  }




  //二擇一驗證
  VaildPhoneNumber() {
    if
    (this.modifyRegisterForm.controls.ContactPhoneNumber.valid === true &&
     this.modifyRegisterForm.controls.ContactPhoneNumber.value !== null) {
      this.Vaild = 1
      console.log('this 1')
    } else if
    (this.modifyRegisterForm.controls.ContactMobilePhone.valid === true &&
     this.modifyRegisterForm.controls.ContactMobilePhone.value !== null
       ) {
      this.Vaild = 2
      console.log('this 2')
    } else
    {
      this.Vaild = 3
      console.log('this 3')
    }
    switch (this.Vaild) {
      case 1: {
        this.modifyRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
        this.modifyRegisterForm.controls.ContactMobilePhone.setValidators(Validators.pattern(/^[0-9]{4}-[0-9]{6}/));
        break;
      }
      case 2: {
        this.modifyRegisterForm.controls.ContactPhoneNumber.setValidators(Validators.pattern(/^[0-9]{2}-[0-9]{7}/));
        this.modifyRegisterForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
        break;
      }
      case 3: {
        this.modifyRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
        this.modifyRegisterForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
        break;
      }
    }
    //更新驗證
    this.modifyRegisterForm.get('ContactMobilePhone').updateValueAndValidity()
    this.modifyRegisterForm.get('ContactPhoneNumber').updateValueAndValidity()
  }

  //二擇一驗證
  VaildMobilePhone() {
    if
    (this.modifyRegisterForm.controls.ContactMobilePhone.valid === true &&
     this.modifyRegisterForm.controls.ContactMobilePhone.value !== null
       ) {
      this.Vaild = 2
      console.log('this 2')
    } else if
    (this.modifyRegisterForm.controls.ContactPhoneNumber.valid === true &&
     this.modifyRegisterForm.controls.ContactPhoneNumber.value !== null
       ) {
      this.Vaild = 1
      console.log('this 1')
    } else
    {
      this.Vaild = 3
      console.log('this 3')
    }
    switch (this.Vaild) {
      case 1: {
        this.modifyRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
        this.modifyRegisterForm.controls.ContactMobilePhone.setValidators(Validators.pattern(/^[0-9]{4}-[0-9]{6}/));
        break;
      }
      case 2: {
        this.modifyRegisterForm.controls.ContactPhoneNumber.setValidators(Validators.pattern(/^[0-9]{2}-[0-9]{7}/));
        this.modifyRegisterForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
        break;
      }
      case 3: {
        this.modifyRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
        this.modifyRegisterForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
        break;
      }
    }
    //更新驗證
    this.modifyRegisterForm.get('ContactMobilePhone').updateValueAndValidity()
    this.modifyRegisterForm.get('ContactPhoneNumber').updateValueAndValidity()
  }

  // ------------------------原始寫法--------------------------//
  // //二擇一驗證
  // VaildPhone() {
  //   //檢查聯絡人電話是否為空
  //   if (this.modifyRegisterForm.controls.ContactPhoneNumber.value !== null) {
  //     if (this.modifyRegisterForm.controls.ContactPhoneNumber.valid === true) {
  //       this.modifyRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
  //       this.modifyRegisterForm.controls.ContactMobilePhone.setValidators([Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
  //     }
  //     else {
  //       this.modifyRegisterForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
  //     }
  //   }
  //   //檢查聯絡人手機是否為空
  //   if (this.modifyRegisterForm.controls.ContactMobilePhone.value !== null) {
  //     if (this.modifyRegisterForm.controls.ContactMobilePhone.valid === true) {
  //       this.modifyRegisterForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
  //       this.modifyRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.pattern(/^[0-9]{2}-[0-9]{7}/)]);
  //     }
  //     else {
  //       this.modifyRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
  //     }
  //   }
  //   //更新驗證
  //   this.modifyRegisterForm.get('ContactMobilePhone').updateValueAndValidity()
  //   this.modifyRegisterForm.get('ContactPhoneNumber').updateValueAndValidity()
  // }


  onCityChange = (event: any, dropdown: Dropdown): Observable<SelectItem[]> | void => event.value != null ?
    of(<SelectItem[]>this.FESysCodeAddress
      .find(data => data.value === event.value).Items
    ) : dropdown.clear(null);



  // 複製欄位置換
  pasteCurAddress(e, formGroup: FormGroup) {
    let patchValue: object = {};
    if (e.checked) {
      patchValue['MailingZipCode'] = this.modifyRegisterForm.controls.BillingZipCode.value;
      patchValue['MailingCity'] = this.modifyRegisterForm.controls.BillingCity.value;
      this.MailingDistrict$ = of(<SelectItem[]>this.FESysCodeAddress
        .find(data => data.value === this.modifyRegisterForm.controls.BillingCity.value).Items
      )
      patchValue['MailingDistrict'] = this.modifyRegisterForm.controls.BillingDistrict.value;
      patchValue['MailingRoad'] = this.modifyRegisterForm.controls.BillingRoad.value;
    } else {
      patchValue['MailingZipCode'] = null;
      patchValue['MailingCity'] = null;
      patchValue['MailingDistrict'] = null;
      patchValue['MailingRoad'] = null;
    }
    formGroup.patchValue(patchValue)
    console.log(this.modifyRegisterForm.controls.BillingZipCode.value, '<= 複製欄位置換')
  }



  // 下一步按鈕
  NextTab() {
    if (this.modifyRegisterForm.valid) {
      if (this.Box.controls.ItisOK.value) {
        this.tabIndex = this.tabIndex + 1
      }
      else {
        this.messageService.add({ severity: 'error', summary: '失敗', detail: '請確認是否已正確閱讀' });
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: '失敗', detail: '尚有必填欄位未填' });
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }
  }

  // 修改按鈕
  BackTab() {
    this.tabIndex = this.tabIndex - 1
  }

  // 回到首頁
  return() {
    this.router.navigate(['/index']);
  }


  // 送出表單
  onSubmit() {
    let updateCusInfo = new CustomerDataImp();
    updateCusInfo.CustomerData = this.modifyRegisterForm.value;
    updateCusInfo.Attach = this.Attach.value;
    if (this.modifyRegisterForm.valid) {
      this.RegisterService.UpdateTempCorporate(updateCusInfo)
        .subscribe((data: ResponseObj) => {
          this.tabIndex = this.tabIndex + 1
          this.messageService.add({ severity: 'success', summary: '成功', detail: '會員申請成功，平台審核中' });
        })
    }
    else {
      this.messageService.add({ severity: 'error', summary: '失敗', detail: '尚有必填欄位未填' });
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }
  }
}
