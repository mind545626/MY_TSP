export interface TestTSP {
  id: number;
  name: string;
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

export interface FENews {
  Id: number;
  IsTop: boolean;
  Title: string;
  UP_DateTime: string;
}

export interface FENewsDetail {
  Id: number;
  Content: string;
  Title: string;
  UP_DateTime: string;
}



/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/