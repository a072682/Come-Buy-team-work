import { useEffect, useRef, useState } from "react"
import EstimatePageMain1 from "./EstimatePageMain1/EstimatePageMain1"
import EstimatePageMain2 from "./EstimatePageMain2/EstimatePageMain2"
import EstimatePageMain3 from "./EstimatePageMain3/EstimatePageMain3"
import EstimatePageMain4 from "./EstimatePageMain4/EstimatePageMain4"
import EstimatePageMain5 from "./EstimatePageMain5/EstimatePageMain5"
import { useDispatch, useSelector } from "react-redux"
import { resetTriggerOff } from "../../slice/orderSlice"




function EstimatePage(){

    //#region
    //#endregion

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 讀取中央資料
        //讀取中央資料
        const loginState = useSelector((state)=>{
            return(
                state.login.isLogin
            )
        })

        useEffect(()=>{
            console.log("loginState狀態:",loginState);
        },[loginState])
    //#endregion

    //#region 讀取中央資料
        //讀取中央資料
        const order = useSelector((state)=>{
            return(
                state.order.orderData
            )
        })
        useEffect(()=>{console.log("order資料:",order);},[order]);
    //#endregion

    //#region 讀取中央資料
        //讀取中央資料
        const resetTrigger = useSelector((state)=>{
            return(
                state.order.resetTrigger
            )
        })

        useEffect(()=>{
            if(!resetTrigger){
                return;
            }else if(resetTrigger){
                resetAll();
                dispatch(resetTriggerOff());
            }
            console.log("resetTrigger狀態:",resetTrigger);
        },[resetTrigger])
    //#endregion

    //#region ref宣告
    const EstimatePageMain2Ref = useRef(null);
    const EstimatePageMain3Ref = useRef(null);
    const EstimatePageMain4Ref = useRef(null);
    const EstimatePageMain5Ref = useRef(null);
    //#endregion

    //#region 滾動函式
    const scrollToRef = (ref) => {

        const refData = ref?.current;

        if (!refData) return;

        //取得id為siteHeader的dom
        const headerEl = document.getElementById("siteHeader");
        //取出dom的高度
        const headerHeight = headerEl.offsetHeight;
        //.offsetHeight是DOM的實際渲染高度

        const top = refData.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        //.getBoundingClientRect單純計算高度
        window.scrollTo({ top, behavior: "smooth" });
        
    };
    //#endregion

    //#region 每頁要用的「下一頁」函式
    const toEstimatePageMain2 = () => scrollToRef(EstimatePageMain2Ref);
    const toEstimatePageMain3  = () => scrollToRef(EstimatePageMain3Ref);
    const toEstimatePageMain4 = () => scrollToRef(EstimatePageMain4Ref);
    const toEstimatePageMain5  = () => scrollToRef(EstimatePageMain5Ref);
    //#endregion

    //#region 創建訂單預設資料
        const [orderData, setOrderData] = useState({
            imgFileUrl: "",        // 縮圖檔案的 URL
            imgFileId:"",          // 縮圖檔案的id
            imgFile:null,          // 縮圖檔案
            num: 1,                // 數量
            technique:"3D列印",    // 製程
            material:"",           //材料
            color:"",              //顏色
            price:0,               //預設價格

            supportMaterial: 10,   // 支撐材（mm）
            wallThickness: 50,     // 壁厚（% 或 mm，看你定義）
            supportDensity: 10,    // 支撐材密度（% 或 mm）

            orderType: "",   // 工期類型：slow / normal / urgent
            productionTime: "",    // 訂單製作時間
            productionEndTime: "", // 預計訂單製作結束時間
        });

        useEffect(()=>{console.log("訂單資料:",orderData)},[orderData]);
    //#endregion

    //#region 重置觸發狀態宣告
        const [main1ResetKey, setMain1ResetKey] = useState(null);
        const [main2ResetKey, setMain2ResetKey] = useState(null);
        const [main3ResetKey, setMain3ResetKey] = useState(null);
        const [main4ResetKey, setMain4ResetKey] = useState(null);
    //#endregion

    //#region 清除全選項函式
    const resetAll =()=>{          
        setMain1ResetKey(true);
        setMain2ResetKey(true);
        setMain3ResetKey(true);
        setMain4ResetKey(true);
        console.log("數據已清空");
    }
    //#endregion

    



    return(
        <>
            <div className="EstimatePageMain1-box">
                <EstimatePageMain1  toEstimatePageMain2={toEstimatePageMain2} 
                                    loginState={loginState} 
                                    orderData={orderData} 
                                    setOrderData={setOrderData} 
                                    main1ResetKey={main1ResetKey}
                                    setMain1ResetKey={setMain1ResetKey}
                />
            </div> 
            <div ref={EstimatePageMain2Ref} className="EstimatePageMain2-box">
                <EstimatePageMain2  orderData={orderData} 
                                    setOrderData={setOrderData} 
                                    toEstimatePageMain3={toEstimatePageMain3}
                                    main2ResetKey={main2ResetKey}
                                    setMain2ResetKey={setMain2ResetKey}
                />
            </div> 
            <div ref={EstimatePageMain3Ref} className="EstimatePageMain3-box">
                <EstimatePageMain3  orderData={orderData} 
                                    setOrderData={setOrderData} 
                                    toEstimatePageMain4={toEstimatePageMain4}
                                    main3ResetKey={main3ResetKey}
                                    setMain3ResetKey={setMain3ResetKey}
                />
            </div> 
            <div ref={EstimatePageMain4Ref} className="EstimatePageMain4-box">
                <EstimatePageMain4  orderData={orderData} 
                                    setOrderData={setOrderData} 
                                    toEstimatePageMain5={toEstimatePageMain5}
                                    main4ResetKey={main4ResetKey}
                                    setMain4ResetKey={setMain4ResetKey}
                />
            </div> 
            <div ref={EstimatePageMain5Ref} className="EstimatePageMain5-box">
                <EstimatePageMain5  orderData={orderData} 
                                    setOrderData={setOrderData}
                                    resetAll={resetAll}
                />
            </div> 
        </>
    )
}
export default EstimatePage;