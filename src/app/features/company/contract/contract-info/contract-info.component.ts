import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { CodeKey, ContractinfoData, ProvideEquip, ResponseContractinfoData, WasteDatainfo } from '@app/core/models/case';
import { SellerService } from '@app/core/services/Seller.service';
import { UserDataService } from '@app/core/services/UserData.service';
import { MessageService } from 'primeng/api';
import { ResponseLoginData } from '@app/core/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contract-info',
  templateUrl: './contract-info.component.html',
  styleUrls: ['./contract-info.component.scss'],
  providers: [MessageService],
})
export class ContractInfoComponent implements OnInit {

  items: MenuItem[];
  home: any;


  Code: string;
  QuoteCode: string;
  ApplyDateTime: string;
  SellerName: string;
  TaxIDNumber: string;
  CareerType: string;
  CareerSubType: string;
  ContactPerson: string;
  ContactPhoneNumber: string;
  ControlNumber: string;
  QuoteTypeName: string;
  QuoteDateTime: string;
  CollectFrequencyName: string;
  CollectWeekDayName: string;
  ApplyWasteType: string;
  ApplyWasteTypeName: string;
  StartDateTime: string;
  EndDateTime: string;
  CollectFrequency: string;
  CollectWeekDay: string;
  WasteStoragePlace: string;

  ClearAddress: string;
  WasteStoragePlaceName: string;
  ContractStatus: string;
  ContractStatusName: string
  PayMethod: string;
  PayItem: string;
  AcceptableAmount: string;

  QuoteProvideEquip: string;
  Price: string;
  Qty: string;
  WasteCode: string;
  WasteName: string;
  WasteStatus: string;
  WasteStatusName: string;
  WasteUnit: string;
  WasteUnitName: string;

  IsAgreeSignFree: any;
  IsNeedRecord: any;

  ContactPhoneExtension: string;
  ContactMobilePhone: string;

  WasteDatainfo: WasteDatainfo[];
  ProvideEquip: ProvideEquip[];

  WasteDataPrice: string;
  ProvideEquipPrice: string;
  MonthlyQty: string;

  ResponseContractinfoData: ResponseContractinfoData;
  ContractinfoData: ContractinfoData;
  CodeKey: CodeKey;

  progressSpinner: boolean;
  ProgressSpinnerDlg

  // User??????
  UserData: ResponseLoginData;


  constructor(
    private location: Location,
    protected router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder,
    private SellerService: SellerService,
    private UserDataService: UserDataService,
  ) {
  }

  ngOnInit() {

    this.progressSpinner = true

    this.UserData = JSON.parse(localStorage.getItem('UserData'))

    setTimeout(() => {
      // ???????????????CodeTPS_Deal??????
      this.activatedRoute.queryParams.subscribe(params => {
        this.CodeKey = {
          Code: params['id'],
          TaxIDNumber: this.UserData.body.TaxIDNumber,
        }
      });


      this.SellerService.getContractDetail(this.CodeKey).subscribe((data: ResponseContractinfoData) => {
        this.ContractinfoData = data.body
        // console.info(' this.QuoteinfoData :  ' , this.QuoteinfoData );
        this.ResponseContractinfoData = data;
        this.WasteDatainfo = data.body.WasteData
        this.ProvideEquip = data.body.ProvideEquip
        console.log((this.ResponseContractinfoData))
        // console.log((this.QuoteinfoData))
        // console.log(JSON.stringify(this.QuoteinfoData), 'this is' + this.CodeKey.Code + 'QuoteData')

        if (data.code === '000') {
          // ??????????????????
          // this.status = this.ContractinfoData.QuoteStatus
          this.Code = this.ContractinfoData.Code;
          this.QuoteCode = this.ContractinfoData.QuoteCode;
          this.AcceptableAmount = this.ContractinfoData.AcceptableAmount;
          this.ApplyDateTime = this.ContractinfoData.ApplyDateTime;
          this.TaxIDNumber = this.ContractinfoData.TaxIDNumber;
          this.SellerName = this.ContractinfoData.SellerName;
          this.CareerType = this.ContractinfoData.CareerType;
          this.CareerSubType = this.ContractinfoData.CareerSubType;
          this.ContactPerson = this.ContractinfoData.ContactPerson;
          this.ContactPhoneNumber = this.ContractinfoData.ContactPhoneNumber;
          this.ControlNumber = this.ContractinfoData.ControlNumber;
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
          this.IsNeedRecord = this.ContractinfoData.IsNeedRecord
          this.IsAgreeSignFree = this.ContractinfoData.IsAgreeSignFree;
          // ??????
          this.ContactPhoneExtension = this.ContractinfoData.ContactPhoneExtension;
          // ???????????????
          this.ContactMobilePhone = this.ContractinfoData.ContactMobilePhone;

          this.progressSpinner = false
          this.messageService.add({ severity: 'success', summary: '??????', detail: 'TSP_Quotation??????????????????' });
        }
      })

    }, 500)



    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '??????????????????', routerLink: '/company/order-progress' },
      { label: 'TPS_Deal??????_List', routerLink: '/company/contract' },
      { label: 'TPS_Deal??????' },
    ];


    // this.progressSpinner = false
  }

  goBack(): void {
    this.location.back();
  }

  // Get TSP_Quotation??????
  getQuotId() {
    // this.UserDataService.QuoteID = this.quotation[i].Code
    // ?????????????????????
    this.router.navigate(['/company/quotation/quotation-info'], { queryParams: { id: this.QuoteCode } });
  }
}
