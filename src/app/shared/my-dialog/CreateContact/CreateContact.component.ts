import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FESysCode, ResponseObj } from '@app/core/models/user';
import { CreateContactUs } from '@app/core/models/case';
import { SelectItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { MessageService } from 'primeng/api';

import * as $ from 'jquery';

// -------------API伺服器頁面-------------
import { RegisterService } from '@app/core/services/Register.service';
import { TestIrmsService } from '@app/core/services/TestIrms.service';
// ---------------------------------

import { Location } from '@angular/common';

// -------------載用彈窗-------------
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
// ---------------------------------



@Component({
  selector: 'app-create-contact',
  templateUrl: './CreateContact.component.html',
  styleUrls: ['./CreateContact.component.scss'],
  providers: [MessageService],
})
export class CreateContactComponent implements OnInit {

  // FENews: FENews[];

  ContactType: string;
  ContactType$: Observable<SelectItem[]>;

  today: string;
  newContactForm: FormGroup;
  // 載入開關
  progressSpinner: boolean;
  ProgressSpinnerDlg


  constructor(
    private RegisterService: RegisterService,
    private messageService: MessageService,
    public refContact: DynamicDialogRef,
    public configContact: DynamicDialogConfig,
    private TestIrmsService: TestIrmsService,
    private location: Location,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    // 聯絡類型
    this.RegisterService.getSysCodeDropDown({ Type: "ContactType" }).subscribe((data: ResponseObj) => {
      if (data.code === "000") {
        this.ContactType$ = of(<SelectItem[]>data.body);
        console.log(this.ContactType$, 'this.ContactType$this.ContactType$')
      }
    })


    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })

    this.today = new Date().toLocaleString('zh-TW',
      {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
        hour12: false
      });
    // this.today = new Date().toLocaleString('zh-TW',{ hour12: false}).substr(0, 16);

    this.newContactForm =
      this.fb.group({
        //聯絡人
        ContactPerson: [null, [Validators.required, Validators.minLength(2), Validators.pattern("([^\x00-\x40\x5B-\x60\x7B-\x7F])+")]],
        //聯絡人號碼
        ContactPhoneNumber: [null, Validators.pattern(/^[0-9]{9,11}/)],
        //聯絡信箱
        ContactMail: [null, [Validators.email, Validators.required]],
        //聯絡內容
        Message: [null, [Validators.required, Validators.minLength(20)]],
        //驗收類型
        ContactType: null,
        //聯絡日期
        // ContactDate: [this.today],
      });
  }
  // 返回
  goBack(): void {
    this.location.back();
  }
  // 關閉彈窗
  ngOnDestroy() {
    if (this.refContact) {
      this.refContact.close();
    }
  }


  // 提交表單按鈕
  onSubmit() {
    this.progressSpinner = true
    let ContactData = this.newContactForm.value
    if (this.newContactForm.valid) {
      this.TestIrmsService.createContactUs(ContactData)
        .subscribe((data: ResponseObj) => {
          if (data.code === "000") {
            this.messageService.add({ severity: 'success', summary: '成功', detail: '送出成功，平台將盡快回覆您' });
            setTimeout(() => {
              this.refContact.close();
              this.progressSpinner = false
            }, 3000);
          }
          else {
            this.messageService.add({ severity: 'error', summary: '失敗', detail: '送出失敗，請檢查網路或者其他原因' });
            $("html, body").animate({ scrollTop: 0 }, "slow");
            this.progressSpinner = false
          }
        })
    }
    else {
      this.messageService.add({ severity: 'error', summary: '失敗', detail: '送出失敗，請檢查網路或者其他原因' });
      $("html, body").animate({ scrollTop: 0 }, "slow");
      console.log(this.newContactForm.controls.Message.valid, 'newContactForm');
      this.progressSpinner = false
    }
    console.log(ContactData);
  }
}




