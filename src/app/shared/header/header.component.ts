import { Component, OnInit } from '@angular/core';
// -------------載用彈窗-------------
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateContactComponent } from '@app/shared/my-dialog/CreateContact/CreateContact.component';
// ---------------------------------
import { ResponseLoginData } from '@app/core/models/user';
import { UserDataService } from '@app/core/services/UserData.service';
import { MessageService } from 'primeng/api';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    DialogService,
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    // -------------載用彈窗-------------
    public dialogService: DialogService,
    // ---------------------------------
    private UserDataService: UserDataService,
  ) { }

  visibleSidebar
  UserData: ResponseLoginData
  Corporate: boolean;
  WasteMove: boolean;
  WasteDeal: boolean;

  isActive: boolean;
  isLogin: boolean;
  // Active = this.UserData.body.Active;

  refContact: DynamicDialogRef;

  ngOnInit(): void {
    this.checkUserData()
    // 伸縮選單
    // $('.menu>li>a').click(function (e) {
    //   e.preventDefault();
    //   //點選到的.menu>li>a顯示裡面的.inmenu
    //   $(this).siblings('.inmenu').slideToggle().parent().siblings().find('.inmenu').slideUp();
    //   //點選到的.menu>li>a 顯示動態active
    //   $(this).addClass('active').parent().siblings().find('a').removeClass('active');
    // });
  }

  checkUserData() {
    this.Corporate = false
    this.WasteMove = false
    this.WasteDeal = false
    // this.UserData = this.UserDataService.UserData
    // 獲取本地資料
    this.UserData = JSON.parse(localStorage.getItem('UserData'))
    console.log(this.UserData, 'This check UserData have get')

    if (this.UserData !== null) {
      this.isActive = false
      this.isLogin = true
      var CorporateType = this.UserData.body.CorporateType
      switch (CorporateType) {
        case 'Corporate': {
          this.Corporate = true
          break;
        }
        case 'WasteMove': {
          this.WasteMove = true
          break;
        }
        case 'WasteDeal': {
          this.WasteDeal = true
          break;
        }
        default: {
          this.Corporate = false
          this.WasteMove = false
          this.WasteDeal = false
          break;
        }
      }
    }
    else {
      this.isActive = true
      this.isLogin = false
    }
  }

  goOpen1() {
    window.open("https://waste.epa.gov.tw/RWD/LGN/");
  }
  goOpen2() {
    window.open("https://waste.epa.gov.tw/WasteConfigure/WasteCode.asp");
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

  LoginIn() {
    this.router.navigateByUrl('/login')
  }

  LoginOut() {
    // 刪除本地資料
    localStorage.removeItem('UserData');
    // this.UserDataService.UserData = null
    console.log(this.UserDataService.UserData, 'This is LoginOut Data')
    this.checkUserData()
    this.router.navigateByUrl('/index');
  }
}
