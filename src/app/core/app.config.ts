// import { environment } from "../../environments/environment";

// const baseUrl = environment.baseUrl; // env
// 對內IP
// const baseUrl = 'http://192.168.89.17:8011/TSPAPI/api/'
// 對外IP
// const baseUrl = 'http://220.134.112.174:8011/TSPAPI/api/'

export const config: any = {


  // 申請事業會員
  TSPFECreateSellerUrl: "api/FESeller/CreateSeller",
  // Get 暫時會員資料(Modify 審核不通過)
  TSPFETempSellerUrl: "api/FESeller/GetTempSeller",
  // Modify 暫時會員資料
  TSPFEUpdateTempSellerUrl: "api/FESeller/UpdateTempSeller",
  // Modify 賣家會員
  TSPFEUpdateSellerUrl: "api/FESeller/UpdateSeller",


  // 公告_List
  TSPFEBillboardListUrl: "api/FEBillboard/GetBillboardList",
  // 公告內容
  TSPFEBillboardDetailUrl: "api/FEBillboard/GetBillboardDetail",


  // 消息_List
  TSPFENewsListUrl: "api/FENews/GetNewsList",
  // 消息內容
  TSPFENewsDetailUrl: "api/FENews/GetNewsDetail",


  // Add 聯絡我們
  TSPContactUrl: "api/FEContact/CreateContactUs",


  //地址與行業類別下拉選單
  TSPFESysCodeUrl: "api/FESysCode/GetSysCode",
  TSPFESysCode2LevelUrl: "api/FESysCode/GetSysCode2Level",
  TSPFEAddressPartUrl: "api/FESysCode/GetAddressPart",


  // 會員信箱驗證開通(審核通過)
  TSPUserInfoUserActiveUrl: "api/FEUserInfo/UserActive",
  // 登入資料
  TSPUserInfoUserLoginUrl: "api/FEUserInfo/UserLogin",
  // 忘記密碼
  TSPForgetPasswordUrl: "api/FEUserInfo/ForgetPassword",
  // 更新密碼
  TSPForgetPasswordUpdateUrl: "api/FEUserInfo/ForgetPasswordUpdate",
  // 密碼更新驗證
  TSPForgetPasswordCheckUrl: "api/FEUserInfo/ForgetPasswordCheck",


  // Get TSP_Quotation_List
  TSPFEGetQuoteListUrl: "api/FESeller/GetQuoteList",
  // Create TSP_Quotation
  TSPFECreateQuoteUrl: "api/FESeller/CreateQuote",
  // Modify TSP_Quotation
  TSPFEUpdateQuoteUrl: "api/FESeller/UpdateQuote",
  // Get TSP_Quotation_Detail
  TSPFEGetQuoteDetailUrl: "api/FESeller/GetQuoteDetail",


  // TSP_Quotation轉TPS_Deal
  TSPFECreateContractUrl: "api/FESeller/CreateContract",
  // Get TPS_Deal_List
  TSPFEGetContractListUrl: "api/FESeller/GetContractList",
  // Get TPS_Deal_Detail
  TSPFEGetContractDetailUrl: "api/FESeller/GetContractDetail",


  // Get TSP_Order_List
  TSPFEGetOrderListUrl: "api/FESeller/GetOrderList",
  // Get TSP_Order_Detail
  TSPFEGetOrderDetailUrl: "api/FESeller/GetOrderDetail",
  // Get TPS_Deal_Detail_List
  TSPFEGetContractCodeListUrl: "api/FESeller/GetContractCodeList",
  // Add TSP_Order
  TSPFECreateOrderUrl: "api/FESeller/CreateOrder",
  // Delet TSP_Order
  TSPFEDeleteOrderUrl: "api/FESeller/DeleteOrder",

}
