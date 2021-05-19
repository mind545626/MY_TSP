import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpClientService } from "@app/core/services/HttpClientService";

// -------------API伺服器頁面-------------
import { FEBillboard } from '@app/services/TestTSP';
import { FileList } from '@app/core/models/user';
import { UrlService } from "@app/core/services/Url.service";
// ---------------------------------

import { Location } from '@angular/common';

import { saveAs } from 'file-saver';

// -------------載用彈窗-------------
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
// ---------------------------------


@Component({
  selector: 'app-FEBillboard',
  templateUrl: 'FEBillboard.component.html',
  styleUrls: ['./FEBillboard.component.scss'],
})
export class FEBillboardComponent implements OnInit {

  FEBillboard: FEBillboard[];
  FileList: FileList[];
  downloadUrl: string;


  constructor(
    protected router: Router,
    private httpService: HttpClientService,
    // -------------API伺服器頁面-------------
    // private MyTSPService: TestTSPService,
    // private route: ActivatedRoute,
    public refFEBillboard: DynamicDialogRef,
    public configFEBillboard: DynamicDialogConfig,
    // ---------------------------------
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.getUrl()
    this.FileList = this.configFEBillboard.data.FileList;

    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.refFEBillboard) {
      this.refFEBillboard.close();
    }
  }

  // downloadProduct(i) {
  //   const GetUrl = this.downloadUrl
  //   const pdfUrl = this.FileList[i].FilePath;
  //   const pdfName = this.FileList[i].FileName;
  //  saveAs(GetUrl + pdfUrl, pdfName);
  //   console.log(GetUrl + pdfUrl, pdfName)
  //   // this.router.navigate([this.FileList[i].FilePath]);
  //   // importedSaveAs(this.FileList[i].FilePath);
  // }


  getUrl() {
    if (window.location.href.indexOf("220.134.112.17") != -1) {   //外網
      this.downloadUrl = "http://220.134.112.174:8011"
    } else {   //內網
      this.downloadUrl = "http://192.168.89.17:8011"
    }
    //console.info(' url ' , this.Url+this.router.url);
    return this.downloadUrl;
  }


}

