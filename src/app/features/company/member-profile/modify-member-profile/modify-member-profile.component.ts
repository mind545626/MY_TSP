import { LoginData } from './../../../../core/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Injectable, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';

import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

import { LoginService } from '@app/core/services/Login.service';
import { UserDataService } from '@app/core/services/UserData.service';
import { Message, MessageService } from 'primeng/api';
import { Checkbox, Dropdown, InputText, SaveEditableRow, SelectItem } from "primeng";
import { Observable, of } from "rxjs";
import { RegisterService } from '@app/core/services/Register.service';
import { ResponseObj, FESysCode, FESysCode2Level, FESysCodeAddress, Key, ResponseLoginData } from '@app/core/models/user';

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

    this.items = [
      { icon: 'pi pi-home', label: '??????????????????', routerLink: '/company/order-progress' },
      { label: '??????????????????', routerLink: '/company/member-profile' },
      { label: '??????????????????' },
    ];

    this.modifyUserDataForm =
      this.fb.group({
        Id: this.TaxIDNumber,
        //??????????????????
        SellerType: "Seller",
        //????????????
        TaxIDNumber: [null, [Validators.required, Validators.minLength(8)]],
        //??????
        Password: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,12}\w*$/)]],
        //????????????
        SellerName: [null, [Validators.required, Validators.minLength(2), Validators.pattern("([^\x00-\x40\x5B-\x60\x7B-\x7F])+")]],
        //?????????
        Representative: [null, [Validators.required, Validators.minLength(2), Validators.pattern("([^\x00-\x40\x5B-\x60\x7B-\x7F])+")]],
        //????????????
        PhoneNumber: [null, [Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]],
        //????????????
        Fax: [null, Validators.pattern(/^[0-9]{2}-[0-9]{7}/)],
        //????????????-??????
        CareerType: [null],
        //????????????-??????
        CareerSubType: [null],
        //TPS_VIP_ID
        ControlNumber: [null, [Validators.required, Validators.minLength(1)]],
        //?????????
        ContactPerson: [null, [Validators.required, Validators.minLength(2), Validators.pattern("([^\x00-\x40\x5B-\x60\x7B-\x7F])+")]],
        //???????????????
        ContactPhoneNumber: [null, [Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{7,8}/)]],
        //???????????????
        ContactPhoneExtension: [null, Validators.pattern(/^[0-9]{2,}/)],
        //???????????????
        ContactMobilePhone: [null, [Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{6}/)]],
        //????????????
        ContactMail: [null, [Validators.email, Validators.required]],
        //????????????-????????????
        BillingZipCode: [null],
        //????????????-??????
        BillingCity: [null],
        //????????????-?????????
        BillingDistrict: [null],
        //????????????-???
        BillingRoad: [null],
        //????????????-????????????
        MailingZipCode: [null],
        //????????????-??????
        MailingCity: [null],
        //????????????-?????????
        MailingDistrict: [null],
        //????????????-???
        MailingRoad: [null, Validators.required],
        //????????????
        BackupMail: [null, [Validators.email, Validators.required]],
        //????????????
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

    // ?????????SelectItem??????????????????
    if (this.FESysCode2Level !== null &&
      this.FESysCodeAddress !== null) {
      // ????????????????????????????????????
      // ???????????????????????????
      setTimeout(() => {
        // this.RegisterData = data.body;
        // ???????????????????????????
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
        this.modifyUserDataForm.controls.SellerType.patchValue(this.UserData.body.SellerType)
        this.modifyUserDataForm.controls.TaxIDNumber.patchValue(this.UserData.body.TaxIDNumber)
        this.modifyUserDataForm.controls.Password.patchValue(this.UserData.body.Password)
        this.modifyUserDataForm.controls.SellerName.patchValue(this.UserData.body.SellerName)
        this.modifyUserDataForm.controls.Representative.patchValue(this.UserData.body.Representative)
        this.modifyUserDataForm.controls.PhoneNumber.patchValue(this.UserData.body.PhoneNumber)
        this.modifyUserDataForm.controls.Fax.patchValue(this.UserData.body.Fax)
        this.modifyUserDataForm.controls.ControlNumber.patchValue(this.UserData.body.ControlNumber)
        this.modifyUserDataForm.controls.ContactPerson.patchValue(this.UserData.body.ContactPerson)
        this.modifyUserDataForm.controls.ContactPhoneNumber.patchValue(this.UserData.body.ContactPhoneNumber)

        // ??????Modify ??????
        this.VaildPhoneNumber()
        this.modifyUserDataForm.controls.ContactPhoneExtension.patchValue(this.UserData.body.ContactPhoneExtension)
        this.modifyUserDataForm.controls.ContactMobilePhone.patchValue(this.UserData.body.ContactMobilePhone)
        // ??????Modify ??????
        this.VaildMobilePhone()
        setTimeout(() => {
          this.modifyUserDataForm.controls.ContactMail.patchValue(this.UserData.body.ContactMail)
          this.modifyUserDataForm.controls.BillingZipCode.patchValue(this.UserData.body.BillingZipCode)
          this.modifyUserDataForm.controls.BillingRoad.patchValue(this.UserData.body.BillingRoad)
          this.modifyUserDataForm.controls.MailingZipCode.patchValue(this.UserData.body.MailingZipCode)
          this.modifyUserDataForm.controls.MailingRoad.patchValue(this.UserData.body.MailingRoad)
          this.modifyUserDataForm.controls.BackupMail.patchValue(this.UserData.body.BackupMail)
        }, 200)
        // ??????????????????????????????????????????
        setTimeout(() => {
          this.modifyUserDataForm.controls.CareerSubType.patchValue(this.UserData.body.CareerSubType)
          this.modifyUserDataForm.controls.BillingDistrict.patchValue(this.UserData.body.BillingDistrict)
          this.modifyUserDataForm.controls.MailingDistrict.patchValue(this.UserData.body.MailingDistrict)
          console.log(this.modifyUserDataForm.value, 'this is RegisterData')
          this.progressSpinner = false
        }, 400)
      }, 1000)
    }

    console.log(this.progressSpinner, 'this.progressSpinner')

    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.tw = {
      /** ??????????????????0???????????? */
      firstDayOfWeek: 1,
      /** ???????????????????????? */
      dayNames: ["?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????"],
      /** ???????????????????????????????????????????????? */
      dayNamesShort: ["??????", "??????", "??????", "??????", "??????", "??????", "??????"],
      /** ???????????????????????? */
      dayNamesMin: ["???", "???", "???", "???", "???", "???", "???"],
      /** ???????????????????????? */
      monthNames: ["1???", "2???", "3???", "4???", "5???", "6???", "7???", "8???", "9???", "10???", "11???", "12???"],
      /** ????????????????????? */
      monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      today: '??????',
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


  //???????????????
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
    //????????????
    this.modifyUserDataForm.get('ContactMobilePhone').updateValueAndValidity()
    this.modifyUserDataForm.get('ContactPhoneNumber').updateValueAndValidity()
  }

  //???????????????
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
    //????????????
    this.modifyUserDataForm.get('ContactMobilePhone').updateValueAndValidity()
    this.modifyUserDataForm.get('ContactPhoneNumber').updateValueAndValidity()
  }


  // ??????????????????
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
    console.log(this.modifyUserDataForm.controls.BillingZipCode.value, '<= ??????????????????')
  }




  // ????????????
  onSubmit() {
    this.progressSpinner = true

    let updateCusInfo = new CustomerDataImp();
    updateCusInfo.CustomerData = this.modifyUserDataForm.value;
    updateCusInfo.Attach = this.Attach.value;
    console.log(updateCusInfo, 'this is new UpUserData')
    if (this.modifyUserDataForm.valid) {
      this.RegisterService.getUpdateSeller(updateCusInfo)
        .subscribe((data: ResponseLoginData) => {
          console.log(data, 'this is new UpUserData')
          if (data.code === '000') {
            // ??????????????????
            localStorage.setItem('UserData', JSON.stringify(data))
            // ???????????????????????????
            this.UserDataService.UserData = data;

            this.messageService.add({ severity: 'success', summary: '??????', detail: '????????????Modify ??????' });
            // ???????????????????????????
            setTimeout(() => {
              this.router.navigate(['/company/member-profile']);
              this.progressSpinner = false
            }, 1000)
          }
          else {
            this.messageService.add({ severity: 'error', summary: '??????', detail: '?????????????????????????????????' });
            this.progressSpinner = false
            $("html, body").animate({ scrollTop: 0 }, "slow");
          }
        })
    }
    else {
      this.messageService.add({ severity: 'error', summary: '??????', detail: '????????????????????????' });
      this.progressSpinner = false
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }
  }

}
