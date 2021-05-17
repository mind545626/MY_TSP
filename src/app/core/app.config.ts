// import { environment } from "../../environments/environment";

// const baseUrl = environment.baseUrl; // env
// 對內IP
// const baseUrl = 'http://192.168.89.17:8011/TSPAPI/api/'
// 對外IP
// const baseUrl = 'http://220.134.112.174:8011/TSPAPI/api/'

export const config: any = {


  // 申請事業會員
  TSPFECreateCorporateUrl: "api/FECorporate/CreateCorporate",
  // 取得暫時會員資料(修改審核不通過)
  TSPFETempCorporateUrl: "api/FECorporate/GetTempCorporate",
  // 修改暫時會員資料
  TSPFEUpdateTempCorporateUrl: "api/FECorporate/UpdateTempCorporate",
  // 修改事業單位
  TSPFEUpdateCorporateUrl: "api/FECorporate/UpdateCorporate",


  // 公告列表
  TSPFEBillboardListUrl: "api/FEBillboard/GetBillboardList",
  // 公告內容
  TSPFEBillboardDetailUrl: "api/FEBillboard/GetBillboardDetail",


  // 消息列表
  TSPFENewsListUrl: "api/FENews/GetNewsList",
  // 消息內容
  TSPFENewsDetailUrl: "api/FENews/GetNewsDetail",


  // 新增聯絡我們
  TSPContactUrl: "api/FEContact/CreateContactUs",


  //地址與事業別下拉選單
  TSPFESysCodeUrl: "api/FESysCode/GetSysCode",
  TSPFESysCode2LevelUrl: "api/FESysCode/GetSysCode2Level",
  TSPFEAddressPartUrl: "api/FESysCode/GetAddressPart",


  // 使用者信箱驗證開通(審核通過)
  TSPUserInfoUserActiveUrl: "api/FEUserInfo/UserActive",
  // 登入資料
  TSPUserInfoUserLoginUrl: "api/FEUserInfo/UserLogin",
  // 忘記密碼
  TSPForgetPasswordUrl: "api/FEUserInfo/ForgetPassword",
  // 更新密碼
  TSPForgetPasswordUpdateUrl: "api/FEUserInfo/ForgetPasswordUpdate",
  // 密碼更新驗證
  TSPForgetPasswordCheckUrl: "api/FEUserInfo/ForgetPasswordCheck",


  // 取得估價單列表
  TSPFEGetQuoteListUrl: "api/FECorporate/GetQuoteList",
  // 建立估價單
  TSPFECreateQuoteUrl: "api/FECorporate/CreateQuote",
  // 修改估價單
  TSPFEUpdateQuoteUrl: "api/FECorporate/UpdateQuote",
  // 取得估價單明細
  TSPFEGetQuoteDetailUrl: "api/FECorporate/GetQuoteDetail",


  // 估價轉合約
  TSPFECreateContractUrl: "api/FECorporate/CreateContract",
  // 取得合約列表
  TSPFEGetContractListUrl: "api/FECorporate/GetContractList",
  // 取得合約明細
  TSPFEGetContractDetailUrl: "api/FECorporate/GetContractDetail",


  // 取得訂單列表
  TSPFEGetOrderListUrl: "api/FECorporate/GetOrderList",
  // 取得訂單明細
  TSPFEGetOrderDetailUrl: "api/FECorporate/GetOrderDetail",
  // 取得合約明細列表
  TSPFEGetContractCodeListUrl: "api/FECorporate/GetContractCodeList",
  // 新增訂單
  TSPFECreateOrderUrl: "api/FECorporate/CreateOrder",
  // 刪除訂單
  TSPFEDeleteOrderUrl: "api/FECorporate/DeleteOrder",

}
