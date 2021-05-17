import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Location } from '@angular/common';
// -------------載用彈窗-------------
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
// -------------訊息提示-------------
import { MessageService } from 'primeng/api';
import { ResponseObj } from '@app/core/models/user';
// -------------API-------------
import { LoginService } from '@app/core/services/Login.service.ts';

@Component({
  selector: 'app-forget-password',
  templateUrl: './ForgetPassword.component.html',
  styleUrls: ['./ForgetPassword.component.scss'],
  providers: [
    MessageService
  ],
})
export class ForgetPasswordComponent implements OnInit {

  ForgetPasswordForm: FormGroup;
  UserId: string;
  Email: string;

  progressSpinner: boolean;

  constructor(
    private location: Location,
    private messageService: MessageService,
    public refForgetPassword: DynamicDialogRef,
    private LoginService: LoginService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.ForgetPasswordForm =
      this.fb.group({
        //聯絡人號碼
        UserId: [null, [Validators.required, Validators.minLength(8)]],
        //聯絡信箱
        Email: [null, [Validators.email, Validators.required]],
      });
  }

  // 返回
  goBack(): void {
    this.location.back();
  }
  // 關閉彈窗
  ngOnDestroy() {
    if (this.refForgetPassword) {
      this.refForgetPassword.close();
    }
  }

  // 提交忘記密碼
  onSubmit() {
    this.progressSpinner = true
    let FormData = this.ForgetPasswordForm.value
    if (this.ForgetPasswordForm.valid) {
      this.LoginService.submitForgetPassword(FormData)
        .subscribe((data: ResponseObj) => {
          if (data.code === '000') {
            this.messageService.add({ severity: 'success', summary: '成功', detail: '送出成功，請等候系統寄信' });
            setTimeout(() => {
              this.refForgetPassword.close();
              $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 2000);
            this.progressSpinner = false
          }
          else if (data.code === '110') {
            this.messageService.add({ severity: 'error', summary: '失敗', detail: '請確認帳號或信箱是否正確' });
            $("html, body").animate({ scrollTop: 0 }, "slow");
            this.progressSpinner = false
          }
          else {
            this.messageService.add({ severity: 'error', summary: '失敗', detail: '送出失敗，請檢查網路或者其他原因' });
            $("html, body").animate({ scrollTop: 0 }, "slow");
            this.progressSpinner = false
          }
          console.log(data);
        })
    }
    else {
      this.messageService.add({ severity: 'error', summary: '失敗', detail: '送出失敗，請檢查網路或者其他原因' });
      $("html, body").animate({ scrollTop: 0 }, "slow");
      console.log(this.ForgetPasswordForm.valid, 'ForgetPasswordForm');
      this.progressSpinner = false
    }
  }

}
