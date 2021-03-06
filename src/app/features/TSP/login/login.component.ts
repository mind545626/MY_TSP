import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ResponseObj, Login, ResponseLoginData } from '@app/core/models/user';
import { LoginService } from '@app/core/services/Login.service';
import { UserDataService } from '@app/core/services/UserData.service';
import { MessageService } from 'primeng/api';
import { data } from 'jquery';


// -------------載用彈窗-------------
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { ForgetPasswordComponent } from './pop-up/forget-password/ForgetPassword.component';
// -------------載用彈窗-------------


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    // -------------提示訊息-------------
    MessageService,
    // -------------載用彈窗-------------
    DialogService
    // ---------------------------------
  ]
})
export class LoginComponent implements OnInit {

  isShowPw: boolean;

  loginForm: FormGroup;
  UserId: string;
  Captcha: string;
  LoginStatus: boolean;
  refForgetPassword: DynamicDialogRef;

  Url: string;
  imgUrl: string = '/FECaptcha/GetCaptcha';
  GetimgUrl: string
  CapchaUrl: string;

  // 載入開關
  progressSpinner: boolean;
  ProgressSpinnerDlg


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private LoginService: LoginService,
    private messageService: MessageService,
    private UserDataService: UserDataService,
    public dialogService: DialogService,
  ) { }

  ngOnInit() {

    this.isShowPw = false;

    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.loginForm =
      this.fb.group({
        UserId: ['12345679', [Validators.required, Validators.minLength(8)]],
        Password: ['12345678', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,}\w*$/)]],
        Captcha: this.Captcha,
      });

    this.getUrl()
    this.reloadimg();
  }

  onSubmit(): void {
    this.progressSpinner = true
    let updatelogin = this.loginForm.value;
    if (this.loginForm.valid) {
      this.LoginService.getUserLogin(updatelogin)
        .subscribe((data: ResponseLoginData) => {
            if (data.code === '000') {
              console.log(data, 'login get UserData')
              this.UserDataService.UserData = data;
              // 記錄本地資料
              localStorage.setItem('UserData', JSON.stringify(data))
              var SellerType = data.body.SellerType
              // 賣家會員：登入成功
              switch (SellerType) {
                case 'Seller': {
                  this.UserId = data.body.UserId
                  this.LoginStatus = data.isSuccess
                  this.messageService.add({ severity: 'success', summary: '成功', detail: '賣家會員：登入成功' });
                  setTimeout(() => {
                    this.router.navigateByUrl('/company/order-progress')
                    setTimeout(() => {
                      location.reload();
                    }, 500)
                  }, 1500)
                  console.log(this.LoginStatus, 'Get message')
                  break;
                }
                case 'Courier': {
                  this.UserId = data.body.UserId
                  this.LoginStatus = data.isSuccess
                  this.messageService.add({ severity: 'success', summary: '成功', detail: '快遞會員：登入成功' });
                  setTimeout(() => {
                    this.router.navigateByUrl('/clean/clean-dispatch')
                    setTimeout(() => {
                      location.reload();
                    }, 500)
                  }, 1000)
                  console.log(this.LoginStatus, 'Get message')
                  break;
                }
                case 'Buyer': {
                  this.UserId = data.body.UserId
                  this.LoginStatus = data.isSuccess
                  this.messageService.add({ severity: 'success', summary: '成功', detail: '買家會員：登入成功' });
                  setTimeout(() => {
                    this.router.navigateByUrl('/refuse-processing/clean-dispatch')
                    setTimeout(() => {
                      location.reload();
                    }, 500)
                  }, 1000)
                  console.log(this.LoginStatus, 'Get message')
                  break;
                }
                default: {
                  this.LoginStatus = false
                  console.log(data, 'Up UserData')
                  this.messageService.add({ severity: 'error', summary: '失敗', detail: '身分不合法，登入失敗' });
                  $("html, body").animate({ scrollTop: 0 }, "slow");
                  this.progressSpinner = false
                  break;
                }
              }

            }
            else {
              this.LoginStatus = data.isSuccess
              this.messageService.add({ severity: 'error', summary: '失敗', detail: '登入失敗，請確認帳號密碼是否正確' });
              $("html, body").animate({ scrollTop: 0 }, "slow");
              this.progressSpinner = false
            }
        })
      console.log(updatelogin);
      console.log(JSON.stringify(updatelogin));
    }
    else {
      this.LoginStatus = false
      this.messageService.add({ severity: 'error', summary: '錯誤', detail: '請填寫正確的帳號密碼' });
      $("html, body").animate({ scrollTop: 0 }, "slow");
      console.log(this.LoginStatus, 'Get message')
    }
  }

  // 忘記密碼彈窗
  showForgetPassword() {
    this.refForgetPassword = this.dialogService.open(ForgetPasswordComponent, {
      header: '忘記密碼',
      width: '45%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
    });
  }

  getUrl() {
    if (window.location.href.indexOf("220.134.112.17") != -1) {   //外網
      this.Url = "http://192.0.0.1:1000/TSPAPI"
    } else {   //內網
      this.Url = "/TSPAPI";
    }
    return this.Url;
  }


  reloadimg() {
    this.GetimgUrl = this.Url + this.imgUrl;
    this.CapchaUrl = this.GetimgUrl + "?t=" + new Date().getTime();
    console.info('GetimgUrl ', this.GetimgUrl);
  }

  showPw(result: string) {
    const PWshow = document.getElementById("Password");
    if (result == "N") {
      this.isShowPw = true;
      PWshow["type"] = "text";
    } else {
      this.isShowPw = false;
      PWshow["type"] = "password";
    }
  }
}
