import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { CorporateService } from '@app/core/services/Corporate.service';
import { UserDataService } from '@app/core/services/UserData.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeKey, ProvideEquip, Quote, QuoteinfoData, QuoteReplyLog, ResponseQuoteData, ResponseQuoteinfoData, WasteData, WasteDatainfo } from '@app/core/models/case';
import { MessageService } from 'primeng/api';
import { ResponseLoginData, ResponseObj } from '@app/core/models/user';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quotation-info',
  templateUrl: './quotation-info.component.html',
  styleUrls: ['./quotation-info.component.scss'],
  providers: [MessageService],
})
export class QuotationInfoComponent implements OnInit {

  but_status: string;
  Logbut_status: string;

  // 立即申請合約按鈕開關
  check_btn: boolean = false;
  // 回覆確認按鈕開關
  clickbtn: boolean = false;

  pencil_btn: boolean = true;
  // click2: boolean = false;
  // click4: boolean = false;
  // BTN_Click2: boolean = false;
  // BTN_Click4: boolean = false;

  items: MenuItem[];
  home: any;

  Code: string;
  ApplyDateTime: string;
  CorporateName: string;
  CareerType: string;
  CareerTypeName: string;
  CareerSubTypeName: string;
  ContactPerson: string;
  ContactPhoneNumber: string;
  ControlNumber: string;
  QuoteTypeName: string;
  QuoteDateTime: string;
  CollectFrequencyName: string;
  CollectWeekDayName: string;
  ApplyWasteType: string;
  ApplyWasteTypeName: string;
  ClearZipCode: string;
  ClearAddress: string;
  WasteStoragePlaceName: string;
  QuoteStatus: string;
  QuoteStatusName: string;
  QuoteReplyDateTime: string;
  PayMethodName: string;
  PayItemName: string;
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
  QuoteCompleteDateTime: string;

  IsAgreeSignFree: any;
  IsNeedRecord: any;

  QuoteReplyLogQuoteStatusName: string;
  ReplyDateTime: string;
  ReplyNote: string;

  ContactPhoneExtension: string;
  ContactMobilePhone: string;

  WasteDatainfo: WasteDatainfo[];
  ProvideEquip: ProvideEquip[];
  QuoteReplyLog: QuoteReplyLog[];

  WasteDataPrice: string;
  ProvideEquipPrice: string;
  MonthlyQty: string;

  ResponseQuoteinfoData: ResponseQuoteinfoData;
  QuoteinfoData: QuoteinfoData;
  CodeKey: CodeKey;

  progressSpinner: boolean;
  // User資料
  UserData: ResponseLoginData;

  status: string

  change_status_form: FormGroup;

  // NeedRecord : any
  // AgreeSignFree : any

  // @Input() QuoteId: string;

  constructor(
    protected router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder,
    // private route: ActivatedRoute,
    private location: Location,
    private CorporateService: CorporateService,
    private UserDataService: UserDataService,
  ) {
  }

