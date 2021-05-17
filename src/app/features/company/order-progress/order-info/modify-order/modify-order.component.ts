import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ResponseLoginData, ResponseObj } from '@app/core/models/user';

import { Location } from '@angular/common';
import { MenuItem, SelectItem } from 'primeng/api';

import { Table } from 'primeng/table';
import { Observable, of, pipe } from 'rxjs';

import { RegisterService } from '@app/core/services/Register.service';
import { CorporateService } from '@app/core/services/Corporate.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { CodeKey, ContractCodeListData, ContractinfoData, ProvideEquip, ResponseContractinfoData, WasteDatainfo, CreateOrder } from '@app/core/models/case';


@Component({
  selector: 'app-modify-order',
  templateUrl: './modify-order.component.html',
  styleUrls: ['./modify-order.component.scss']
})
export class ModifyOrderComponent implements OnInit {

  items: MenuItem[];
  home

  // 登入資料
  UserData: ResponseLoginData

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
  TaxIDNumber: string;

  PhoneNumber: boolean = false;
  MobilePhone: boolean = false;

  // 載入開關
  progressSpinner: boolean;
  ProgressSpinnerDlg

  ModifyOrderDataForm: FormGroup;

  CodeKey: CodeKey;
  ContractCodeKey: CodeKey;

  // 載入合約列表
  ContractCodeList$: Observable<SelectItem[]>
  WasteCode$: Observable<SelectItem[]>

  // 合約資料
  ContractinfoData: ContractinfoData;
  ResponseContractinfoData: ResponseContractinfoData;
  WasteData: WasteDatainfo[];
  ProvideEquip: ProvideEquip[];

  // 合約欄位
  Code: string;
  QuoteCode: string;
  AcceptableAmount: string;
  ApplyDateTime: string;
  CareerType: string;
  CareerSubType: string;
  StartDateTime: string;
  EndDateTime: string;
  CollectFrequency: string;
  CollectWeekDay: string;
  ApplyWasteType: string;
  ApplyWasteTypeName: string;
  ContractStatus: string;
  ContractStatusName: string;
  ClearAddress: string;
  WasteStoragePlace: string;
  PayMethod: string;
  PayItem: string;
  WasteStatus: string;
  IsNeedRecord: any;
  IsAgreeSignFree: any;

  TotalPlace: number;

  //建立TSP_Order
  //  CreateOrder: CreateOrder;


  @ViewChild('dt', { static: false }) table: Table;

