

import { useEffect, useState } from 'react';
import './_EstimatePageMain5.scss';
import { open, MODALS } from "../../../slice/modalSlice";
import { useDispatch, useSelector } from 'react-redux';
import { upLoad } from '../../../slice/orderSlice';




function EstimatePageMain5({ orderData }){

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 讀取中央資料
        //讀取中央資料
        const order = useSelector((state)=>{
            return(
                state.order.orderData
            )
        })
    //#endregion

    //#region 讀取中央資料
        const handleOrderModelOpen = () =>{
            dispatch(upLoad(orderData));
            dispatch(open(MODALS.OrderModel));
        }
    //#endregion


    return(
        <>
            <div className="EstimatePageMain5">
                <div className="EstimatePageMain5-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className='EstimatePageMain5-content'>
                                    <div className="EstimatePageMain5-title">
                                        <h3 className="title-set">注意事項！！！<span className='d-block d-lg-none'></span>產品交期說明</h3>
                                    </div>

                                    <div className="EstimatePageMain5-text-box"> 
                                        <p className="text-set">急單：3個工作天出貨，且有失敗風險，請與業務聯繫。</p>
                                        <p className="text-set">一般單：3~6個工作天出貨。</p>
                                        <p className="text-set">不急單：6~10個工作天出貨、依排程而定。</p>
                                    </div>

                                    <div className="EstimatePageMain5-note-box">
                                        <span className="material-symbols-outlined note-icon-set">
                                            error
                                        </span>
                                        <div className="note-text-box">
                                            <p className="text-set">
                                                此時間為出貨時間，非到貨時間
                                            </p>
                                            <p className="text-set">
                                                產品實際交期及價格依訂單回覆內容而定如有特殊狀況將由客服人員與您聯繫
                                            </p>
                                        </div>
                                    </div>

                                    <div className="EstimatePageMain5-checkBtn-box">
                                        <button className="EstimatePageMain5-checkBtn-set mian-btn1-set" 
                                                type="button" 
                                                onClick={()=>{handleOrderModelOpen();}}
                                        >   
                                            送出估價
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EstimatePageMain5;





