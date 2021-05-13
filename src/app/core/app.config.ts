// import { environment } from "../../environments/environment";

// const baseUrl = environment.baseUrl; // env
// 對內IP
// const baseUrl = 'http://192.168.89.17:8011/IRMSAPI/api/'
// 對外IP
// const baseUrl = 'http://220.134.112.174:8011/IRMSAPI/api/'

export const config: any = {


  // 申請事業會員
  IrmsFECreateCorporateUrl: "api/FECorporate/CreateCorporate",
  // 取得暫時會員資料(修改審核不通過)
  IrmsFETempCorporateUrl: "api/FECorporate/GetTempCorporate",
  // 修改暫時會員資料
  IrmsFEUpdateTempCorporateUrl: "api/FECorporate/UpdateTempCorporate",
  // 修改事業單位
  IrmsFEUpdateCorporateUrl: "api/FECorporate/UpdateCorporate",


  // 公告列表
  IrmsFEBillboardListUrl: "api/FEBillboard/GetBillboardList",
  // 公告內容
  IrmsFEBillboardDetailUrl: "api/FEBillboard/GetBillboardDetail",


  // 消息列表
  IrmsFENewsListUrl: "api/FENews/GetNewsList",
  // 消息內容
  IrmsFENewsDetailUrl: "api/FENews/GetNewsDetail",


  // 新增聯絡我們
  IrmsContactUrl: "api/FEContact/CreateContactUs",


  //地址與事業別下拉選單
  IrmsFESysCodeUrl: "api/FESysCode/GetSysCode",
  IrmsFESysCode2LevelUrl: "api/FESysCode/GetSysCode2Level",
  IrmsFEAddressPartUrl: "api/FESysCode/GetAddressPart",


  // 使用者信箱驗證開通(審核通過)
  IrmsUserInfoUserActiveUrl: "api/FEUserInfo/UserActive",
  // 登入資料
  IrmsUserInfoUserLoginUrl: "api/FEUserInfo/UserLogin",
  // 忘記密碼
  IrmsForgetPasswordUrl: "api/FEUserInfo/ForgetPassword",
  // 更新密碼
  IrmsForgetPasswordUpdateUrl: "api/FEUserInfo/ForgetPasswordUpdate",
  // 密碼更新驗證
  IrmsForgetPasswordCheckUrl: "api/FEUserInfo/ForgetPasswordCheck",


  // 取得估價單列表
  IrmsFEGetQuoteListUrl: "api/FECorporate/GetQuoteList",
  // 建立估價單
  IrmsFECreateQuoteUrl: "api/FECorporate/CreateQuote",
  // 修改估價單
  IrmsFEUpdateQuoteUrl: "api/FECorporate/UpdateQuote",
  // 取得估價單明細
  IrmsFEGetQuoteDetailUrl: "api/FECorporate/GetQuoteDetail",


  // 估價轉合約
  IrmsFECreateContractUrl: "api/FECorporate/CreateContract",
  // 取得合約列表
  IrmsFEGetContractListUrl: "api/FECorporate/GetContractList",
  // 取得合約明細
  IrmsFEGetContractDetailUrl: "api/FECorporate/GetContractDetail",


  // 取得訂單列表
  IrmsFEGetOrderListUrl: "api/FECorporate/GetOrderList",
  // 取得訂單明細
  IrmsFEGetOrderDetailUrl: "api/FECorporate/GetOrderDetail",
  // 取得合約明細列表
  IrmsFEGetContractCodeListUrl: "api/FECorporate/GetContractCodeList",
  // 新增訂單
  IrmsFECreateOrderUrl: "api/FECorporate/CreateOrder",
  // 刪除訂單
  IrmsFEDeleteOrderUrl: "api/FECorporate/DeleteOrder",

}
