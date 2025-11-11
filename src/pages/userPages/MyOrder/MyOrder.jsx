

import { useEffect, useState } from 'react';
import './_MyOrder.scss';
import { orderDataGet, userOrderListUpLoad, userOrderUpLoad } from '../../../slice/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MODALS, open } from '../../../slice/modalSlice';




function MyOrder (){
    
    //#region
    //#endregion

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 讀取中央登入資料
        //讀取中央資料
        const orderListData = useSelector((state)=>{
            return(
                state.order.userOrderListData
            )
        })
        useEffect(()=>{},[orderListData])
    //#endregion

    //#region 取得訂單函式
        const handleGetMyOrderData = async()=>{
            try{
                const orderDataRef = await dispatch(orderDataGet()).unwrap();
                console.log("確認取得訂單資料",orderDataRef);
                dispatch(userOrderListUpLoad(orderDataRef.orderData));
            }catch(error){
                console.log("取得訂單資料失敗",error);
            }
        }
    //#endregion

    //#region 取得訂單資料
    useEffect(()=>{
        handleGetMyOrderData();
    },[])
    //#endregion

    //#region 開啟Modal函式
    const handleOpenOrderDetailModal = (data) =>{
        dispatch(userOrderUpLoad(data));
        dispatch(open(MODALS.OrderDetailModal));
    }
    //#endregion

    //#region 審核狀態列表
    const statusLabel = {
        approved: "已審核",
        rejected: "已駁回",
        wait: "審核中",
    };
    //#endregion

    

    return(
        <>
        <div className="MyOrder">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className='MyOrder-content-box'>
                            <h3 className='title-set'>我的訂單</h3>
                            <div className='orderList-box'>
                                <div className='order-title-box'>
                                    <div className='title-set'>
                                        <p className='title-text-set'>訂單編號</p>
                                    </div>
                                    <div className='title-set'>
                                        <p className='title-text-set'>檔案縮圖</p>
                                    </div>
                                    <div className='title-set'>
                                        <p className='title-text-set'>訂單詳情</p>
                                    </div>
                                    <div className='title-set'>
                                        <p className='title-text-set'>審核狀態</p>
                                    </div>
                                    {/* 樣品材料.樣品規格.製作開始日期.預定完成日期.付款方式 */}
                                </div>
                                <div className='order-item-box'>
                                    {
                                        orderListData?.map((item)=>{
                                            return(
                                                <div key={item.id} className='item-set'>
                                                    <div className='text-set-box'>
                                                        <p className='text-set'>{item.id}</p>
                                                    </div>
                                                    <div className='img-set-box'>
                                                        <img className='img-set' src={item.imgfileurl} alt={item.imgfileid} />
                                                    </div>
                                                    <div className='btn-set-box'>
                                                        <button className='btn-set' 
                                                                onClick={()=>{handleOpenOrderDetailModal(item)}}>
                                                            訂單詳情
                                                        </button>
                                                    </div>
                                                    <div className='text-set-box'>
                                                        <p className='text-set'>
                                                        {
                                                            statusLabel[item.state] ?? "未知狀態"
                                                        }
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
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
export default MyOrder;