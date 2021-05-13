import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Injectable, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Checkbox, Dropdown, InputText, SaveEditableRow, SelectItem } from "primeng";
import { Observable, of } from "rxjs";
import { ResponseObj, FESysCode, FESysCode2Level, FESysCodeAddress } from '@app/core/models/user';
import { SysCode } from '@app/core/models/syscode';
import { map, shareReplay, switchMap, tap } from "rxjs/internal/operators";
import { Router } from '@angular/router';
import { Customer, CustomerDataImp, RegisterData } from '@app/core/models/case';

import { RegisterService } from '@app/core/services/Register.service';
import { Message, MessageService } from 'primeng/api';
import * as $ from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
  // 利用它來修改theme的mat-tab-label樣式
  encapsulation: ViewEncapsulation.None
})


@Injectable({
  providedIn: 'root',
})

export class RegisterComponent implements OnInit {

  Vaild:number;
  toCareerType: string;
  toCareerSubType: string;

  CareerType: FESysCode2Level[];

  tabIndex: number;

  FESysCode: FESysCode[];
  FESysCode2Level: FESysCode2Level[];
  FESysCodeAddress: FESysCodeAddress[];

  item: SelectItem[];
  // City: string;
  // District: Array<string>;

  CareerType$: Observable<SelectItem[]>;
  CareerSubType$: void | Observable<SelectItem[]>;
  // Industry: FESysCode2Level[];
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

  // initialCondition = {};

  newRegisterForm: FormGroup;


  Attach = this.fb.array([{
    FileName: "",
    FileBase64: "",
  }])

  Box = this.fb.group({
    ItisOK: [null]
  })


  TaxIDNumber: string;
  C: number;
  // this.complexForm = fb.group({
  //   // 表示一定要輸入
  //   'firstName' : [null, Validators.required],
  //   // 表示一定要輸入，而且最短為5個字元，最多為10個字元。有多個規則時用陣列包住。
  //   'lastName': [null,  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
  //   'gender' : [null, Validators.required],
  //   'hiking' : [false],
  // })

  // constructor(
  //   private MyIrmsService: TestIrmsService,
  //   private fb: FormBuilder,
  //   // -------------載用彈窗-------------
  //   public dialogService: DialogService,
  //   // ---------------------------------
  // ) { }

  constructor(
    protected router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
    private RegisterService: RegisterService,
  ) { }



