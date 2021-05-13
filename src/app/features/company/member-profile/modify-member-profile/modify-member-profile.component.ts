import { LoginData } from './../../../../core/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Injectable, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';

import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

import { LoginService } from '@app/core/services/Login.service.ts';
import { UserDataService } from '@app/core/services/UserData.service.ts';
import { Message, MessageService } from 'primeng/api';
import { Checkbox, Dropdown, InputText, SaveEditableRow, SelectItem } from "primeng";
import { Observable, of } from "rxjs";
import { RegisterService } from '@app/core/services/Register.service';
import { ResponseObj, FESysCode, FESysCode2Level, FESysCodeAddress, Key, ResponseLoginData } from '@app/core/models/user';
import { SysCode } from '@app/core/models/syscode';
import { map, shareReplay, switchMap, tap } from "rxjs/internal/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer, CustomerDataImp, MemberRegisterData, RegisterData } from '@app/core/models/case';
import * as $ from 'jquery';



@Component({
  selector: 'app-modify-member-profile',
  templateUrl: './modify-member-profile.component.html',
  styleUrls: ['./modify-member-profile.component.scss'],
  providers: [MessageService]
})
export class ModifyMemberProfileComponent implements OnInit {

  @Input() inputModifyUserData;

  Vaild: number;
  progressSpinner: boolean;
  ProgressSpinnerDlg

  items: MenuItem[];
  home: MenuItem[];


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

  i: number

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

  modifyUserDataForm: FormGroup;


  Attach = this.fb.array([{
    FileName: "",
    FileBase64: "",
  }])

  Box = this.fb.group({
    ItisOK: [null]
  })

  TaxIDNumber: string;