  ngOnInit() {
    this.progressSpinner = true

    this.clickbtn = false
    console.log(this.clickbtn)

    this.UserData = JSON.parse(localStorage.getItem('UserData'))

    setTimeout(() => {
      // 從參數獲取Code估價單號
      this.activatedRoute.queryParams.subscribe(params => {
        this.CodeKey = {
          Code: params['id'],
          TaxIDNumber: this.UserData.body.TaxIDNumber,
        }
      });

      this.CorporateService.getQuoteDetai(this.CodeKey).subscribe((data: ResponseQuoteinfoData) => {
        this.QuoteinfoData = data.body
        this.UserDataService.QuoteinfoData = data.body
        // console.info(' this.QuoteinfoData :  ' , this.QuoteinfoData );
        this.ResponseQuoteinfoData = data;
        this.WasteDatainfo = data.body.WasteData
        this.ProvideEquip = data.body.ProvideEquip
        this.QuoteReplyLog = data.body.QuoteReplyLog

        console.log((this.ResponseQuoteinfoData))
        // console.log((this.QuoteinfoData))
        // console.log(JSON.stringify(this.QuoteinfoData), 'this is' + this.CodeKey.Code + 'QuoteData')

        if (data.code === '000') {
          // 依序載入資料
          this.status = this.QuoteinfoData.QuoteStatus
          this.Code = this.QuoteinfoData.Code;
          this.ApplyDateTime = this.QuoteinfoData.ApplyDateTime;
          this.CorporateName = this.QuoteinfoData.CorporateName;
          this.CareerType = this.QuoteinfoData.CareerType;
          this.CareerTypeName = this.QuoteinfoData.CareerTypeName;
          this.CareerSubTypeName = this.QuoteinfoData.CareerSubTypeName;
          this.ContactPerson = this.QuoteinfoData.ContactPerson;
          this.ContactPhoneNumber = this.QuoteinfoData.ContactPhoneNumber;
          this.ControlNumber = this.QuoteinfoData.ControlNumber;
          this.QuoteTypeName = this.QuoteinfoData.QuoteTypeName;
          this.QuoteDateTime = this.QuoteinfoData.QuoteDateTime;
          this.CollectFrequencyName = this.QuoteinfoData.CollectFrequencyName;
          this.CollectWeekDayName = this.QuoteinfoData.CollectWeekDayName;
          this.ApplyWasteType = this.QuoteinfoData.ApplyWasteType;
          this.ApplyWasteTypeName = this.QuoteinfoData.ApplyWasteTypeName;
          this.ClearZipCode = this.QuoteinfoData.ClearZipCode;
          this.ClearAddress = this.QuoteinfoData.ClearAddress;
          this.WasteStoragePlaceName = this.QuoteinfoData.WasteStoragePlaceName;
          this.QuoteStatusName = this.QuoteinfoData.QuoteStatusName;
          this.QuoteReplyDateTime = this.QuoteinfoData.QuoteReplyDateTime;
          this.QuoteCompleteDateTime = this.QuoteinfoData.QuoteCompleteDateTime;
          this.IsNeedRecord = this.QuoteinfoData.IsNeedRecord
          this.IsAgreeSignFree = this.QuoteinfoData.IsAgreeSignFree;
          this.PayMethodName = this.QuoteinfoData.PayMethodName;
          this.PayItemName = this.QuoteinfoData.PayItemName;
          this.AcceptableAmount = this.QuoteinfoData.AcceptableAmount;
          // 分機
          this.ContactPhoneExtension = this.QuoteinfoData.ContactPhoneExtension;
          // 聯絡人手機
          this.ContactMobilePhone = this.QuoteinfoData.ContactMobilePhone;

          this.but_status = this.QuoteinfoData.QuoteStatus


          switch (this.but_status) {
            case '1':
              {
                this.check_btn = false;
                this.pencil_btn = true;
                break;
              }
            case '2':
              {
                this.check_btn = false;
                this.pencil_btn = false;
                // this.clickbtn = false;
                break;
              }
            case '4':
              {
                this.check_btn = false;
                this.pencil_btn = false;
                // this.clickbtn = false;
                break;
              }
            case '5':
              {
                this.check_btn = true;
                this.pencil_btn = false;
                break;
              }
            default:
              {
                this.check_btn = false;
                this.pencil_btn = false;
                this.clickbtn = true;
              }
          }

          // 確認估價單並改變狀態
          this.change_status_form =
            this.fb.group({
              id: null,
              //報價單編號
              Code: null,
              //顧客統編
              CustomerId: this.UserData.body.TaxIDNumber,
              //顧客ID
              UP_UserId: this.UserData.body.UserId,
              //估價狀態
              QuoteStatus: null,
            });


          this.messageService.add({ severity: 'success', summary: '成功', detail: '估價單資料載入完畢' });

          this.progressSpinner = false;
        }
        else if (data.code === '401') {
          this.messageService.add({ severity: 'error', summary: '失敗', detail: '估價單號錯誤，3秒後將返回估價管理列表' });
          // 3秒後跳轉
          setTimeout(() => {
            this.router.navigateByUrl('/company/quotation');
          }, 3000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: '失敗', detail: '估價單資料取得失敗，3秒後將返回估價管理列表' });
          // 3秒後跳轉
          setTimeout(() => {
            this.router.navigateByUrl('/company/quotation');
          }, 3000);
        }

      })

    }, 500)


    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/company/order-progress' },
      { label: '估價管理列表', routerLink: '/company/quotation' },
      { label: '估價單資料' },
    ];

  }

  // 導向編輯頁面
  getQuotId() {
    // 帶參數導向網頁
    this.router.navigate(['/company/quotation/quotation-info/modify-quotation'], { queryParams: { id: this.Code } });
  }

  // 返回
  goBack(): void {
    this.location.back();
  }

  // 回覆確認
  onButtonClick() {
    this.progressSpinner = true
    this.change_status_form.value.QuoteStatus = this.QuoteinfoData.QuoteStatus
    this.change_status_form.value.Code = this.QuoteinfoData.Code
    switch (this.but_status) {
      case '2': {
        this.change_status_form.value.QuoteStatus = '3'
        let updata: Quote = this.change_status_form.value
        this.CorporateService.addUpdateQuote(updata)
          .subscribe((data: ResponseObj) => {
            if (data.code == '000') {
              this.messageService.add({ severity: 'success', summary: '成功', detail: '估價地點時間，回覆確認成功' });
              setTimeout(() => {
                window.location.reload();
              }, 800);
            }
            else {
              this.messageService.add({ severity: 'error', summary: '失敗', detail: '估價回覆確認失敗' });
              setTimeout(() => {
                window.location.reload();
              }, 800);
            }
          })
        this.clickbtn = false;
        console.log(updata)
        break;
      }
      case '4': {
        this.change_status_form.value.QuoteStatus = '5'
        let updata: Quote = this.change_status_form.value
        this.CorporateService.addUpdateQuote(updata)
          .subscribe((data: ResponseObj) => {
            if (data.code == '000') {
              this.messageService.add({ severity: 'success', summary: '成功', detail: '估價地點時間，回覆確認成功' });
              setTimeout(() => {
                window.location.reload();
              }, 800);
            }
            else {
              this.messageService.add({ severity: 'error', summary: '失敗', detail: '估價回覆確認失敗' });
              setTimeout(() => {
                window.location.reload();
              }, 800);
            }
          })
        this.clickbtn = false;
        console.log(updata)
        break;
      }
      default: {
        this.clickbtn = true;
        window.location.reload();
        this.progressSpinner = false
        break;
      }
    }
  }

  // 申請合約
  CreateContract() {
    this.progressSpinner = true

    let updata: QuoteinfoData = this.QuoteinfoData
    this.CorporateService.CreateContract(updata)
      .subscribe((data: ResponseObj) => {
        if (data.code == '000') {
          this.messageService.add({ severity: 'success', summary: '成功', detail: '申請送出成功，等待平台建立合約，3秒後將回到估價列表' });
          setTimeout(() => {
            this.router.navigateByUrl('/company/quotation');
            this.progressSpinner = false
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: '失敗', detail: '申請送出失敗，請確認估價資料或者網路連線是否正常' });
          setTimeout(() => {
            window.location.reload();
            this.progressSpinner = false
          }, 2000);
        }
      })

  }

}
