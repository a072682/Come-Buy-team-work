import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './_OrderCheckModel.scss';
import { orderModelErrorMsgUpLoad, orderModelErrorStateUpLoad, resetOrder, resetTriggerOn } from "../../../../slice/orderSlice";




const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function OrderCheckModel ({ onClose }){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //#region
    //#endregion

    //#region 讀取中央資料
        //讀取中央資料
        const errorMsg = useSelector((state)=>{
            return(
                state.order.OrderModelErrorMsg
            )
        })
        useEffect(()=>{
            if(errorMsg === "訂單上傳完成，稍後傳送至首頁。"){
                //#region 觸發訂單資料送出後資料初始化動作
                    setTimeout(() => {  
                        //觸發重置信號
                        dispatch(resetTriggerOn());
                        //觸發重置信號

                        //清除錯誤訊息
                        dispatch(orderModelErrorMsgUpLoad(null));
                        //清除錯誤訊息

                        //重置錯誤狀態
                        dispatch(orderModelErrorStateUpLoad(false));
                        //重置錯誤狀態

                        //關閉OrderCheck
                        onClose?.();
                        //關閉OrderCheck

                        //跳轉至首頁
                        navigate("/");
                        //跳轉至首頁
                        
                    }, 2000); // 2000 毫秒 = 2 秒
                //#endregion
            }
            console.log("錯誤訊息:",errorMsg)
        },[errorMsg]);
    //#endregion

    //#region 讀取中央資料
        //讀取中央資料
        const errorState = useSelector((state)=>{
            return(
                state.order.errorState
            )
        })
        useEffect(()=>{console.log("錯誤狀態:",errorState)},[errorState]);
    //#endregion
    
    

    return(
        <>
            {/* 遮罩 */}
            <div className="modal orderCheckModel" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                {/* 定位至置中效果 */}
                <div className="modal-dialog">

                    {/* model整體元件 */}
                    <div className="modal-content border-0 ">

                        {/* 本體設定 */}
                        <div className="modal-body orderCheckModelBodyBgSet">
                            {
                                errorState?
                                (
                                     <p className="text-set">{errorMsg}</p>
                                )
                                :
                                (
                                    <>
                                        <p className="text-set">{errorMsg}</p>
                                        <button onClick={()=>{  onClose?.();
                                                                
                                        }} type="button" className="orderCheckModelBtnClose" aria-label="Close">
                                            <img className="materialPageModalBtnCloseImgSet" src={`${import.meta.env.BASE_URL}assets/images/EstimatePage/EstimatePage-main5-modal-btn-close.png`} alt="Close" />
                                        </button>
                                    </>
                                )
                            }
                            
                        </div>

                    </div>
                </div>
            </div>
            
        </>
    )
}
export default OrderCheckModel;