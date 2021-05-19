import { ResponseLoginData } from './../../../core/models/user';
import { UserDataService } from '@app/core/services/UserData.service.ts';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { LoginData } from '@app/core/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {

  // @Output() outputUserData = new EventEmitter<any>()
  @Output() outputUserData = new EventEmitter<any>()

  constructor(
    private router : Router,
    private location: Location,
    private UserDataService: UserDataService,
  ) { }


  UserData: ResponseLoginData;

  items: MenuItem[];
  home: MenuItem[];


  UserId: string;
  Active: boolean;
  TaxIDNumber: string;
  Password: string;
  SellerName: string;
  Representative: string;
  PhoneNumber: string;
  Fax: string;
  CareerType: string;
  CareerTypeDesc: string;
  CareerSubType: string;
  CareerSubTypeDesc: string;
  ControlNumber: string;
  ContactPerson: string;
  ContactPhoneNumber: string;
  ContactPhoneExtension: string;
  ContactMobilePhone: string;
  ContactMail: string;
  BillingZipCode: string;
  BillingCity: string;
  BillingDistrict: string;
  BillingRoad: string;
  BillingAddress: string;
  MailingZipCode: string;
  MailingCity: string;
  MailingDistrict: string;
  MailingRoad: string;
  MailingAddress: string;
  BackupMail: string;
  SellerType: string;
  MemberReviewStatus: string;
  MemberReviewStatusDesc: string;


  ngOnInit() : void {

    // Get 登入資料
    // this.UserData = this.UserDataService.UserDataGet UserData
    this.UserData = JSON.parse(localStorage.getItem('UserData'))
    console.log(this.UserDataService.UserData, 'Get this.UserDataService.UserData')
    console.log(this.UserData, 'Get localStorage.UserData')

    $("html, body").animate({ scrollTop: 0 }, "slow");

    this.items = [
      { icon: 'pi pi-home', label: '我的會員首頁', routerLink: '/company/order-progress' },
      { label: '我的會員資料' },
    ];


    this.UserId = this.UserData.body.TaxIDNumber
    this.SellerType = this.UserData.body.SellerType
    this.TaxIDNumber = this.UserData.body.TaxIDNumber
    this.Password = this.UserData.body.Password
    this.SellerName = this.UserData.body.SellerName
    this.Representative = this.UserData.body.Representative
    this.PhoneNumber = this.UserData.body.PhoneNumber
    this.Fax = this.UserData.body.Fax
    this.ControlNumber = this.UserData.body.ControlNumber
    this.ContactPerson = this.UserData.body.ContactPerson
    this.ContactPhoneNumber = this.UserData.body.ContactPhoneNumber
    this.ContactPhoneExtension = this.UserData.body.ContactPhoneExtension
    this.ContactMobilePhone = this.UserData.body.ContactMobilePhone
    this.CareerType = this.UserData.body.CareerTypeDesc
    this.BillingCity = this.UserData.body.BillingCity
    this.MailingCity = this.UserData.body.MailingCity
    this.ContactMail = this.UserData.body.ContactMail
    this.BillingZipCode = this.UserData.body.BillingZipCode
    this.BillingRoad = this.UserData.body.BillingRoad
    this.MailingZipCode = this.UserData.body.MailingZipCode
    this.MailingRoad = this.UserData.body.MailingRoad
    this.BackupMail = this.UserData.body.BackupMail
    this.CareerSubType = this.UserData.body.CareerSubTypeDesc
    this.BillingDistrict = this.UserData.body.BillingDistrict
    this.MailingDistrict = this.UserData.body.MailingDistrict



  }

  goBack(): void {

    this.location.back();
  }

  goModifyMemberProfile(){
    this.router.navigate(['/company/member-profile/modify-member-profile']);
  }

}
