import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWithCookie, BASE_URL } from "../api";

//此區塊為測試開發用內容
    // import axios from "axios";
    // axios.defaults.withCredentials = true; 

    // const BASE_URL = import.meta.env.VITE_BASE_URL;
    // const API_PATH = import.meta.env.VITE_API_PATH;
//此區塊為測試開發用內容

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        
    },
    reducers: {},
  });

  export const {  } = messageSlice.actions;

    //#region
    //#endregion

    //#region 會員留言上傳
        export const messageDataUpLoad = createAsyncThunk(
            "order/messageDataUpLoad",
            async ({messageData},{ dispatch,rejectWithValue }) => {
                try {
                    const messageDataUpLoadRef = await axiosWithCookie.post(`${BASE_URL}/message/messageUpLoad`,messageData);
                    console.log("會員留言上傳成功:",messageDataUpLoadRef.data);
                    return(messageDataUpLoadRef.data);
                } catch (error) {
                    console.log("會員留言上傳失敗",error.response.data);
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion


        
export default messageSlice.reducer;