

import { useEffect, useState } from 'react';
import './_MyOrder.scss';
import { orderDataDelete, orderDataGet, userOrderListUpLoad, userOrderUpLoad } from '../../../slice/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MODALS, open } from '../../../slice/modalSlice';
import { AnimatePresence, motion } from 'framer-motion';



function MyOrder ({triggerSet,fadeUp}){
    
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
        useEffect(()=>{
            //console.log("列表資料",orderListData)
        },[orderListData])
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

    //#region 刪除訂單函式
    const handleDeleteOrderData = (id) =>{
        dispatch(orderDataDelete({orderId: id}));
    }
    //#endregion

    

    return(
        <>
        <AnimatePresence>
            <article className="MyOrder">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <motion.div className='MyOrder-content-box'
                                        variants={triggerSet}
                                        initial="hidden"
                                        whileInView="show"                      
                                        viewport={{ amount: 0, margin: "0% 0px -20% 0px" }}>
                                <motion.h2  className='title-set'
                                            variants={fadeUp}>我的訂單</motion.h2>
                                <motion.div className='orderList-box'
                                            variants={fadeUp}>
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
                                        <div className='title-set'>
                                            <p className='title-text-set'>移除訂單</p>
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
                                                        <div className='btn-set-box'>
                                                            <button className='btn-set' 
                                                                    onClick={()=>{handleDeleteOrderData(item.id)}}>
                                                                訂單移除
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </article>
        </AnimatePresence>
        </>
    )
}
export default MyOrder;