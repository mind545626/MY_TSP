export interface MemberRegisterData {
  body: CustomerDataImp;
  isSuccess: true;
  message: string;
  code: string;
  response: string;
  exception: string;
}



export interface RegisterData {
  Id: string,
  TaxIDNumber: string,
  Password: string,
  CorporateName: string,
  Representative: string,
  PhoneNumber: string,
  Fax: string,
  CareerType: string,
  CareerSubType: string,
  ControlNumber: string,
  ContactPerson: string,
  ContactPhoneNumber: string,
  ContactMobilePhone: string,
  ContactPhoneExtension: string,
  ContactMail: string,
  BillingZipCode: string,
  BillingCity: string,
  BillingDistrict: string,
  BillingRoad: string,
  MailingZipCode: string,
  MailingCity: string,
  MailingDistrict: string,
  MailingRoad: string,
  BackupMail: string,
  CorporateType: string
}

export interface AttachData {
  FileName: string;
  FileBase64: string;
}

export interface Customer {
  CustomerData: RegisterData;
  Attach: AttachData[];
  // Attach: Array<AttachData>;
}



export class CustomerDataImp implements Customer {
  CustomerData: RegisterData;
  // Attach: Array<AttachData>;
  Attach: AttachData[];
}

export interface HistoryCase {
  Sort: string;
  CaseID: string;
  Office: string;
  AccuseCaseTitle: string;
  StartTime: string;
  EndTime: string;
  OrderFileName: string;
  OrderFilePath: string;
}


// 連絡我們
export interface CreateContactUs {
  ContactPerson: string;
  ContactDate: string;
  ContactMail: string;
  ContactPhoneNumber: string;
  ContactType: string;
  Message: string;
}



// 提交TSP_Quotation資料
export interface ResponseQuoteData {
  body: Quote,
  isSuccess: boolean,
  message: string,
  code: string,
  response: string,
  exception: string,
}
export interface Quote {
  Id: string,
  Code: string,
  ApplyDateTime: string,
  CustomerId: string,
  QuoteType: string,
  CollectFrequency: string,
  CollectWeekDay: string,
  IsAgreeSignFree: boolean,
  ApplyWasteType: string,
  ClearZipCode: string,
  ClearCity: string,
  ClearDistrict: string,
  ClearRoad: string,
  WasteStoragePlace: string,
  PayMethod: string,
  PayItem: string,
  ProvideEquip: ProvideEquip[],
  IsNeedRecord: boolean,
  QuoteStatus: string,
  QuoteDateTime: string,
  QuoteReplyDateTime: string,
  QuoteCompleteDateTime: string,
  WasteData: WasteData[],
}
export interface ProvideEquip {
  QuoteId?: string,
  QuoteProvideEquip?: string,
  QuoteProvideEquipName?: string,
  Qty?: number,
  Price?: number,
}
export interface WasteData {
  QuoteId: string,
  WasteCode: string,
  WasteStatus: string,
  MonthlyQty: number,
  WasteUnit: string,
  Price: number,
}
//-----------

// TSP_Quotation列表
export interface QuoteListData {
  body: QuoteList[],
  isSuccess: boolean,
  message: string,
  code: string,
  response: string,
  exception: string
}
export interface QuoteList {
  Code: string,
  WasteItem: WasteItem[],
  TaxIDNumber: string,
  CorporateName: string,
  ClearAddress: string,
  QuoteStatus: string,
  QuoteStatusName: string,
  QuoteType: string,
  QuoteTypeName: string,
  ApplyDateTime: string,
  QuoteDateTime: string,
  QuoteReplyDateTime: string,
  QuoteCompleteDateTime: string,
}
export interface SearchQuoteList {
  QueryDateTimeStart?: string,
  QueryDateTimeEnd?: string,
  TaxIDNumber: string,
  KeyWord?: string,
  QuoteStatus?: string
}

export interface WasteItem {
  WasteCode: string;
  WasteName: string;
}
//-----------

// 取得TSP_Quotation明細
export interface ResponseQuoteinfoData {
  body: QuoteinfoData,
  isSuccess: boolean,
  message: string,
  code: string,
  response: string,
  exception: string,
}
export interface QuoteinfoData {
  Code: string,
  ApplyDateTime: string,
  CorporateName: string,
  CareerType: string,
  CareerTypeName: string,
  CareerSubType: string,
  CareerSubTypeName: string,
  ContactPerson: string,
  ContactPhoneNumber: string,
  ContactMobilePhone: string,
  ContactPhoneExtension: string,
  ControlNumber: string,
  QuoteType: string,
  QuoteTypeName: string,
  QuoteDateTime: string,
  CollectFrequency: string,
  CollectFrequencyName: string,
  CollectWeekDay: string,
  CollectWeekDayName: string,
  ApplyWasteType: string,
  ApplyWasteTypeName: string,
  ClearZipCode: string,
  ClearCity: string,
  ClearDistrict: string,
  ClearRoad: string,
  ClearAddress: string,
  WasteStoragePlace: string,
  WasteStoragePlaceName: string,
  QuoteStatus: string,
  QuoteStatusName: string,
  QuoteReplyDateTime: string,
  QuoteCompleteDateTime: string,
  PayMethod: string,
  PayMethodName: string,
  PayItem: string,
  PayItemName: string,
  ProvideEquip: ProvideEquip[],
  IsAgreeSignFree: boolean,
  IsNeedRecord: boolean,
  WasteData: WasteDatainfo[],
  QuoteReplyLog: QuoteReplyLog[],
  AcceptableAmount: string,
}
export interface WasteDatainfo {
  WasteCode: string,
  WasteName: string,
  WasteStatus: string,
  WasteStatusName: string,
  MonthlyQty: number,
  WasteUnit: string,
  WasteUnitName: string,
  Price: number,
}
export interface QuoteReplyLog {
  QuoteStatus: string,
  QuoteStatusName: string,
  ReplyDateTime: string,
  ReplyNote: string,
  ReplyUserId: string,
  ReplyUserName: string
}
//-----------

