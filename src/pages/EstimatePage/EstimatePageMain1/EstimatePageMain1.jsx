

import { useEffect, useState } from 'react';
import './_EstimatePageMain1.scss';
import { useDispatch, useSelector } from 'react-redux';
import { MODALS, open } from '../../../slice/modalSlice';
import { imgTriggerClose, imgUploadDoneOff, imgUploadDoneOn, mergeOrderData, orderImgUpLoad, orderImgUpLoadChange, orderModelErrorMsgUpLoad, upLoad } from '../../../slice/orderSlice';




function EstimatePageMain1({ toEstimatePageMain2, loginState, orderData, setOrderData, main1ResetKey, setMain1ResetKey}){

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 本地圖片顯示狀態
        const [pendingFile, setPendingFile] = useState(null);     // 尚未上傳的 File 物件
        useEffect(()=>{},[pendingFile]);
        const [previewUrl, setPreviewUrl] = useState('');         // 本地預覽 URL
        useEffect(()=>{},[previewUrl]);
        //本地圖片顯示狀態
    //#endregion

    //#region 讀取中央資料
        //讀取中央資料
        const Trigger = useSelector((state)=>{
            return(
                state.order.imgTrigger
            )
        })
        useEffect(()=>{
            if (!Trigger) return;
            const handleImgUpLoad = async()=>{
                try{
                    let imgData;
                    if(Trigger){
                        if(!orderData?.imgFileId){
                            imgData = await orderPreviewImgUpload();
                        }else{
                            imgData = await orderPreviewImgUpChange()
                        }
                    }
                    dispatch(mergeOrderData(imgData));
                    dispatch(imgUploadDoneOn());
                }catch (error){
                    console.log("圖片上傳失敗",error);
                    dispatch(imgUploadDoneOff());
                }finally {
                    dispatch(imgTriggerClose());
                }
            }
            handleImgUpLoad()
        },[Trigger])
    //#endregio

    //#region 樣品圖片儲存狀態宣告
        // const [orderImgData,setOrderImgData] = useState(null);
        // useEffect(()=>{},[orderImgData]);
        // const [orderImgIdData,setOrderImgIdData] = useState(null);
        // useEffect(()=>{},[orderImgIdData]);
    //#endregion

    //#region 樣品圖片上傳函式
        // const orderImgUpload = async(event)=>{
        //     const { files } = event.target;
        //     const orderFile = files?.[0];
        //     if (!orderFile) {                               
        //         alert('請先選擇檔案');
        //         return;
        //     }
        //     const orderImg = new FormData();               
        //     orderImg.append('image', orderFile);
        //     try{
        //         const orderImgData = await dispatch(orderImgUpLoad( {orderImgData:orderImg})).unwrap();
        //         console.log("圖片上傳成功",orderImgData);
        //         setOrderData({
        //             ...orderData,
        //             imgId: orderImgData.filename,             
        //             imgFileUrl: orderImgData.url,        
        //         });
        //         setOrderImgData(orderImgData.url);
        //         setOrderImgIdData(orderImgData.filename);
        //     }catch(error){
        //         console.log("圖片上傳失敗",error.response.data.error);
        //     }
        // }
    //#endregion

    //#region 訂單預覽圖片上傳函式
        const orderPreviewImgUpload = async()=>{
            const orderPreviewImgFile = pendingFile;
            const orderPreviewImg = new FormData();               
            orderPreviewImg.append('image', orderPreviewImgFile);
            try{
                const orderPreviewImgUploadRef = await dispatch(orderImgUpLoad( {orderImgData:orderPreviewImg})).unwrap();
                console.log("訂單預覽圖片上傳成功",orderPreviewImgUploadRef);
                setOrderData({
                    ...orderData,
                    imgFileId: orderPreviewImgUploadRef.filename,             
                    imgFileUrl: orderPreviewImgUploadRef.url,        
                });
                console.log("上傳完成");
                return { imgFileUrl: orderPreviewImgUploadRef.url, imgFileId: orderPreviewImgUploadRef.filename };
            }catch(error){
                console.log("訂單預覽圖片上傳失敗",error);
                // dispatch(orderModelErrorMsgUpLoad());
                
            }
        }
    //#endregion

    //#region 訂單預覽圖片覆蓋函式
        const orderPreviewImgUpChange = async()=>{
            const orderPreviewImgChangeFile = pendingFile;
            const orderPreviewImg = new FormData();       
            orderPreviewImg.append('public_id', orderData?.imgFileId);        
            orderPreviewImg.append('image', orderPreviewImgChangeFile);
            try{
                const orderPreviewImgUpChangeRef = await dispatch(orderImgUpLoadChange( {orderImgData:orderPreviewImg})).unwrap();
                console.log("訂單預覽圖片覆蓋成功",orderPreviewImgUpChangeRef);
                setOrderData({
                    ...orderData,
                    imgFileId: orderPreviewImgUpChangeRef.filename,             
                    imgFileUrl: orderPreviewImgUpChangeRef.url,          
                });
                console.log("上傳完成");
                return { imgFileUrl: orderPreviewImgUpChangeRef.url, imgFileId: orderPreviewImgUpChangeRef.filename, };
            }catch(error){
                console.log("訂單預覽圖片覆蓋失敗",error);
            }
        }
    //#endregion

    //#region
    const orderImgSelect = (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            console.log("請選擇檔案")
            return;
        }

        // 可選：型別/大小檢查
        const allowTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowTypes.includes(file.type)) {
            alert('只接受 JPG/PNG/WEBP 圖片');
            event.target.value = '';
            return;
        }

        // 釋放舊的 URL
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        //URL.createObjectURL生成一個臨時 URL，可以直接放進 <img> 顯示圖片。
        const url = URL.createObjectURL(file);
        setPendingFile(file);
        setPreviewUrl(url);
        setOrderData({
            ...orderData,
            imgFileUrl:url,
        })

        // 允許再次選同一檔案
        event.target.value = '';
    };
    //#endregion

    //#region 加法按鈕
        const handleNumAddBtn = ()=>{
            if(!previewUrl){
                alert("請先上傳圖檔")
            }else{
                setOrderData(
                    {
                        ...orderData,
                        num: orderData.num + 1,
                    }
                )
            }
        }
    //#endregion

    //#region 減法按鈕
        const handleNumSubBtn = ()=>{
            if(!previewUrl){
                alert("請先上傳圖檔")
            }else{
                setOrderData(
                    {
                        ...orderData,
                        num: Math.max(1, orderData.num - 1),
                    }
                )
            }
        }
    //#endregion
    
    //#region Main1初始化函式
        const handleMain1Reset = ()=>{
            setPendingFile(null);
            setPreviewUrl("");
            setOrderData(
                {
                    ...orderData,
                    imgFileId:"",
                    imgFileUrl: "",       
                    imgFile:null,     
                    num: 1,
                }
            )
        }
    //#endregion

    //#region 觸發初始化
    useEffect(()=>{
        if(main1ResetKey){
            handleMain1Reset();
            setMain1ResetKey(null);
        }
    },[main1ResetKey]);
    //#endregion


    return(
        <>
            <div className="EstimatePageMain1">
                <div className="EstimatePageMain1-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className='EstimatePageMain1-content'>
                                    <div className="EstimatePageMain1-title">
                                        <h3 className="title-set">線上估價</h3>
                                    </div>
                                    
                                    <div className="EstimatePageMain1-ImgUpLord-box">

                                        <div className="left-box">

                                            <div className="textTitle-box">
                                                <h5 className="textTitleSet">圖檔上傳</h5>
                                            </div>

                                            <div className="text-box">
                                                <p className="text-set">請上傳檔案或將檔案拖曳至此</p>
                                                <p className="text-set">最多上傳10個檔案</p>
                                                <p className="text-set">格式：.stl | 大小: &lt; 30MB</p>
                                                {/*格式：.stl | 大小： < 30MB*/}
                                            </div>
                                        </div>

                                        
                                        <div className="middle-box"> 

                                            {/*lg以上內容*/}
                                            <button className="upLord-btn-set d-none d-lg-block" 
                                                    onClick={()=>{loginState ? document.getElementById("fileInput").click() : dispatch(open(MODALS.LOGIN))}}>
                                                <div className="upLord-img-box">
                                                    <img className="upLord-img-set" 
                                                        src={`${import.meta.env.BASE_URL}assets/images/EstimatePage/main1/EstimatePage-main1-upLord-btn.png`} 
                                                        alt="upLord-img" 
                                                    />
                                                    <div className='upLordTipImg-box addAnimation'>
                                                        <img className='upLordTipImg-set' 
                                                            src={`${import.meta.env.BASE_URL}assets/images/EstimatePage/tipImg.png`} 
                                                            alt="upLordTipImg">
                                                        </img>
                                                        <p className='upLordTipText-set'>請點加號<br />上傳圖片<br />或修改圖片</p>
                                                    </div>
                                                </div>
                                            </button>
                                            <input type="file" id="fileInput" accept="image/*" className="d-none" onChange={(event)=>{orderImgSelect(event)}}/>
                                            {/*lg以上內容*/}

                                            {/*lg以下內容*/}
                                            <button 
                                                className="noteBtn-mb-set d-blcok d-lg-none" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#oEstimate-main1-Modal"
                                                onClick={()=>{dispatch(open(MODALS.OestimateModal))}}
                                            >
                                                <span className="material-symbols-outlined">
                                                    error 
                                                </span>
                                                檔案格式說明
                                            </button>
                                            {/*lg以下內容*/}

                                        </div>

                                        <div className="bottom-box">

                                            {/*lg以上內容*/}
                                            <button 
                                                className="noteBtn-set d-none d-lg-flex" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#oEstimate-main1-Modal"
                                                onClick={()=>{dispatch(open(MODALS.OestimateModal))}}
                                            >
                                                <span className="material-symbols-outlined">
                                                    error 
                                                </span>
                                                檔案格式說明
                                            </button>
                                            {/*lg以上內容*/}

                                            {/*lg以下內容*/}
                                            <button className="upLord-btn-mb-set d-blcok d-lg-none" 
                                                    onClick={()=>{loginState ? document.getElementById("fileInput").click() : dispatch(open(MODALS.LOGIN))}}
                                            >
                                                <div className="upLord-img-box">
                                                    <img className="upLord-img-set" 
                                                        src={`${import.meta.env.BASE_URL}assets/images/EstimatePage/main1/EstimatePage-main1-upLord-btn-sm.png`} 
                                                        alt="upLord-img" 
                                                    />
                                                </div>
                                            </button>
                                            <input type="file" id="fileInput" accept="image/*" className="d-none" onChange={(event)=>{orderImgSelect(event)}}/>
                                            <div className='upLordTipImg-sm-box d-blcok d-lg-none'>
                                                <p className='upLordTipText-set'>請點加號<br />上傳圖片或修改圖片</p>
                                            </div>
                                            {/*lg以下內容*/}

                                        </div>
                                            
                                    </div>

                                    <div className='EstimatePageMain1-below-box'>

                                        <div className='ImagePreview-box'>
                                            <div className='ImagePreview-title'>
                                                <h3 className='title-set'>圖檔上傳預覽</h3>
                                            </div> 
                                            {
                                                previewUrl?
                                                (
                                                    <div className="ImagePreview-set imgActive">
                                                        <img className="ImagePreview-img-set" 
                                                            src={previewUrl} 
                                                            alt="index-main1-Image" 
                                                        />
                                                    </div>
                                                )
                                                :
                                                (
                                                    <>
                                                        <div className="ImagePreview-set">
                                                            <div className="ImagePreview-img-box">
                                                                <img className="ImagePreview-img-set" 
                                                                    src={`${import.meta.env.BASE_URL}assets/images/EstimatePage/main1/EstimatePage-main1-Image.png`} 
                                                                    alt="index-main1-Image" 
                                                                />
                                                            </div>
                                                            <div className="ImagePreview-text-box">
                                                                <p className="text-set">
                                                                    目前無檔案<span className="d-none">，</span><span className="d-block"></span>請上傳圖檔進行估價確認
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            
                                        </div>

                                        <div className='detail-box'>
                                            <div className='detail-title'>
                                                <h3 className='title-set'>圖檔資料</h3>
                                            </div>
                                            <div className="detail-table-box">
                                                <div className="title-row">
                                                    <div className="title-text-set">檔案縮圖</div>
                                                    <div className="title-text-set">數量</div>
                                                </div>
                                                <div className="table-content-box">
                                                    <div className="table-img-item">
                                                        {
                                                            previewUrl?
                                                            (
                                                                <>
                                                                    <img className="table-img-set imgActive" 
                                                                    src={previewUrl}
                                                                    alt="table-img" />
                                                                </>
                                                            )
                                                            :
                                                            (
                                                                <>
                                                                    <img className="table-img-set" 
                                                                    src={`${import.meta.env.BASE_URL}assets/images/EstimatePage/main1/EstimatePage-main1-Image.png`}
                                                                    alt="table-img" />
                                                                </>
                                                            )
                                                        }
                                                        
                                                    </div>
                                                    <div className="table-item">
                                                        <button className="itemAddBtn-set" onClick={()=>{handleNumAddBtn()}}>
                                                            <img className="itemAddBtn-img-set" 
                                                                src={`${import.meta.env.BASE_URL}assets/images/EstimatePage/main1/EstimatePage-main1-input-minus-plus.png`}
                                                                alt="itemAddBtn-img" />
                                                        </button>

                                                        <p className="item-set">{orderData.num}</p>

                                                        <button className="itemSubBtn-set" onClick={()=>{handleNumSubBtn()}}>
                                                            <img className="itemSubBtn-img-set" 
                                                                src={`${import.meta.env.BASE_URL}assets/images/EstimatePage/main1/EstimatePage-main1-input-minus.png`} 
                                                                alt="itemSubBtn-img" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="EstimatePageMain1-next-btn">
                                        <button type='button' className='pagination-btn01' onClick={()=>{toEstimatePageMain2()}}>
                                            <img className="pagination-img01-set" 
                                                src={`${import.meta.env.BASE_URL}assets/images/EstimatePage/main3/EstimatePage-main3-Vector15.png`} 
                                                alt="Vector 15" 
                                            />
                                        </button>
                                        <div className='EstimatePageMain1-next-btn-box'>
                                            <p className='nextBtnTipText-set'><span className='d-none d-sm-inline'>前往下一頁</span>選擇材料</p>
                                        </div>
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
export default EstimatePageMain1;

