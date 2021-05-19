import { Key } from '@app/core/models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from 'primeng/api';
import { LoginService } from '@app/core/services/Login.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { ResponseObj } from '@app/core/models/user';



@Component({
  selector: 'app-member-check',
  templateUrl: './member-check.component.html',
  styleUrls: ['./member-check.component.scss'],
  providers: [MessageService],
})
export class MemberCheckComponent implements OnInit {

  params: string;
  Key: Key;
  isSucceed: string;
  Message: string;

  // configUrl = 'assets/config.json';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private LoginService: LoginService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.Key = {
        Id: params['id']
      }
    });
    // console.log(this.Key, 'this is my params'); // Print the parameter to the console.
  }


  ngOnInit() {

    console.log(this.Key, 'Get my params'); // Print the parameter to the console.
    // 信箱開通
    this.LoginService.getUserActive(this.Key)
      .subscribe((data: ResponseObj) => {
        if (data.code === "000") {
          this.isSucceed = '開通成功';
          this.Message = '您註冊的帳號已完成帳號審核與信箱開通';
          console.log(data, 'The params is Success')
        } else if (data.code === "112") {
          this.isSucceed = '已經開通';
          this.Message = '您註冊的帳號已完成帳號審核與信箱開通';
          console.log(data, 'The params is Success')
        } else {
          this.isSucceed = '驗證失敗';
          this.Message = '您的驗證碼錯誤，請確認您的帳號與信箱是否完成審核開通';
          console.log(data, 'The params is Fail')
        }
      })

    $("html, body").animate({ scrollTop: 0 }, "slow");

    // 5秒後跳轉至登入頁面
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 5000);

  }


}