  constructor(
    private router: Router,
    private location: Location,
    private messageService: MessageService,
    private RegisterService: RegisterService,
    private CorporateService: CorporateService,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() {

    this.progressSpinner = true

    // 獲取登入資料
    this.UserData = JSON.parse(localStorage.getItem('UserData'))
    // 將登入資料顯示
    this.CorporateName = this.UserData.body.CorporateName
    this.CareerTypeDesc = this.UserData.body.CareerTypeDesc
    this.CareerSubTypeDesc = this.UserData.body.CareerSubTypeDesc
    this.ContactPerson = this.UserData.body.ContactPerson
    this.ContactPhoneNumber = this.UserData.body.ContactPhoneNumber
    this.ContactPhoneExtension = this.UserData.body.ContactPhoneExtension
    this.ContactMobilePhone = this.UserData.body.ContactMobilePhone
    this.ControlNumber = this.UserData.body.ControlNumber
    this.TaxIDNumber = this.UserData.body.TaxIDNumber
    if (this.ContactPhoneNumber !== null) {
      this.PhoneNumber = true
    }
    if (this.ContactMobilePhone !== null) {
      this.MobilePhone = true
    }

    // CodeKey的物件塞值
    this.CodeKey = {
      TaxIDNumber: this.UserData.body.TaxIDNumber,
      Code: null
    }


    // 取得單位的合約列表
    this.CorporateService.getContractCodeList(this.CodeKey).subscribe((data: ContractCodeListData) => {
      if (data.code === "000") {
        if (data.body !== null) {
          // 轉換ContractCode型別
          let newArray = data.body.map((dataList) => {
            return {
              label: dataList.ContractCode,
              value: dataList.ContractCode,
            }
          });
          // 將轉換的資料載進下拉選單
          this.ContractCodeList$ = of(<SelectItem[]>newArray);
          this.progressSpinner = false
        }
        else {
          this.messageService.add({ severity: 'error', summary: '載入失敗', detail: '請先與平台完成估價程序，並確認建立合約' });
          this.progressSpinner = false
        }
      }
      else {
        this.messageService.add({ severity: 'error', summary: '載入失敗', detail: '請確認連線是否正常' });
        this.progressSpinner = false
      }
    });

    this.ModifyOrderDataForm =
      this.fb.group({
        // 合約編號
        ContractCode: null,
        // 使用者ID
        UP_UserId: this.TaxIDNumber,
        // 提供設備
        ProvideEquip: this.fb.array([this.newProvideEquip()]),
        // 廢棄物代碼
        WasteCode: null,
        // 廢棄物數量
        MonthlyQty: [null, Validators.required],
        // 廢棄物列表內容
        WasteName: null,
        WasteStatus: this.WasteStatus,
        WasteStatusName: null,
        WasteUnitName: null,
        Price: null,

      });

    // 載入刪除設備(暫寫)
    this.removeAll()


    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/company/order-progress' },
      { label: 'TSP_Order管理列表', routerLink: '/company/order-progress' },
      { label: 'TSP_Order資料' },
      { label: '編輯TSP_Order' },
    ];

    // 重新計算價格
    this.totalPrice()

    this.progressSpinner = false

  }
  goBack(): void {
    this.location.back();
  }

  // 載入合約資料
  loadcontract() {
    this.progressSpinner = true

    this.ChangeIsNull()
    // 載入刪除設備(暫寫)
    this.removeAll()

    // 請求合約資料的需求欄位
    setTimeout(() => {
      this.ContractCodeKey = {
        TaxIDNumber: this.UserData.body.TaxIDNumber,
        Code: this.ModifyOrderDataForm.controls.ContractCode.value,
      }
      // console.log(this.ContractCodeKey ,'this.ContractCodeKey')
      if (this.ContractCodeKey.Code !== null) {
        setTimeout(() => {
          this.CorporateService.getContractDetail(this.ContractCodeKey).subscribe((data: ResponseContractinfoData) => {
            this.ContractinfoData = data.body;
            // console.info(' this.QuoteinfoData :  ' , this.QuoteinfoData );
            this.ResponseContractinfoData = data;
            this.WasteData = data.body.WasteData;
            this.ProvideEquip = data.body.ProvideEquip;

            console.log(this.ResponseContractinfoData, 'this.ResponseContractinfoData')

            if (data.code === '000') {
              this.TaxIDNumber = this.ContractinfoData.TaxIDNumber;
              this.CorporateName = this.ContractinfoData.CorporateName;
              this.ContactPerson = this.ContractinfoData.ContactPerson;
              this.ContactPhoneNumber = this.ContractinfoData.ContactPhoneNumber;
              this.ControlNumber = this.ContractinfoData.ControlNumber;
              // 分機
              this.ContactPhoneExtension = this.ContractinfoData.ContactPhoneExtension;
              // 聯絡人手機
              this.ContactMobilePhone = this.ContractinfoData.ContactMobilePhone;

              // 依序載入資料
              this.WasteData = this.ContractinfoData.WasteData;
              this.ProvideEquip = this.ContractinfoData.ProvideEquip;
              // this.Code = this.ContractinfoData.Code;
              // this.QuoteCode = this.ContractinfoData.QuoteCode;
              this.AcceptableAmount = this.ContractinfoData.AcceptableAmount;
              this.ApplyDateTime = this.ContractinfoData.ApplyDateTime;
              this.CareerType = this.ContractinfoData.CareerType;
              this.CareerSubType = this.ContractinfoData.CareerSubType;
              this.StartDateTime = this.ContractinfoData.StartDateTime;
              this.EndDateTime = this.ContractinfoData.EndDateTime;
              this.CollectFrequency = this.ContractinfoData.CollectFrequency;
              this.CollectWeekDay = this.ContractinfoData.CollectWeekDay;
              this.ApplyWasteType = this.ContractinfoData.ApplyWasteType;
              this.ApplyWasteTypeName = this.ContractinfoData.ApplyWasteTypeName;
              this.ContractStatus = this.ContractinfoData.ContractStatus;
              this.ContractStatusName = this.ContractinfoData.ContractStatusName;
              this.ClearAddress = this.ContractinfoData.ClearAddress;
              this.WasteStoragePlace = this.ContractinfoData.WasteStoragePlace;
              this.PayMethod = this.ContractinfoData.PayMethod;
              this.PayItem = this.ContractinfoData.PayItem;
              this.IsNeedRecord = this.ContractinfoData.IsNeedRecord;
              this.IsAgreeSignFree = this.ContractinfoData.IsAgreeSignFree;

              // 依照array載入欄位
              const dataFormGroup = this.ProvideEquip.map(data => this.fb.group(data))
              const dataFormArray = this.fb.array(dataFormGroup)
              this.ModifyOrderDataForm.setControl('ProvideEquip', dataFormArray);

              // console.log(dataFormGroup)
              // console.log(dataFormArray)
              // console.log(this.WasteData, 'this.WasteData')

              // 轉換WasteData型別
              let newArray = this.WasteData.map((dataList) => {
                return {
                  label: dataList.WasteCode,
                  value: dataList.WasteCode,
                }
              });

              // 將轉換的資料載進下拉選單
              this.WasteCode$ = of(<SelectItem[]>newArray);
              // 重新計算價格
              this.totalPrice()

              this.progressSpinner = false
              this.messageService.add({ severity: 'success', summary: '成功', detail: '合約資料載入完畢' });
            }
            else {
              this.messageService.add({ severity: 'error', summary: '載入失敗', detail: '請確認連線是否正常' });
              this.progressSpinner = false
            }
          })
        }, 500)
      }
      else {
        this.messageService.add({ severity: 'error', summary: '載入失敗', detail: '請選擇合約' });
        this.progressSpinner = false
      }

    }, 200);

  }

