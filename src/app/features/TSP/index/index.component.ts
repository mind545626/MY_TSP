import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

import { Table } from 'primeng/table';

// -------------API伺服器頁面-------------
import { FileList } from '@app/core/models/user';
import { FEBillboard, FENews, BaseResult, FEBillboardDetail, FENewsDetail } from '@app/services/TestTSP';
import { TestTSPService } from '@app/core/services/TestTSP.service';
// ---------------------------------

// -------------載用彈窗-------------
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FEBillboardComponent } from '@app/features/TSP/index/pop-up/FEBillboard/FEBillboard.component';
import { FENewsComponent } from './pop-up/FENews/FENews.component';
import { CreateContactComponent } from '@app/shared/my-dialog/CreateContact/CreateContact.component';
// import { DynamicDialogConfig } from 'primeng/dynamicdialog';
// ---------------------------------


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  // -------------載用彈窗-------------
  providers: [
    DialogService
  ]
  // ---------------------------------
})


export class IndexComponent implements OnInit {

  //BaseResult: BaseResult<any>;
  FEBillboard: FEBillboard[];
  FEBillboardDetail: FEBillboardDetail[];
  FileList: FileList[];

  refFEBillboard: DynamicDialogRef;

  totalRecords: number;
  cols: any[];
  loading: boolean;



  FENews: FENews[];
  FENewsDetail: FENewsDetail[];

  refFENews: DynamicDialogRef;

  totalRecords2: number;
  cols2: any[];
  loading2: boolean;

  dataname: string;


  refContact:DynamicDialogRef;

  // datasource: FEBillboard[];

  // --原本假資料--
  // datasource: Notice[];
  // notice: Notice[];
  // datasource2: News[];
  // news: News[];

  // --預設--
  // datasource: Customer[];
  // customers: Customer[];

  @ViewChild('dt', { static: false }) table: Table;
  @ViewChild('dt1', { static: false }) table1: Table;

  constructor(
    private MyTSPService: TestTSPService,
    private fb: FormBuilder,
    // -------------載用彈窗-------------
    public dialogService: DialogService,
    public dialogService2: DialogService,
    // ---------------------------------
  ) { }


  ngOnInit() {

    $("html, body").animate({ scrollTop: 0 }, "slow");

   // 表一讀取時間動畫結束與欄位資料
    this.MyTSPService.getBaseResultToBillboard().subscribe(data =>
      {
        // console.log(data,'getBaseResultToBillboard');
        this.FEBillboard = data.body;
        // this.FileList = data.body.FileList
        // console.log(data.body.FileList,'this.FileList');
        if (data.body === null) {
          this.FEBillboard = []
      }
      this.totalRecords = this.FEBillboard.length;
    });

    // 原接法
    // this.getFEBillboard();
    // this.MyTSPService.getBaseResultToBillboard().then(data => {
    //   this.FEBillboard = data.body;
    //   if (data.body === null) {
    //     this.FEBillboard = []
    //   }
    //   this.totalRecords = this.FEBillboard.length;
    // });

    this.loading = true;

    this.cols = [
      // { field: 'IsTop', header: '置頂', width: '60px' },
      { field: 'Title', header: '公告標題', width: '250px' },
      { field: 'UP_DateTime', header: '發布時間', width: '100px' },
      { field: 'Function', header: '功能', width: '80px' },
    ];

    // 用虛擬伺服器的寫法
    // this.MyTSPService.getFEBillboard().then(data => {
    //   this.datasource = data;
    // });

    // 用假資料寫法
    // this.customerService.getNotice().then(data => {
    //   this.datasource = data;
    //   this.totalRecords = data.length;
    // });

    // this.customerService.getNews().then(data => {
    //   this.datasource2 = data;
    //   this.totalRecords2 = data.length;
    // });

    // 表二讀取時間動畫結束與欄位資料

    this.MyTSPService.getBaseResultToNews().subscribe(data =>
      {
        this.FENews = data.body;
        if (data.body === null) {
          this.FENews = []
      }
      this.totalRecords2 = this.FENews.length;
      console.log(data,'getBaseResultToNews');
    });


    this.loading2 = true;

    this.cols2 = [
      // { field: 'IsTop', header: '置頂', width: '60px' },
      { field: 'Title', header: '消息標題', width: '250px' },
      { field: 'UP_DateTime', header: '發布時間', width: '100px' },
      { field: 'Function', header: '功能', width: '80px' },
    ];

  }

  // 表一讀取時間動畫
  loadFEBillboard(event: LazyLoadEvent) {
    // this.loading = true;

    setTimeout(() => {
      if (this.FEBillboard) {
        this.FEBillboard = this.FEBillboard.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 500);
  }

  // 表二讀取時間動畫
  loadFENews(event: LazyLoadEvent) {
    // this.loading2 = true;

    setTimeout(() => {
      if (this.FENews) {
        this.FENews = this.FENews.slice(event.first, (event.first + event.rows));
        this.loading2 = false;
      }
    }, 500);
  }


  showBillboard(dataBillboard) {

    this.refFEBillboard = this.dialogService.open(FEBillboardComponent, {
      header: '系統公告' +'：'+ dataBillboard['Title'],
      width: '70%',
      data: dataBillboard['Detail'],
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
    });
    console.log(dataBillboard,'dataBillboard')
    // console.log(dataBillboard.Id, "2222222222222222222222222222")
  }


  showNews(dataNews) {
    this.refFENews = this.dialogService2.open(FENewsComponent, {
      // header: '網站消息',
      header: '網站消息' +'：'+ dataNews['Title'],
      width: '70%',
      data: dataNews['Detail'],
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
    });
    console.log(dataNews,'dataFENews')
  }


  showCreateContact() {
    this.refContact = this.dialogService.open(CreateContactComponent, {
      header: '聯絡我們',
      width: '70%',
      // data: Contact,
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
    });
    console.log('CreateContact')
  }

  // ngOnDestroy() {
  //   if (this.refFEBillboard) {
  //     this.refFEBillboard.close();
  //   }
  // }

  downloadProduct(i){

  }

}
