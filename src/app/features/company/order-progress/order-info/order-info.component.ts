import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { CodeKey, OrderinfoData, ProvideEquip, ResponseOrderinfoData, WasteDatainfo } from '@app/core/models/case';
import { ResponseLoginData } from '@app/core/models/user';
import { ActivatedRoute, Router } from '@angular/router';

import { SellerService } from '@app/core/services/Seller.service';
import { UserDataService } from '@app/core/services/UserData.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { FormBuilder } from '@angular/forms';

// 不符彈窗
import { CompletePhotoComponent } from './pop-up/complete-photo/complete-photo.component';
import { NotConfromPhotoComponent } from './pop-up/not-confrom-photo/not-confrom-photo.component';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
  providers: [
    DialogService,
    MessageService
  ]
})
export class OrderInfoComponent implements OnInit {

  items: MenuItem[];
  home: any;

  Code: string;
  ContractCode: string;
  ApplyDateTime: string;
  SellerName: string;
  CareerType: string;
  CareerSubType: string;
  ContactPerson: string;
  ContactPhoneNumber: string;
  ContactMobilePhone: string;
  ControlNumber: string;
  CarPlate: string;
  CollectFrequency: string;
  CollectWeekDay: string;
  ApplyWasteType: string;
  ApplyWasteTypeName: string;
  ClearAddress: string;
  WasteStoragePlace: string;
  ProcessStatus: string;
  ProcessStatusName: string;
  TransactionStatus: any;
  PaymentStatus: any;
  CompleteDateTime: string;
  EstimatedPrice: any;
  ActualPrice: any;
  //申請總價(EstimatePrice)
  ApplyTotalPrice: number;
  //實際總價(實際價格)
  ActualTotalPrice: number;
  CompletePic: string;
  PayMethod: string;
  PayItem: string;

  ProvideEquip: ProvideEquip[];
  // QuoteProvideEquip: string;
  // QuoteProvideEquipName: string;
  // ProvideEquipQty: any;
  // ProvideEquipPrice: any;

  IsAgreeSignFree: any;
  IsNeedRecord: any;
  WasteCode: string;
  WasteName: string;
  WasteStatus: string;
  MonthlyQty: any;
  WasteUnit: any;
  Price: any;
  ApplyQty: any;
  ActualQty: any;
  OrderNotConfromPhotoPaths: string[];
  OrderCompletePhotoPaths: string[];
  AcceptableAmount: any;

  ResponseOrderinfoData: ResponseOrderinfoData;
  OrderinfoData: OrderinfoData;
  CodeKey: CodeKey;

  pencil_btn: boolean = false;

  progressSpinner: boolean;
  ProgressSpinnerDlg

  // User資料
  UserData: ResponseLoginData;

  NotConfromPhotoPaths: DynamicDialogRef;
  CompletePhotoPaths: DynamicDialogRef;

  // 圖片資料
  NotConfrom: boolean;
  Complete: boolean;