  ChangeIsNull() {
    // this.TaxIDNumber = null;
    this.CorporateName = null;
    this.ContactPerson = null;
    this.ContactPhoneNumber = null;
    this.ControlNumber = null;
    this.ContactPhoneExtension = null;
    this.ContactMobilePhone = null;

    this.Code = null;
    this.QuoteCode = null;
    this.AcceptableAmount = null;
    this.ApplyDateTime = null;
    this.CareerType = null;
    this.CareerSubType = null;
    this.StartDateTime = null;
    this.EndDateTime = null;
    this.CollectFrequency = null;
    this.CollectWeekDay = null;
    this.ApplyWasteType = null;
    this.ApplyWasteTypeName = null;
    this.ContractStatus = null;
    this.ContractStatusName = null;
    this.ClearAddress = null;
    this.WasteStoragePlace = null;
    this.PayMethod = null;
    this.PayItem = null;
    this.IsNeedRecord = null;
    this.IsAgreeSignFree = null;

    this.WasteData = null;
    this.ProvideEquip = null;

    this.removeAll()

    this.totalPrice()
  }



  // 提供設備FormArray
  ProvideEquipData(): FormArray {
    return this.ModifyOrderDataForm.get('ProvideEquip') as FormArray;
  }
  newProvideEquip(): FormGroup {
    return this.fb.group({
      QuoteProvideEquip: '',
      QuoteProvideEquipName: '',
      Qty: '',
      Price: '',
    })
  }
  addProvideEquipForm() {
    (this.ModifyOrderDataForm.get('ProvideEquip') as FormArray).push(this.newProvideEquip());
  }
  removeContact(No: number): void {
    (this.ModifyOrderDataForm.get('ProvideEquip') as FormArray).removeAt(No);
    // 重新計算價格
    this.totalPrice()
  }
  // 全部刪除
  removeAll(): void {
    const formArray = (this.ModifyOrderDataForm.get('ProvideEquip') as FormArray);
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  // 依照代碼載入對應資料
  ChangeWasteCode(event) {
    if (this.ModifyOrderDataForm.value.WasteCode !== null) {
      var WasteCodeArray = this.ModifyOrderDataForm.value.WasteCode
      var GetSWasteCodeArray = this.WasteData.find((data) => data.WasteCode === WasteCodeArray)
      this.ModifyOrderDataForm.controls.WasteName.patchValue(GetSWasteCodeArray.WasteName)
      this.ModifyOrderDataForm.controls.WasteStatusName.patchValue(GetSWasteCodeArray.WasteStatusName)
      this.ModifyOrderDataForm.controls.MonthlyQty.patchValue(GetSWasteCodeArray.MonthlyQty)
      this.ModifyOrderDataForm.controls.WasteUnitName.patchValue(GetSWasteCodeArray.WasteUnitName)
      this.ModifyOrderDataForm.controls.Price.patchValue(GetSWasteCodeArray.Price)

      this.cantZore()

      this.ModifyOrderDataForm.value.WasteStatus = GetSWasteCodeArray.WasteStatus
      console.log(GetSWasteCodeArray.WasteStatus, 'GetSWasteCodeArray.WasteStatus 55555555')
      console.log(this.ModifyOrderDataForm, 'this.ModifyOrderDataForm55555555')
    }
    else {
      //若沒有選擇WasteCode 則清空資料
      this.ModifyOrderDataForm.controls.WasteName.patchValue(null);
      this.ModifyOrderDataForm.controls.WasteStatusName.patchValue(null);
      this.ModifyOrderDataForm.controls.MonthlyQty.patchValue(null);
      this.ModifyOrderDataForm.controls.WasteUnitName.patchValue(null);
      this.ModifyOrderDataForm.controls.Price.patchValue(null);
      this.ModifyOrderDataForm.value.WasteStatu = null
    }
  }

  totalPrice() {
    let ProvideEquipPrice: number = 0
    let ProvideEquiplength = this.ProvideEquipData().length
    let int1: number
    for (int1 = 0; int1 < ProvideEquiplength; int1++) {
      ProvideEquipPrice = ProvideEquipPrice + this.ModifyOrderDataForm.value.ProvideEquip[int1].Price
    }
    this.TotalPlace = this.ModifyOrderDataForm.controls.MonthlyQty.value * this.ModifyOrderDataForm.controls.Price.value + ProvideEquipPrice
  }

  onSubmit() {
    this.progressSpinner = true

    if (this.ModifyOrderDataForm.valid == true) {
      // this.CreateOrder = this.ModifyOrderDataForm.value;
      // console.log(this.CreateOrder, 'this.CreateOrder')
      // this.CorporateService.CreateOrderUrl(this.CreateOrder)
      //   .subscribe((data: ResponseObj) => {
      //     console.log(data, 'this is ResponseObj data')
      //     if (data.code === "000") {
      //       this.messageService.add({ severity: 'success', summary: '成功', detail: 'TSP_Order申請成功' });
      //       setTimeout(() => {
      //         this.router.navigateByUrl('/company/order-progress');
      //       }, 2000);
      //       this.progressSpinner = false
      //     }
      //     else {
      //       this.messageService.add({ severity: 'error', summary: '失敗', detail: 'TSP_Order申請失敗，請檢查連線是否正常' });
      //       $("html, body").animate({ scrollTop: 0 }, "slow");
      //       this.progressSpinner = false
      //     }
      //   })
    }
    else {
      this.messageService.add({ severity: 'error', summary: '失敗', detail: '尚有必填欄位未填' });
      $("html, body").animate({ scrollTop: 0 }, "slow");
      this.progressSpinner = false
    }
  }

  // 數量不可為0
  cantZore() {
    if (this.ModifyOrderDataForm.controls.MonthlyQty.value == 0) {
      this.ModifyOrderDataForm.controls.MonthlyQty.patchValue(1);
    }
  }


}
