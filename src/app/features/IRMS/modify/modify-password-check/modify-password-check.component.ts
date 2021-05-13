import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Key, ResponseObj } from '@app/core/models/user';
import { MessageService } from 'primeng/api';
import { LoginService } from '@app/core/services/Login.service.ts';
import { newPassword } from '@app/core/models/case';

@Component({
  selector: 'app-modify-password-check',
  templateUrl: './modify-password-check.component.html',
  styleUrls: ['./modify-password-check.component.scss']
})
export class ModifyPasswordCheckComponent implements OnInit {

  Key: Key;
  modifypasswordForm: FormGroup;
  Password: string;
  confirmPassword: string;
  newPassword: newPassword;

    constructor(
      private LoginService: LoginService,
      private fb: FormBuilder,
      private messageService: MessageService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private location: Location,
    ) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.Key = {
          Id: params['id']
        }
      });
    }

ngOnInit() {
  this.modifypasswordForm =
    this.fb.group({
      Id: this.Key.Id,
      //密碼
      Password: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,12}\w*$/)]],
      //密碼確認
      confirmPassword: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,12}\w*$/)]]
    })


  this.LoginService.getForgetPasswordCheck(this.Key)
    .subscribe((data: ResponseObj) => {
      switch (data.code) {
        case '000': {
          console.log(data)
          this.messageService.add({ severity: 'success', summary: '成功', detail: '驗證通過，請更新您的密碼給我們' });
          break;
        }
        case '131': {
          this.messageService.add({ severity: 'error', summary: '失敗', detail: '驗證碼錯誤，3秒後將跳轉至登入頁面' });
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 3000);
          break;
        }
        case '132': {
          this.messageService.add({ severity: 'error', summary: '失敗', detail: '驗證失敗，您的驗證碼已經過期，請重新申請忘記密碼' });
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 3000);
          break;
        }
        case '133': {
          this.messageService.add({ severity: 'error', summary: '失敗', detail: '驗證失敗，已使用過的驗證碼，請重新申請忘記密碼' });
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 3000);
          break;
        }
        default: {
          this.messageService.add({ severity: 'error', summary: '失敗', detail: '驗證失敗，3秒後將跳轉至登入頁面' });
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 3000);
          break;
        }
      }
    })


}


goBack(): void {
  this.location.back();
}

onSubmit() {
  if (this.modifypasswordForm.valid == true) {
    this.newPassword = this.modifypasswordForm.value;
    console.log(this.newPassword)
    this.LoginService.updataForgetPassword(this.newPassword)
      .subscribe((data: ResponseObj) => {
        if (data.code === '000') {
          this.messageService.add({ severity: 'success', summary: '成功', detail: '密碼更新成功，2秒後將跳轉至登入頁面，請用此組密碼重新登入' });
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: '失敗', detail: '更新失敗，請再次確認密碼' });
        }
      })
  }
  else {
    this.messageService.add({ severity: 'error', summary: '失敗', detail: '尚有必填欄位未填' });
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
}

}