// 新密碼
export interface newPassword {
  Id: string,
  Password: string,
}
//-------
export interface CodeKey {
  TaxIDNumber: string;
  Code: string;
}

// 搜尋合約
export interface SearchContractList {
  QueryDateTimeStart?: string,
  QueryDateTimeEnd?: string,
  TaxIDNumber: string,
  KeyWord?: string,
  ContractStatus?: string
}
// 合約列表
export interface ContractListData {
  body: ContractList[],
  isSuccess: boolean,
  message: string,
  code: string,
  response: string,
  exception: string
}
export interface ContractList {
  Code: string,
  CorporateName: string,
  ClearAddress: string,
  ApplyDateTime: string,
  StartDateTime: string,
  EndDateTime: string,
  ContractStatus: string,
  ContractStatusName: string,
  WasteData: WasteData[],
  WasteDataName: WasteDataName[]
}
export interface WasteDataName {
  WasteCodeName: string,
}
export interface ContractinfoData {
  Code: string,
  QuoteCode: string,
  AcceptableAmount: string,
  ApplyDateTime: string,
  TaxIDNumber: string,
  CorporateName: string,
  CareerType: string,
  CareerSubType: string,
  ContactPerson: string,
  ContactPhoneNumber: string,
  ContactMobilePhone: string,
  ControlNumber: string,
  StartDateTime: string,
  EndDateTime: string,
  CollectFrequency: string,
  CollectWeekDay: string,
  ApplyWasteType: string,
  IsAgreeSignFree: boolean,
  ClearAddress: string,
  ContractStatus: string,
  WasteStoragePlace: string,
  PayMethod: string,
  PayItem: string,
  ContactPhoneExtension: string,
  ApplyWasteTypeName: string,
  ContractStatusName: string,
  ProvideEquip: ProvideEquip[],
  IsNeedRecord: boolean,
  WasteData: WasteDatainfo[],
  // QuoteReplyLog: QuoteReplyLog[],
}
// 取得合約明細
export interface ResponseContractinfoData {
  body: ContractinfoData,
  isSuccess: boolean,
  message: string,
  code: string,
  response: string,
  exception: string,
}


//搜尋TSP_Order
export interface SearchOrderList {
  QueryDateTimeStart: string,
  QueryDateTimeEnd: string,
  TaxIDNumber: string,
  KeyWord: string,
  ProcessStatus: string
}
//取得TSP_Order列表
export interface OrderList {
  Code: string,
  ApplyDateTime: string,
  CarPlate: string,
  CorporateName: string,
  ClearAddress: string,
  WasteCode: string,
  WasteCodeName: string,
  ProcessStatus: string,
  ProcessStatusName: string,
  TransactionStatus: boolean,
  PaymentStatus: boolean,
  CompleteDateTime: string,
  EstimatedPrice: number,
  ActualPrice: number
}
// TSP_Order列表
export interface OrderListData {
  body: OrderList[],
  isSuccess: boolean,
  message: string,
  code: string,
  response: string,
  exception: string
}
// 取得TSP_Order詳細
export interface ResponseOrderinfoData {
  body: OrderinfoData,
  isSuccess: boolean,
  message: string,
  code: string,
  response: string,
  exception: string
}
// TSP_Order詳細資料
export interface OrderinfoData {
  Code: string,
  ContractCode: string,
  ApplyDateTime: string,
  CorporateName: string,
  CareerType: string,
  CareerSubType: string,
  ContactPerson: string,
  ContactPhoneNumber: string,
  ContactMobilePhone: string,
  ControlNumber: string,
  CarPlate: string,
  CollectFrequency: string,
  CollectWeekDay: string,
  ApplyWasteType: string,
  ApplyWasteTypeName: string,
  //申請總價(EstimatePrice)
  ApplyTotalPrice: number,
  //實際總價(實際價格)
  ActualTotalPrice: number,
  ClearAddress: string,
  WasteStoragePlace: string,
  ProcessStatus: string,
  ProcessStatusName: string,
  TransactionStatus: boolean,
  PaymentStatus: boolean,
  CompleteDateTime: string,
  //EstimatePrice
  EstimatedPrice: number,
  //實際價格
  ActualPrice: number,
  CompletePic: string,
  PayMethod: string,
  PayItem: string,
  ProvideEquip: ProvideEquip[],
  OrderNotConfromPhotoPaths: string[],
  OrderCompletePhotoPaths: string[],
  IsAgreeSignFree: boolean,
  IsNeedRecord: boolean,
  WasteCode: string,
  WasteName: string,
  WasteStatus: string,
  MonthlyQty: number,
  WasteUnit: string,
  //單價
  Price: number,
  ApplyQty: number,
  ActualQty: number,
  NotMatchPic: string,
  AcceptableAmount: number
}

// 合約ContractCode列表
export interface ContractCodeListData {
  body: ContractCodeList[],
  isSuccess: boolean,
  message: string,
  code: string,
  response: string,
  exception: string
}
// 取得合約ContractCode列表
export interface ContractCodeList {
  ContractCode: string,
}
// 建立TSP_Order
export interface CreateOrder {
  ContractCode: string,
  WasteCode: string,
  MonthlyQty: number,
  ApplyQty: number,
  ProvideEquip: ProvideEquip[],
  UP_UserId: string
}



export interface Product {
  id?: string;
  code?: string;
  name?: string;
  price?: number;
}

