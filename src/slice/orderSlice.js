import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true; 

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderData:null,
        imgTrigger:false,
        imgUploadDone: false,
        OrderModelErrorMsg:null,
        errorState:false,
        resetTrigger:false,
        userOrderData:null,
        userOrderListData:null,
    },
    reducers: {
        upLoad: (state, action) => {
            const orderData = action.payload;
            //如果不是字串就回null
            state.orderData = orderData ? orderData : null;
        },
        //修改orderData方法1
            mergeOrderData: (state, action) => {
                state.orderData = { ...(state.orderData), ...(action.payload) };
            },
            //使用方法: dispatch(mergeOrderData({ 
            //                                    material: "ABS", 
            //                                    color: "黑色"
            //                                  }));
        //修改orderData方法1

        //修改orderData方法2
            updateOrderField: (state, action) => {
                const { key, value } = action.payload;
                state.orderData[key] = value;
            },
            //使用方法: dispatch(updateOrderField({ key: "num", value: 2 }));
        //修改orderData方法2

        //重置orderData
            resetOrder: (state) => {
                state.orderData = null; // 或還原預設模板
            },
        //重置orderData

        //上傳錯誤狀態
            orderModelErrorStateUpLoad: (state, action) => {
                state.errorState = action.payload;
            },
        //上傳錯誤狀態

        //上傳錯誤訊息
            orderModelErrorMsgUpLoad: (state, action) => {
                state.OrderModelErrorMsg = action.payload;
            },
        //上傳錯誤訊息

        //圖片上傳開始信號
            imgTriggerOn: (state, action) => {
                state.imgTrigger = true;
            },
        //圖片上傳開始信號

        //圖片上傳開始關閉信號
            imgTriggerClose: (state, action) => {
                state.imgTrigger = false;
            },
        //圖片上傳開始關閉信號

        //圖片上傳完成信號
            imgUploadDoneOn: (state) => {
                state.imgUploadDone = true;
            },
        //圖片上傳完成信號

        //圖片上傳完成關閉信號
            imgUploadDoneOff: (state) => {
                state.imgUploadDone = false;
            },
        //圖片上傳完成關閉信號

        //訂單重置信號
            resetTriggerOn: (state) => {
                state.resetTrigger = true;
            },
        //訂單重置信號

        //訂單重置關閉信號
            resetTriggerOff: (state) => {
                state.resetTrigger = false;
            },
        //訂單重置關閉信號

        //使用者訂單資料列表上傳
        userOrderListUpLoad: (state, action) => {
            state.userOrderListData = action.payload;
        },
        //使用者訂單資料列表上傳

        //使用者訂單資料上傳
        userOrderUpLoad: (state, action) => {
            state.userOrderData = action.payload;
        },
        //使用者訂單資料上傳
        
    },
  });

  export const {    upLoad, mergeOrderData, updateOrderField, resetOrder, 
                    orderModelErrorStateUpLoad, orderModelErrorMsgUpLoad,   
                    imgTriggerOn, imgTriggerClose, 
                    imgUploadDoneOn, imgUploadDoneOff,
                    resetTriggerOn,resetTriggerOff,
                    userOrderListUpLoad,
                    userOrderUpLoad,
                } = orderSlice.actions;

    //#region
    //#endregion

    //#region 訂單預覽圖片上傳
        export const orderImgUpLoad = createAsyncThunk(
            "order/orderImgUpLoad",
            async ({orderImgData},{ dispatch,rejectWithValue }) => {
                try {
                    const orderImgUpLoadRef = await axios.post(`${BASE_URL}/orderImg/upload`,orderImgData,
                        { // ✅ 發送 POST 請求到後端圖片上傳 API
                            headers: { 'Content-Type': 'multipart/form-data' }, // ✅ 設定請求頭，讓後端知道是 multipart/form-data 格式
                        }
                    );
                    console.log("訂單預覽圖片上傳成功:",orderImgUpLoadRef.data);
                    return(orderImgUpLoadRef.data);
                } catch (error) {
                    console.log("上傳失敗",error.response.data);
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion

    //#region 訂單預覽圖片覆蓋
        export const orderImgUpLoadChange = createAsyncThunk(
            "order/orderImgUpLoad",
            async ({orderImgData},{ dispatch,rejectWithValue }) => {
                try {
                    const orderImgUpLoadRef = await axios.post(`${BASE_URL}/orderImg/changeUploadImages`,orderImgData,
                        { // ✅ 發送 POST 請求到後端圖片上傳 API
                            headers: { 'Content-Type': 'multipart/form-data' }, // ✅ 設定請求頭，讓後端知道是 multipart/form-data 格式
                        }
                    );
                    console.log("訂單預覽圖片上傳覆蓋成功:",orderImgUpLoadRef.data);
                    return(orderImgUpLoadRef.data);
                } catch (error) {
                    console.log("訂單預覽圖片上傳覆蓋失敗",error.response.data);
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion

    //#region 取得訂單函式
        export const orderDataGet = createAsyncThunk(
            "order/orderDataGet",
            async (_,{ dispatch,rejectWithValue }) => {
                try {
                    const orderDataGetRef = await axios.get(`${BASE_URL}/order/getOrderData`);
                    console.log("取得訂單資料成功:",orderDataGetRef.data);
                    return(orderDataGetRef.data);
                } catch (error) {
                    console.log("取得訂單資料失敗",error.response.data);
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion

    //#region 訂單上傳函式
        export const orderDataUpLoad = createAsyncThunk(
            "order/orderDataUpLoad",
            async ({order},{ dispatch,rejectWithValue }) => {
                try {
                    const orderDataUpLoadRef = await axios.post(`${BASE_URL}/order/registerOrder`,order);
                    console.log("訂單上傳成功:",orderDataUpLoadRef.data);
                    return(orderDataUpLoadRef.data);
                } catch (error) {
                    console.log("訂單上傳失敗",error.response.data);
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion

    
        
export default orderSlice.reducer;