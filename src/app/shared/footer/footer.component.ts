import { Component, OnInit } from '@angular/core';
// -------------載用彈窗-------------
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateContactComponent } from '@app/shared/my-dialog/CreateContact/CreateContact.component';
// ---------------------------------

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [
    DialogService
  ]
})
export class FooterComponent implements OnInit {

  constructor(
    // -------------載用彈窗-------------
    public dialogService: DialogService,
    // ---------------------------------
  ) { }

  refContact:DynamicDialogRef;

  ngOnInit() {
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
}
