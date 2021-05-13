import { CodeKey, Quote, QuoteinfoData } from '@app/core/models/case';
import { ResponseLoginData } from './../models/user';
import { Injectable } from "@angular/core";

@Injectable()

export class UserDataService {

  // 儲存登入後的User資料
  UserData: ResponseLoginData;
  QuoteID: string;
  QuoteLength: any;
  QuoteinfoData : QuoteinfoData
  constructor(

  ) { }

}
