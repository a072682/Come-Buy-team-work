import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWithCookie, BASE_URL } from "../api"; // 引入共用 axios 實例（而不是 axios 本體）


//此區塊為測試開發用內容
    // import axios from "axios";
    // axios.defaults.withCredentials = true; 

    // const BASE_URL = import.meta.env.VITE_BASE_URL;
    // const API_PATH = import.meta.env.VITE_API_PATH;
//此區塊為測試開發用內容

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLogin: false,  // 是否登入
        avatar_url:null,
        username:null,
        auth_provider:null,
    },
    reducers: {
      login: (state, action) => {
        state.isLogin = true;
        state.user = action.payload; // 儲存登入的使用者資訊
      },
      logout: (state) => {
        state.isLogin = false;
        state.user = null;
      },
      avatarDataUp:(state,action) => {
        state.avatar_url = action.payload;
      },
      usernameDataUp:(state,action) => {
        state.username = action.payload;
      },
      auth_providerDataUp:(state,action) => {
        state.auth_provider = action.payload;
      },
    },
  });

  export const { login, logout, avatarDataUp, usernameDataUp, auth_providerDataUp } = loginSlice.actions;

    //#region
    //#endregion

    //#region 測試連線
        //測試連線
        export const linkTest = createAsyncThunk(
            "login/linkTest",
            async (_,{ dispatch }) => {
                try {
                    const response = await axiosWithCookie.get(`${BASE_URL}/test-db`);
                    console.log("連線成功",response.data);
                    return(response.data);
                } catch (error) {
                    console.log("連線失敗",error.response.data);
                    return(error.response.data);
                }
            }
        );
        //測試連線
    //#endregion

    //#region 建立會員api
        //建立會員api
        export const createUserData = createAsyncThunk(
            "login/createUserData",
            async (newUserDATA,{ dispatch, rejectWithValue }) => {
                try {
                    const createUserDataRef = await axiosWithCookie.post(`${BASE_URL}/user/register`,newUserDATA);
                    console.log("創建會員成功",createUserDataRef.data);
                    const createUserProfileRef = await axiosWithCookie.post(`${BASE_URL}/userProfile/createUserProfile`,newUserDATA);
                    console.log("創建會員個人資料成功",createUserProfileRef.data);
                    dispatch(logout());
                } catch (error) {
                    console.log("創建會員失敗",error.response.data);
                    dispatch(logout());
                    return rejectWithValue(error.response.data);
                }
            }
        );
        //建立會員api
    //#endregion

    //#region 會員登入API
        //會員登入API
        export const loginUser = createAsyncThunk(
            "login/loginUser",
            async (account, { dispatch, rejectWithValue }) => {
                try {
                    const handleLoginRef = await axiosWithCookie.post(`${BASE_URL}/user/login`, account);
                    console.log("登入成功",handleLoginRef.data);
                    dispatch(login());
                    return({
                        login:handleLoginRef.data,
                    });
                } catch (error) {
                    console.log("登入失敗",error.response.data);
                    dispatch(logout());
                    return rejectWithValue(error.response.data);
                }
            }
        );
        //會員登入API
    //#endregion
  
    //#region 登入確認
        //登入確認 API 請求
        export const checkLogin = createAsyncThunk(
                "login/checkLogin",
                async (_,{ dispatch }) => {
                    try {
                        const checkLoginRef = await axiosWithCookie.post(`${BASE_URL}/user/logInCheck`);
                        console.log("登入確認成功",checkLoginRef.data);
                        dispatch(usernameDataUp(checkLoginRef?.data.status.username));
                        dispatch(auth_providerDataUp(checkLoginRef?.data.status.auth_provider));
                        const getUserProfileRef = await axiosWithCookie.get(`${BASE_URL}/userProfile/getUserProfile`);
                        console.log("取得會員個人資料成功",getUserProfileRef.data);
                        if(getUserProfileRef?.data.message !== "管理員帳戶無個人信息"){
                            dispatch(avatarDataUp(getUserProfileRef?.data.userData.avatar_url ?? getUserProfileRef?.data.userData.google_avatar_url));
                        }
                        dispatch(login());
                } catch (error) {
                    console.log("登入確認失敗",error.response.data);
                    dispatch(logout());
                }
            }
        );
        //登入確認 API 請求
    //#endregion

    //#region 會員登入次數統計
    
        export const userLoginCounter = createAsyncThunk(
                "login/userLoginCounter",
                async (_,{ dispatch, rejectWithValue }) => {
                    try {
                        const userLoginCounterRef = await axiosWithCookie.post(`${BASE_URL}/user/userLoginCounter`);
                        console.log("登入計數成功",userLoginCounterRef.data.message);
                } catch (error) {
                    console.log("登入計數失敗",error.response.data);
                    return rejectWithValue(error.response.data);
                }
            }
        );
    
    //#endregion
  
    //#region 登出
        //登出
        export const logoutUser = createAsyncThunk(
            "login/logoutUser",
            async (_, { dispatch }) => {
                try {
                    const handleLogoutRef = await axiosWithCookie.post(`${BASE_URL}/user/logout`);
                    console.log("登出成功(Slice端)");
                    dispatch(logout());
                } catch (error) {
                    console.log("登出失敗(Slice端)");
                }
            }
        );
        //登出
    //#endregion    

    //#region 取得使用者資料
        //取得使用者資料
        export const getUserData = createAsyncThunk(
                "login/getUserData",
                async (_,{ dispatch, rejectWithValue }) => {
                    try {
                        const getUserDataRef = await axiosWithCookie.get(`${BASE_URL}/user/getUserData`);
                        const getUserProfileDataRef = await axiosWithCookie.get(`${BASE_URL}/userProfile/getUserProfile`);
                        console.log("取得使用者資料成功",getUserDataRef.data,getUserProfileDataRef.data.userData,);
                        dispatch(usernameDataUp(getUserDataRef?.data.username));
                        if(getUserProfileDataRef?.data.message !== "管理員帳戶無個人信息"){
                            dispatch(avatarDataUp(getUserProfileDataRef?.data.userData.avatar_url ?? getUserProfileDataRef?.data.userData.google_avatar_url));
                        }
                        return(
                            {
                                UserData:getUserDataRef.data,
                                UserProfileData:getUserProfileDataRef.data.userData,
                            }
                        );
                } catch (error) {
                    console.log("取得使用者資料失敗",error.response.data);
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion

    //#region 更新會員資料
        export const userDataUpChange = createAsyncThunk(
                "login/userDataUpChange",
                async (userData,{ dispatch, rejectWithValue }) => {
                    try {
                        const userDataUpChangeRef = await axiosWithCookie.post(`${BASE_URL}/user/userDataUpChange`,userData);
                        console.log("更新會員資料成功",userDataUpChangeRef.data);
                        return(userDataUpChangeRef.data);
                } catch (error) {
                    console.log("更新會員資料失敗",error.response.data);
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion

    //#region 更新會員個人資料
        export const userProfileDataUpChange = createAsyncThunk(
                "login/userProfileDataUpChange",
                async (userProfileData,{ dispatch, rejectWithValue }) => {
                    try {
                        const userProfileDataUpChangeRef = await axiosWithCookie.post(`${BASE_URL}/userProfile/upUserProfile`,userProfileData);
                        console.log("更新會員個人資料成功",userProfileDataUpChangeRef.data);
                        return(userProfileDataUpChangeRef.data);
                } catch (error) {
                    console.log("更新會員個人資料失敗",error.response.data);
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion
    
    //#region 會員頭像圖片上傳
        export const avatarImgUpLoad = createAsyncThunk(
            "login/avatarImgUpLoad",
            async ({avatarImgData},{ dispatch, rejectWithValue }) => {
                try {
                    const avatarImgUpLoadRef = await axiosWithCookie.post(`${BASE_URL}/avatarImg/upload`,avatarImgData,
                        { // ✅ 發送 POST 請求到後端圖片上傳 API
                            headers: { 'Content-Type': 'multipart/form-data' }, // ✅ 設定請求頭，讓後端知道是 multipart/form-data 格式
                        }
                    );
                    console.log("上傳成功:",avatarImgUpLoadRef.data);
                    return(avatarImgUpLoadRef.data);
                } catch (error) {
                    console.log("上傳失敗",error.response.data);
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion

    //#region 會員頭像圖片覆蓋
        export const avatarImgUpLoadChange = createAsyncThunk(
            "login/avatarImgUpLoad",
            async ({avatarImgData},{ dispatch, rejectWithValue }) => {
                try {
                    const avatarImgUpLoadChangeRef = await axiosWithCookie.post(`${BASE_URL}/avatarImg/changeUploadImages`,avatarImgData,
                        { // ✅ 發送 POST 請求到後端圖片上傳 API
                            headers: { 'Content-Type': 'multipart/form-data' }, // ✅ 設定請求頭，讓後端知道是 multipart/form-data 格式
                        }
                    );
                    console.log("上傳覆蓋成功:",avatarImgUpLoadChangeRef.data);
                    return(avatarImgUpLoadChangeRef.data);
                } catch (error) {
                    console.log("上傳覆蓋失敗",error.response.data);
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion

    //#region 會員密碼修改更新
        export const userPasswordChange = createAsyncThunk(
            "login/userPasswordChange",
            async ({passWordData},{ dispatch, rejectWithValue }) => {
                try {
                    const userPasswordChangeRef = await axiosWithCookie.post(`${BASE_URL}/user/userPasswordUpLoad`,passWordData);
                    console.log("密碼修改成功:",userPasswordChangeRef.data);
                    return(userPasswordChangeRef.data);
                } catch (error) {
                    console.log(error.response.data);
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion

    //#region google登入api
        export const userGoogleLogin = createAsyncThunk(
            "login/userGoogleLogin",
            async (_,{ dispatch, rejectWithValue }) => {
                try {
                    window.location.href = `${BASE_URL}/google/google`; 
                } catch (error) {
                    console.log("google登入失敗");
                    return rejectWithValue("google登入失敗");
                }
            }
        );
    //#endregion

export default loginSlice.reducer;