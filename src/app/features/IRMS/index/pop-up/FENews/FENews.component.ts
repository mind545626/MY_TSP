import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

// -------------API伺服器頁面-------------
import { FENews } from '@app/services/TestTSP';
// import { TestTSPService } from '@app/core/services/TestTSP.service';
// ---------------------------------

import { Location } from '@angular/common';

// -------------載用彈窗-------------
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
// ---------------------------------


@Component({
  selector: 'app-FENews',
  templateUrl: './FENews.component.html',
  styleUrls: ['./FENews.component.scss']
})
export class FENewsComponent implements OnInit {

  FENews: FENews[];

  constructor(
    // -------------API伺服器頁面-------------
    // private MyTSPService: TestTSPService,
    public refFENews: DynamicDialogRef,
    public configFENews: DynamicDialogConfig,
    // ---------------------------------
    private location: Location,
  ) {
  }

  ngOnInit() {
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.refFENews) {
      this.refFENews.close();
    }
  }

}

