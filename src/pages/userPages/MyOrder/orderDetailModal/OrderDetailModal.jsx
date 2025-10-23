import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './_OrderDetailModal.scss';




function OrderDetailModal ({onClose}){

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    const navigate = useNavigate();

    //#region
    //#endregion

    //#region 讀取中央登入資料
        //讀取中央資料
        const orderDetailData = useSelector((state)=>{
            return(
                state.order.userOrderData
            )
        })
        useEffect(()=>{
            // console.log("訂單資料",orderDetailData)
        },[orderDetailData])
    //#endregion
    
    //#region顯示訂單用資料
        const orderTypeMap = {
                slow: '不急單',
                normal: '一般單',
                urgent: '急單',
            };
        const orderItemData = [
                {
                    id:"orderItemData01",
                    title:"樣品圖縮圖",
                    content:orderDetailData?.imgfileurl,
                },
                {
                    id:"orderItemData02",
                    title:"價格估算",
                    content:orderDetailData?.num * orderDetailData?.price,
                },
                {
                    id:"orderItemData03",
                    title:"製程",
                    content:orderDetailData?.technique,
                },
                {
                    id:"orderItemData04",
                    title:"材料",
                    content:orderDetailData?.material,
                },
                {
                    id:"orderItemData05",
                    title:"顏色",
                    content:orderDetailData?.color,
                },
                {
                    id:"orderItemData06",
                    title:"數量",
                    content:orderDetailData?.num,
                },
                {
                    id:"orderItemData07",
                    title:"支撐材",
                    content:orderDetailData?.supportmaterial,
                },
                {
                    id:"orderItemData08",
                    title:"支撐材密度",
                    content:orderDetailData?.supportdensity,
                },
                {
                    id:"orderItemData09",
                    title:"壁厚",
                    content:orderDetailData?.wallthickness,
                },
                {
                    id:"orderItemData10",
                    title:"工期類型",
                    content: orderTypeMap[orderDetailData?.ordertype],
                },
                {
                    id:"orderItemData11",
                    title:"預計訂單製作時間",
                    content:orderDetailData?.productiontime.slice(0, 10),
                },
                {
                    id:"orderItemData12",
                    title:"預計訂單完成時間",
                    content:orderDetailData?.productionendtime.slice(0, 10),
                },
            ]
    //#endregion

    return(
        <>
            {/* 遮罩 */}
            <div className="modal orderDetailModal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                {/* 定位至置中效果 */}
                <div className="modal-dialog modal-dialog-centered">

                    {/* model整體元件 */}
                    <div className="modal-content border-0 ">

                        {/* header設定 */}
                        <div className="modal-header orderDetailModalHeaderBgSet">
                            <h3 className="title-set">估價訂單明細</h3>
                            <button onClick={()=>{onClose?.();}} type="button" className="orderDetailModalBtnClose" aria-label="Close">
                                <img className="materialPageModalBtnCloseImgSet" src={`${import.meta.env.BASE_URL}assets/images/EstimatePage/EstimatePage-main5-modal-btn-close.png`} alt="Close" />
                            </button>
                        </div>

                        {/* model本體背景 */}
                        <div className="orderDetailModal-body-set">
                            <div className="bodyContent-box">
                                {
                                    orderItemData?.map((item)=>{
                                        return(
                                            item.title === "樣品圖縮圖"?
                                            (
                                                
                                                <div key={item.id} className="item-set">
                                                    <div className="title-box">
                                                        <h4 className="title-set">樣品圖縮圖</h4>
                                                    </div>
                                                    <div className="img-box">
                                                        <img className="img-set" 
                                                            src={item.content || null} 
                                                            alt={item.title} />
                                                    </div>
                                                </div>
                                            )
                                            :
                                            (
                                                <div key={item.id} className="item-set">
                                                    <div className="title-box">
                                                        <h4 className="title-set">{item.title}</h4>
                                                    </div>
                                                    <div className="text-box">
                                                        <p className="text-set">{item.content}</p>
                                                    </div>
                                                </div>
                                            )
                                            
                                        )
                                    })
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default OrderDetailModal;