  constructor(
    public dialogService: DialogService,
    private location: Location,
    protected router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder,
    private SellerService: SellerService,
    private UserDataService: UserDataService,
  ) {
    //   this.defaultColDef = {
    //     editable: true,
    //     sortable: true,
    //     floatingFilter: true,
    //     filter: true,
    //     suppressMenu: true,
    //     suppressSizeToFit: true,
    //     floatingFilterComponentParams: { suppressFilterButton: true },
    //   };
    //   this.columnDefs = [{}
    //   ];
    // }

    // Date1 = new FormControl((new Date('2020/09/02')).toISOString());
    /*-- grid響應式設定 START --*/
    // onFirstDataRendered(params) {
    //   params.api.sizeColumnsToFit();
    // }
    // onGridReady(params) {
    //   this.gridApi = params.api;
    //   this.gridColumnApi = params.columnApi;
    // }
    /*-- grid響應式設定 END --*/
  }
  ngOnInit() {

    this.progressSpinner = true

    this.UserData = JSON.parse(localStorage.getItem('UserData'))


    setTimeout(() => {
      // 從參數獲取CodeTPS_Deal單號
      this.activatedRoute.queryParams.subscribe(params => {
        this.CodeKey = {
          Code: params['id'],
          TaxIDNumber: this.UserData.body.TaxIDNumber,
        }
      });
      console.log(this.CodeKey, 'this.CodeKey ')

      this.SellerService.getOrderDetail(this.CodeKey).subscribe((data: ResponseOrderinfoData) => {
        this.OrderinfoData = data.body
        this.ResponseOrderinfoData = data;
        this.ProvideEquip = data.body.ProvideEquip
        console.log(this.OrderinfoData, 'this.OrderinfoData')
        if (data.code === '000') {
          // 依序載入資料
          this.Code = this.OrderinfoData.Code;
          this.ContractCode = this.OrderinfoData.ContractCode;
          this.ApplyDateTime = this.OrderinfoData.ApplyDateTime;
          // this.TaxIDNumber = this.OrderinfoData.TaxIDNumber;
          this.SellerName = this.OrderinfoData.SellerName;
          this.CareerType = this.OrderinfoData.CareerType;
          this.CareerSubType = this.OrderinfoData.CareerSubType;
          this.ContactPerson = this.OrderinfoData.ContactPerson;
          // 聯絡人手機
          this.ContactMobilePhone = this.OrderinfoData.ContactMobilePhone;
          this.ContactPhoneNumber = this.OrderinfoData.ContactPhoneNumber;
          this.ControlNumber = this.OrderinfoData.ControlNumber;
          this.CarPlate = this.OrderinfoData.CarPlate;
          this.CollectFrequency = this.OrderinfoData.CollectFrequency;
          this.CollectWeekDay = this.OrderinfoData.CollectWeekDay;
          this.ApplyWasteType = this.OrderinfoData.ApplyWasteType;
          this.ApplyWasteTypeName = this.OrderinfoData.ApplyWasteTypeName;
          // this.ContractStatus = this.OrderinfoData.ContractStatus;
          // this.ContractStatusName = this.OrderinfoData.ContractStatusName;
          this.ClearAddress = this.OrderinfoData.ClearAddress;
          this.WasteStoragePlace = this.OrderinfoData.WasteStoragePlace;
          this.ProcessStatus = this.OrderinfoData.ProcessStatus
          this.ProcessStatusName = this.OrderinfoData.ProcessStatusName
          this.TransactionStatus = this.OrderinfoData.TransactionStatus;
          this.PaymentStatus = this.OrderinfoData.PaymentStatus;
          this.CompleteDateTime = this.OrderinfoData.CompleteDateTime;
          this.PayMethod = this.OrderinfoData.PayMethod;
          this.CompletePic = this.OrderinfoData.CompletePic;
          this.PayItem = this.OrderinfoData.PayItem;

          this.IsAgreeSignFree = this.OrderinfoData.IsAgreeSignFree;
          this.IsNeedRecord = this.OrderinfoData.IsNeedRecord;

          this.WasteCode = this.OrderinfoData.WasteCode;
          this.WasteName = this.OrderinfoData.WasteName;
          this.WasteStatus = this.OrderinfoData.WasteStatus;
          this.WasteUnit = this.OrderinfoData.WasteUnit;
          // any
          this.AcceptableAmount = this.OrderinfoData.AcceptableAmount;
          this.EstimatedPrice = this.OrderinfoData.EstimatedPrice;
          this.ActualPrice = this.OrderinfoData.ActualPrice;
          this.MonthlyQty = this.OrderinfoData.MonthlyQty;
          this.Price = this.OrderinfoData.Price;
          this.ApplyQty = this.OrderinfoData.ApplyQty;
          this.ActualQty = this.OrderinfoData.ActualQty;
          //預估總價(EstimatePrice)
          this.ApplyTotalPrice = this.OrderinfoData.ApplyTotalPrice;
          //實際總價(實際價格)
          this.ActualTotalPrice = this.OrderinfoData.ActualTotalPrice;
          // 不符合照片
          this.OrderNotConfromPhotoPaths = this.OrderinfoData.OrderNotConfromPhotoPaths;
          // 完成照片
          this.OrderCompletePhotoPaths = this.OrderinfoData.OrderCompletePhotoPaths;

          this.ProvideEquip = this.OrderinfoData.ProvideEquip

          // 關閉編輯TSP_Order
          // if (this.OrderinfoData.ProcessStatus !== '1') {
          //   this.pencil_btn = false;
          // }

          // 不符照片欄位顯示
          if (this.OrderNotConfromPhotoPaths == null) {
            this.NotConfrom = false
          }
          else {
            this.NotConfrom = true
          }
          // 完成照片欄位顯示
          if (this.OrderCompletePhotoPaths == null) {
            this.Complete = false
          }
          else {
            this.Complete = true
          }

          //顯示訊息
          this.messageService.add({ severity: 'success', summary: '成功', detail: 'TSP_Quotation資料載入完畢' });

          this.progressSpinner = false
        }
      })

    }, 500)

    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/company/order-progress' },
      { label: 'TSP_Order管理_List', routerLink: '/company/order-progress' },
      { label: 'TSP_Order資料' },
    ];

  }
  goBack(): void {
    this.location.back();
  }

  // Get TPS_Deal
  getContractId() {
    // 帶參數導向
    this.router.navigate(['/company/contract/contract-info'], { queryParams: { id: this.ContractCode } });
  }

  getOrderId() {
    // this.UserDataService.QuoteID = this.order[i].Code
    // 帶參數導向網頁
    this.router.navigate(['/company/order-progress/order-info/modify-order'], { queryParams: { id: this.Code } });
  }



  showCompletephoto() {
    this.CompletePhotoPaths = this.dialogService.open(CompletePhotoComponent, {
      header: '完成圖片',
      width: '70%',
      data: this.OrderCompletePhotoPaths,
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    // this.NotConfromPhotoPaths.onClose.subscribe((product: Product) => {
    //   if (product) {
    //     this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
    //   }
    // });
  }


  showNotConfromphoto() {
    this.NotConfromPhotoPaths = this.dialogService.open(NotConfromPhotoComponent, {
      header: '不符圖片',
      width: '70%',
      data: this.OrderNotConfromPhotoPaths,
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
  }
  // ngOnDestroy() {
  //   if (this.NotConfromPhotoPaths) {
  //     this.NotConfromPhotoPaths.close();
  //   }
  // }
}
