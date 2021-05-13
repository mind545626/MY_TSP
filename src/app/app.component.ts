import { Component } from '@angular/core';

import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // -------------載用彈窗-------------
  providers: [
    DialogService
  ]
  // ---------------------------------
})
export class AppComponent {
  title = 'IRMS';
  refContact: DynamicDialogRef;

  constructor(
    // -------------載用彈窗-------------
    public dialogService: DialogService,
    // ---------------------------------
  ) { }




}