  UserData: ResponseLoginData;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    protected router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
    private RegisterService: RegisterService,
    private UserDataService: UserDataService,
    private LoginService: LoginService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.Key = {
        Id: params['id']
      }
    });
    // console.log(this.Key, 'this is my params'); // Print the parameter to the console.
  }


  ngOnInit() {
    this.progressSpinner = true

    this.UserData = JSON.parse(localStorage.getItem('UserData'))
    // this.UserData = this.UserDataService.UserData
    // console.log(this.UserDataService.UserData, 'Get UserData')

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/company/order-progress' },
      { label: '我的會員資料', routerLink: '/company/member-profile' },
      { label: '編輯會員資料' },
    ];

    this.modifyUserDataForm =
      this.fb.group({
        Id: this.TaxIDNumber,
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
        BillingRoad: [null],
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
        // confirmPassword: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,12}\w*$/)]]
      });

    this.RegisterService.getSysCode2LevelDropDown({ Type: "CareerType" }).subscribe((data: ResponseObj) => {
      this.CareerType$ = of(<SelectItem[]>data.body);
      this.FESysCode2Level = data.body;
    });

    this.RegisterService.getAddressDropDown().subscribe((data: ResponseObj) => {
      this.BillingCity$ = of(<SelectItem[]>data.body);
      this.MailingCity$ = of(<SelectItem[]>data.body);
      this.FESysCodeAddress = data.body;
    });

    // 有抓到SelectItem的資料才運作
    if (this.FESysCode2Level !== null &&
      this.FESysCodeAddress !== null) {
      // 開始與伺服器請求載入資料
      // 延遲一秒再載入資料
      setTimeout(() => {
        // this.RegisterData = data.body;
        // 先變更連動項目的值
        this.modifyUserDataForm.controls.CareerType.patchValue(this.UserData.body.CareerType)
        this.modifyUserDataForm.controls.BillingCity.patchValue(this.UserData.body.BillingCity)
        this.modifyUserDataForm.controls.MailingCity.patchValue(this.UserData.body.MailingCity)

        this.CareerSubType$ = of(<SelectItem[]>this.FESysCode2Level
          .find(data1 => data1.value === this.modifyUserDataForm.controls.CareerType.value).Items)

        setTimeout(() => {
          this.BillingDistrict$ = of(<SelectItem[]>this.FESysCodeAddress
            .find(data2 => data2.value === this.modifyUserDataForm.controls.BillingCity.value).Items)
        }, 200)
        setTimeout(() => {
        this.MailingDistrict$ = of(<SelectItem[]>this.FESysCodeAddress
          .find(data3 => data3.value === this.modifyUserDataForm.controls.MailingCity.value).Items)
        }, 400)

        this.modifyUserDataForm.controls.Id.patchValue(this.UserData.body.UserId)
        this.modifyUserDataForm.controls.CorporateType.patchValue(this.UserData.body.CorporateType)
        this.modifyUserDataForm.controls.TaxIDNumber.patchValue(this.UserData.body.TaxIDNumber)
        this.modifyUserDataForm.controls.Password.patchValue(this.UserData.body.Password)
        this.modifyUserDataForm.controls.CorporateName.patchValue(this.UserData.body.CorporateName)
        this.modifyUserDataForm.controls.Representative.patchValue(this.UserData.body.Representative)
        this.modifyUserDataForm.controls.PhoneNumber.patchValue(this.UserData.body.PhoneNumber)
        this.modifyUserDataForm.controls.Fax.patchValue(this.UserData.body.Fax)
        this.modifyUserDataForm.controls.ControlNumber.patchValue(this.UserData.body.ControlNumber)
        this.modifyUserDataForm.controls.ContactPerson.patchValue(this.UserData.body.ContactPerson)
        this.modifyUserDataForm.controls.ContactPhoneNumber.patchValue(this.UserData.body.ContactPhoneNumber)

        // 呼叫修改驗證
        this.VaildPhoneNumber()
        this.modifyUserDataForm.controls.ContactPhoneExtension.patchValue(this.UserData.body.ContactPhoneExtension)
        this.modifyUserDataForm.controls.ContactMobilePhone.patchValue(this.UserData.body.ContactMobilePhone)
        // 呼叫修改驗證
        // this.VaildPhone()
        this.VaildMobilePhone()
        setTimeout(() => {
          this.modifyUserDataForm.controls.ContactMail.patchValue(this.UserData.body.ContactMail)
          this.modifyUserDataForm.controls.BillingZipCode.patchValue(this.UserData.body.BillingZipCode)
          this.modifyUserDataForm.controls.BillingRoad.patchValue(this.UserData.body.BillingRoad)
          this.modifyUserDataForm.controls.MailingZipCode.patchValue(this.UserData.body.MailingZipCode)
          this.modifyUserDataForm.controls.MailingRoad.patchValue(this.UserData.body.MailingRoad)
          this.modifyUserDataForm.controls.BackupMail.patchValue(this.UserData.body.BackupMail)
        }, 200)
        // 連動次項目緩衝一下再開始載入
        setTimeout(() => {
          this.modifyUserDataForm.controls.CareerSubType.patchValue(this.UserData.body.CareerSubType)
          this.modifyUserDataForm.controls.BillingDistrict.patchValue(this.UserData.body.BillingDistrict)
          this.modifyUserDataForm.controls.MailingDistrict.patchValue(this.UserData.body.MailingDistrict)
          console.log(this.modifyUserDataForm.value, 'this is RegisterData')
          this.progressSpinner = false
        }, 400)
      }, 1000)
    }
    // if ( this.modifyUserDataForm.controls.CareerSubType.hasError  true  &&
    //      this.modifyUserDataForm.controls.BillingDistrict.hasError &&
    //      this.modifyUserDataForm.controls.MailingDistrict.hasError ) {
    //   this.progressSpinner = false
    // }
    console.log(this.progressSpinner, 'this.progressSpinner')

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

  goBack(): void {
    this.location.back();
  }

  onIndustryChange = (event: any, dropdown: Dropdown, CareerTypeObj: Dropdown): Observable<SelectItem[]> | void => event.value != null ?
    of(<SelectItem[]>this.FESysCode2Level
      .find(data => {
        this.toCareerType = CareerTypeObj.selectedOption.label;
        // console.log(event, 'onIndustryChange is OK');
        return data.value === event.value;
      }).Items) : dropdown.clear(null);



  CareerSubTypeChange(event: any, CareerTypeSubObj: Dropdown) {
    this.toCareerSubType = CareerTypeSubObj.selectedOption.label;
  }


  onCityChange = (event: any, dropdown: Dropdown): Observable<SelectItem[]> | void => event.value != null ?
    of(<SelectItem[]>this.FESysCodeAddress
      .find(data => data.value === event.value).Items
    ) : dropdown.clear(null);


  //二擇一驗證
  VaildPhoneNumber() {
    if
      (this.modifyUserDataForm.controls.ContactPhoneNumber.valid === true &&
      this.modifyUserDataForm.controls.ContactPhoneNumber.value !== null) {
      this.Vaild = 1
      console.log('this 1')
    } else if
      (this.modifyUserDataForm.controls.ContactMobilePhone.valid === true &&
      this.modifyUserDataForm.controls.ContactMobilePhone.value !== null
    ) {
      this.Vaild = 2
      console.log('this 2')
    } else {
      this.Vaild = 3
      console.log('this 3')
    }
    switch (this.Vaild) {
      case 1: {
        this.modifyUserDataForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
        this.modifyUserDataForm.controls.ContactMobilePhone.setValidators(Validators.pattern(/^[0-9]{4}-[0-9]{6}/));
        break;
      }
      case 2: {
        this.modifyUserDataForm.controls.ContactPhoneNumber.setValidators(Validators.pattern(/^[0-9]{2}-[0-9]{7}/));
        this.modifyUserDataForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
        break;
      }
      case 3: {
        this.modifyUserDataForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
        this.modifyUserDataForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
        break;
      }
    }
    //更新驗證
    this.modifyUserDataForm.get('ContactMobilePhone').updateValueAndValidity()
    this.modifyUserDataForm.get('ContactPhoneNumber').updateValueAndValidity()
  }

  //二擇一驗證
  VaildMobilePhone() {
    if
      (this.modifyUserDataForm.controls.ContactMobilePhone.valid === true &&
      this.modifyUserDataForm.controls.ContactMobilePhone.value !== null
    ) {
      this.Vaild = 2
      console.log('this 2')
    } else if
      (this.modifyUserDataForm.controls.ContactPhoneNumber.valid === true &&
      this.modifyUserDataForm.controls.ContactPhoneNumber.value !== null
    ) {
      this.Vaild = 1
      console.log('this 1')
    } else {
      this.Vaild = 3
      console.log('this 3')
    }
    switch (this.Vaild) {
      case 1: {
        this.modifyUserDataForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
        this.modifyUserDataForm.controls.ContactMobilePhone.setValidators(Validators.pattern(/^[0-9]{4}-[0-9]{6}/));
        break;
      }
      case 2: {
        this.modifyUserDataForm.controls.ContactPhoneNumber.setValidators(Validators.pattern(/^[0-9]{2}-[0-9]{7}/));
        this.modifyUserDataForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
        break;
      }
      case 3: {
        this.modifyUserDataForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
        this.modifyUserDataForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
        break;
      }
    }
    //更新驗證
    this.modifyUserDataForm.get('ContactMobilePhone').updateValueAndValidity()
    this.modifyUserDataForm.get('ContactPhoneNumber').updateValueAndValidity()
  }


  // 複製欄位置換
  pasteCurAddress(e, formGroup: FormGroup) {
    let patchValue: object = {};
    if (e.checked) {
      patchValue['MailingZipCode'] = this.modifyUserDataForm.controls.BillingZipCode.value;
      patchValue['MailingCity'] = this.modifyUserDataForm.controls.BillingCity.value;
      this.MailingDistrict$ = of(<SelectItem[]>this.FESysCodeAddress
        .find(data => data.value === this.modifyUserDataForm.controls.BillingCity.value).Items
      )
      patchValue['MailingDistrict'] = this.modifyUserDataForm.controls.BillingDistrict.value;
      patchValue['MailingRoad'] = this.modifyUserDataForm.controls.BillingRoad.value;
    } else {
      patchValue['MailingZipCode'] = null;
      patchValue['MailingCity'] = null;
      patchValue['MailingDistrict'] = null;
      patchValue['MailingRoad'] = null;
    }
    formGroup.patchValue(patchValue)
    console.log(this.modifyUserDataForm.controls.BillingZipCode.value, '<= 複製欄位置換')
  }




  // 送出表單
  onSubmit() {
    this.progressSpinner = true

    let updateCusInfo = new CustomerDataImp();
    updateCusInfo.CustomerData = this.modifyUserDataForm.value;
    updateCusInfo.Attach = this.Attach.value;
    console.log(updateCusInfo, 'this is new UpUserData')
    // console.log(JSON.stringify(updateCusInfo), 'this is new UpUserData')
    if (this.modifyUserDataForm.valid) {
      this.RegisterService.getUpdateCorporate(updateCusInfo)
        .subscribe((data: ResponseLoginData) => {
          console.log(data, 'this is new UpUserData')
          // console.log(JSON.stringify(data), 'this is new UpUserData')
          if (data.code === '000') {
            // // 更新本地資料
            localStorage.setItem('UserData', JSON.stringify(data))
            // // 更新本地伺服器資料
            this.UserDataService.UserData = data;

            this.messageService.add({ severity: 'success', summary: '成功', detail: '會員資料修改成功' });
            // 延遲一秒回到上一頁
            setTimeout(() => {
              this.router.navigate(['/company/member-profile']);
              this.progressSpinner = false
            }, 1000)
          }
          else {
            this.messageService.add({ severity: 'error', summary: '失敗', detail: '請確認資料有無填寫正確' });
            this.progressSpinner = false
            $("html, body").animate({ scrollTop: 0 }, "slow");
          }
        })
    }
    else {
      this.messageService.add({ severity: 'error', summary: '失敗', detail: '尚有必填欄位未填' });
      this.progressSpinner = false
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }
  }

}