  ngOnInit() {
    // console.info('t : ' + this.newRegisterForm.value.TaxIDNumber);
    // this.TaxIDNumber = '123';

    // this.item = this.FESysCode2Level.map(label => {
    //   return {
    //     label: label.label,
    //     value: label.value,
    //     Items: label.Items.map(i => ({ label: label.label, value: label.value }))
    //   };
    // });



    this.newRegisterForm =
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
      // console.log(data.body, 11122446);
    });

    this.RegisterService.getAddressDropDown().subscribe((data: ResponseObj) => {
      this.BillingCity$ = of(<SelectItem[]>data.body);
      this.MailingCity$ = of(<SelectItem[]>data.body);
      this.FESysCodeAddress = data.body;
      // console.log(this.District1$, 5557777)
    });


    // 原始寫法
    // this.RegisterService.getAddressDropDown([SysCode.City]).subscribe((data: ResponseObj) => {
    //    this.City$ = of(<SelectItem[]>data.body[SysCode.City]);
    // });


    // // 轉值寫法
    // this.RegisterService.getAddressDropDown([SysCode.City]).subscribe((data: ResponseObj) => {
    //   // 將api的值轉成SelectItem接受的label&value
    //   let newArray = data.body.map((object) => {
    //     return {
    //       label: object.City,
    //       value: object.City
    //     }
    //   });
    //   this.City1$ = of(<SelectItem[]>newArray);
    //   console.log(newArray, 88886666);
    //   // let newArray2 = data.body.map((object2) => {
    //   //   return {
    //   //     label: object2.District,
    //   //     value: object2.District
    //   //   }
    //   // });
    //   // this.District$ = of(<SelectItem[]>newArray2)
    //   // console.log(newArray2, 67776666);
    // });


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


    // if (this.newRegisterForm.get('ContactMobilePhone').value !== null) {
    //   this.newRegisterForm.controls["ContactPhoneNumber"].setValidators([Validators.pattern(/^[0-9]{2}-[0-9]{7}/)]);
    // }
    // else {
    //   this.newRegisterForm.controls["ContactPhoneNumber"].setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
    // }
    // this.newRegisterForm.get('ContactMobilePhone').setValidators
    //   ([Validators.pattern(/^[0-9]{2}-[0-9]{7}/), this.newRegisterForm.get('ContactMobilePhone').validator]),console.log(this.newRegisterForm.validator);
    // this.newRegisterForm.get('ContactPhoneNumber').setValidators
    //   ([Validators.pattern(/^[0-9]{2}-[0-9]{7}/), this.newRegisterForm.get('ContactMobilePhone').validator]);

    // this.newRegisterForm.controls.ContactPhoneNumber.validator( require : true) => {
    //   console.log('changed!')


  }

  // labelByValue = (event: any): FESysCode2Level | void => event.value
  //   .find(data => data.value === event.value).Items;


  onIndustryChange = (event: any, dropdown: Dropdown, CareerTypeObj: Dropdown): Observable<SelectItem[]> | void => event.value != null ? of(<SelectItem[]>this.FESysCode2Level
    .find(data => {
      this.toCareerType = CareerTypeObj.selectedOption.label;
      console.log(event, 423542525);
      return data.value === event.value;
    }
    ).Items) : dropdown.clear(null);



  CareerSubTypeChange(event: any, CareerTypeSubObj: Dropdown) {
    this.toCareerSubType = CareerTypeSubObj.selectedOption.label;
  }
  // Validators.required[Validators.pattern(/^[0-9]{2}-[0-9]{7}/)]


  // onIndustryChange(event: any, dropdown: Dropdown, dropdownObj: Dropdown) {
  //   this.test = dropdownObj.selectedOption.label;
  //   console.info('123 : '+this.test);
  // }
  /*
  = (event: any, dropdown: Dropdown): Observable<SelectItem[]> | void => event.value != null ?
    of(<SelectItem[]>this.FESysCode2Level
      .find(data =>data.value === event.value).Items
    ) : dropdown.clear(null);
  */


    // //檢查聯絡人手機是否為空
    // if (this.newRegisterForm.controls.ContactMobilePhone.value !== null) {
    //   if (this.newRegisterForm.controls.ContactMobilePhone.valid === true) {
    //     this.newRegisterForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
    //     this.newRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.pattern(/^[0-9]{2}-[0-9]{7}/)]);
    //   }
    //   else {
    //     this.newRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
    //   }
    // }
    // //檢查聯絡人電話是否為空
    // else if (this.newRegisterForm.controls.ContactPhoneNumber.value !== null) {
    //   if (this.newRegisterForm.controls.ContactPhoneNumber.valid === true) {
    //     this.newRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
    //     this.newRegisterForm.controls.ContactMobilePhone.setValidators([Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
    //   }
    //   else {
    //     this.newRegisterForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
    //   }
    // }

    //更新驗證


   //二擇一驗證
   VaildPhoneNumber(event) {
     console.info('ee --- ' ,  this.newRegisterForm.controls.ContactPhoneNumber);
    if
    (this.newRegisterForm.controls.ContactPhoneNumber.valid === true &&
     this.newRegisterForm.controls.ContactPhoneNumber.value !== null) {
      this.Vaild = 1
      console.log('this 1')
    } else if
    (this.newRegisterForm.controls.ContactMobilePhone.valid === true &&
     this.newRegisterForm.controls.ContactMobilePhone.value !== null
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
        this.newRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
        this.newRegisterForm.controls.ContactMobilePhone.setValidators(Validators.pattern(/^[0-9]{4}-[0-9]{6}/));
        break;
      }
      case 2: {
        this.newRegisterForm.controls.ContactPhoneNumber.setValidators(Validators.pattern(/^[0-9]{2}-[0-9]{7}/));
        this.newRegisterForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
        break;
      }
      case 3: {
        this.newRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
        this.newRegisterForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
        break;
      }
    }
    //更新驗證
    this.newRegisterForm.get('ContactMobilePhone').updateValueAndValidity()
    this.newRegisterForm.get('ContactPhoneNumber').updateValueAndValidity()
  }

  //二擇一驗證
  VaildMobilePhone() {
    if
    (this.newRegisterForm.controls.ContactMobilePhone.valid === true &&
     this.newRegisterForm.controls.ContactMobilePhone.value !== null
       ) {
      this.Vaild = 2
      console.log('this 2')
    } else if
    (this.newRegisterForm.controls.ContactPhoneNumber.valid === true &&
     this.newRegisterForm.controls.ContactPhoneNumber.value !== null
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
        this.newRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
        this.newRegisterForm.controls.ContactMobilePhone.setValidators(Validators.pattern(/^[0-9]{4}-[0-9]{6}/));
        break;
      }
      case 2: {
        this.newRegisterForm.controls.ContactPhoneNumber.setValidators(Validators.pattern(/^[0-9]{2}-[0-9]{7}/));
        this.newRegisterForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
        break;
      }
      case 3: {
        this.newRegisterForm.controls.ContactPhoneNumber.setValidators([Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]);
        this.newRegisterForm.controls.ContactMobilePhone.setValidators([Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]);
        break;
      }
    }
    //更新驗證
    this.newRegisterForm.get('ContactMobilePhone').updateValueAndValidity()
    this.newRegisterForm.get('ContactPhoneNumber').updateValueAndValidity()
  }



  onCityChange = (event: any, dropdown: Dropdown): Observable<SelectItem[]> | void => event.value != null ?
    of(<SelectItem[]>this.FESysCodeAddress
      .find(data => data.value === event.value).Items
    ) : dropdown.clear(null);

  // 有值沒有字
  // onCityChange = (event: any, dropdown: Dropdown): Observable<SelectItem[]> | void => event.value != null ?
  // of(<SelectItem[]>this.FESysCodeAddress
  //   .find( data => data ===  event.value ).District
  // ) : dropdown.clear(null);


  // onCityChange = (event: any, dropdown: Dropdown): Observable<SelectItem[]> | void => event.value != null ?
  //   .pipe(
  //     map(District => [{
  //       label: object.District,
  //       value: object.District
  //     }, District])
  //   ) : dropdown.clear(null)



  // 原始寫法
  // this.RegisterService.getAddressDropDown([SysCode.City]).subscribe((data: ResponseObj) => {
  //    this.City$ = of(<SelectItem[]>data.body[SysCode.City]);
  // });


  // 轉值寫法
  // this.RegisterService.getAddressDropDown([SysCode.City]).subscribe((data: ResponseObj) => {
  //   let newArray = data.body.map((object) => {
  //   return{
  //     label: object.City,
  //     value: object.City
  //   }});
  //    this.City$ = of(<SelectItem[]>newArray);
  // });


  // 複製欄位置換
  pasteCurAddress(e, formGroup: FormGroup) {
    let patchValue: object = {};
    if (e.checked) {
      patchValue['MailingZipCode'] = this.newRegisterForm.controls.BillingZipCode.value;
      patchValue['MailingCity'] = this.newRegisterForm.controls.BillingCity.value;
      this.MailingDistrict$ = of(<SelectItem[]>this.FESysCodeAddress
        .find(data => data.value === this.newRegisterForm.controls.BillingCity.value).Items
      )
      patchValue['MailingDistrict'] = this.newRegisterForm.controls.BillingDistrict.value;
      patchValue['MailingRoad'] = this.newRegisterForm.controls.BillingRoad.value;
    } else {
      patchValue['MailingZipCode'] = null;
      patchValue['MailingCity'] = null;
      patchValue['MailingDistrict'] = null;
      patchValue['MailingRoad'] = null;
    }
    formGroup.patchValue(patchValue)
    console.log(this.newRegisterForm.controls.BillingZipCode.value, '<= 複製欄位置換')
  }


  // NextTab() {
  //     if(this.Box.controls.ItisOK.value){
  //       this.tabIndex = this.tabIndex + 1
  //     }
  //     else
  //     {
  //       this.messageService.add({ severity: 'error', summary: '失敗', detail: '請確認是否已正確閱讀' });
  //     }
  //     console.log(this.Box.controls.ItisOK.value)
  // }


  // 下一步按鈕
  NextTab() {
    // let updateCusInfo = new CustomerDataImp();
    // updateCusInfo.CustomerData = this.newRegisterForm.value;
    // updateCusInfo.Attach = this.Attach.value;
    if (this.newRegisterForm.valid) {
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
    // console.log(updateCusInfo);
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
    updateCusInfo.CustomerData = this.newRegisterForm.value;
    updateCusInfo.Attach = this.Attach.value;
    if (this.newRegisterForm.valid) {
      this.RegisterService.addCreateCorporate(updateCusInfo)
        .subscribe((data: ResponseObj) => {
          this.tabIndex = this.tabIndex + 1
          this.messageService.add({ severity: 'success', summary: '成功', detail: '會員申請成功，平台審核中' });
        })
      // .subscribe(data => console.log(Response));
      // this.tabIndex = this.tabIndex + 1
      console.log(updateCusInfo);
      console.log(JSON.stringify(updateCusInfo));
    }
    else {
      this.messageService.add({ severity: 'error', summary: '失敗', detail: '尚有必填欄位未填' });
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    // let updateCusInfo = new CustomerDataImp();
    // updateCusInfo.CustomerData = this.newRegisterForm.value;
    // updateCusInfo.Attach = this.Attach.value;
    // if (this.newRegisterForm.valid) {
    //   this.RegisterService.addCreateCorporate(updateCusInfo)
    //   this.messageService.add({ severity: 'success', summary: '成功', detail: '資料上傳成功' });
    //   this.tabIndex = this.tabIndex + 1
    // }
    // else {
    //   this.messageService.add({ severity: 'error', summary: '失敗', detail: '尚有必填欄位未填' });
    //   $("html, body").animate({ scrollTop: 0 }, "slow");
    // }
    // console.log(updateCusInfo);
    // console.log(JSON.stringify(this.newRegisterForm.value));
  }

  // // 送出表單
  // onSubmit() {
  //   let updateCusInfo = new CustomerDataImp();
  //   updateCusInfo.CustomerData = this.newRegisterForm.value;
  //   updateCusInfo.Attach = this.Attach.value;
  //   if (this.newRegisterForm.valid) {
  //     this.RegisterService.addCreateCorporate(updateCusInfo)
  //     this.messageService.add({ severity: 'success', summary: '成功', detail: '資料上傳成功' });
  //     // .subscribe((data:ResponseObj) =>{
  //     // setTimeout(() => {
  //     //   window.location.reload();
  //     // }, 2000);
  //     //  })
  //     this.tabIndex = this.tabIndex + 1
  //   }
  //   else {
  //     this.messageService.add({ severity: 'error', summary: '失敗', detail: '尚有必填欄位未填' });
  //     $("html, body").animate({ scrollTop: 0 }, "slow");
  //   }
  //   console.log(updateCusInfo);
  //   console.log(JSON.stringify(this.newRegisterForm.value));
  // }

  // goForward(stepper: MatStepper){
  //   stepper.next();

  // onSubmit(){
  //   this.formSubmitAttempt = true;
  //   let updateCusInfo : CustInfoI =  this.customerForm.value;
  //   if (this.customerForm.valid) {
  //     this.customerService.updateCustInfo(this.customerid,updateCusInfo)
  //     .subscribe((data:ResponseObj) =>{
  //       this.messageService.add({severity:'success', summary:'成功', detail:'修改資料成功，畫面將在2秒後自動重新整理'});
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 2000);
  //    })
  //   }
  //   else {
  //     this.messageService.add({severity:'error', summary:'失敗', detail:'尚有必填欄位未填'});
  //     $("html, body").animate({ scrollTop: 0 }, "slow");
  //   }
  // }
}
