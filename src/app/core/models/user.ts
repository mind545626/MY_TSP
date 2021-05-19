export interface ResponseObj {
  isSuccess: boolean,
  message: string,
  code: string,
  response: string,
  exception: string,
  body: any
}


export interface BaseResult<T> {
  body: Array<T>;
  isSuccess: true;
  message: string;
  code: string;
  response: string;
  exception: string;
}

export interface FEBillboard {
  // Detail: Array<FEBillboardDetail>;
  Detail: FEBillboardDetail[];
  Id: number;
  IsTop: boolean;
  Title: string;
  UP_DateTime: string;
}

export interface FENews {
  // Detail: Array<FENewsDetail>;
  Detail: FENewsDetail[];
  Id: number;
  IsTop: boolean;
  Title: string;
  UP_DateTime: string;
}

export interface FEBillboardDetail {
  Id: number;
  Content: string;
  Title: string;
  UP_DateTime: string;
}

export interface FENewsDetail {
  Id: number;
  Content: string;
  FileList: FileList[];
  Title: string;
  UP_DateTime: string;
}

export interface FileList {
  FileID: string;
  FileName: string;
  FilePath: string;
}

export interface SysCodeInput {
  Type: string;
}


export interface FESysCode2Level {
  label: string;
  value: string;
  Items: Array<FESysCode>;
}

export interface FESysCode {
  label: string;
  value: string;
  // title: string;
}

export interface FESysCodeBoolean {
  label: string;
  value: boolean;
}

export interface FESysCodeAddress {
  label: string;
  value: string;
  Items: Array<FESysCode>;
}

export interface Key {
  Id: string;
}

export interface Login {
  UserId: string;
  Password: string;
  Captcha: string;
}

// 忘記密碼
export interface ForgetPassword {
  UserId: string;
  Email: string;
}

// 回傳資訊(登入)
export interface ResponseLoginData {
  body: LoginData,
  isSuccess: boolean,
  message: string,
  code: string,
  response: string,
  exception: string,
}
// 登入資料
export interface LoginData {
  UserId: string,
  Active: true,
  TaxIDNumber: string,
  Password: string,
  SellerName: string,
  Representative: string,
  PhoneNumber: string,
  Fax: string,
  CareerType: string,
  CareerTypeDesc: string,
  CareerSubType: string,
  CareerSubTypeDesc: string,
  ControlNumber: string,
  ContactPerson: string,
  ContactPhoneNumber: string,
  ContactPhoneExtension: string,
  ContactMobilePhone: string,
  ContactMail: string,
  BillingZipCode: string,
  BillingCity: string,
  BillingDistrict: string,
  BillingRoad: string,
  BillingAddress: string,
  MailingZipCode: string,
  MailingCity: string,
  MailingDistrict: string,
  MailingRoad: string,
  MailingAddress: string,
  BackupMail: string,
  SellerType: string,
  MemberReviewStatus: string,
  MemberReviewStatusDesc: string,
  License: LicenseObjData,
}
export interface LicenseObjData {
  OrgLicRank: string,
  OrgDealWay: string,
  OrgLicTimeLimit: string,
  OrgLicRenewDate: string,
  OrgLicNo: string,
  LicItem: Array<LicItemObjData>
  TechLic: Array<TechLicObjData>
}
export interface LicItemObjData {
  OrgLicNo: string,
  ItemCode: string,
}
export interface TechLicObjData {
  TechLicRank: string,
  TechLicTimeLimit: string,
  TechLicRenewDate: string,
  TechLicNo: string
}



//-----------

// export * from '@app/core/services/utils.service';
/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
