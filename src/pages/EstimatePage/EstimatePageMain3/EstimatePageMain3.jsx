

import { useEffect, useState } from 'react';
import './_EstimatePageMain3.scss';


function EstimatePageMain3({orderData, setOrderData, toEstimatePageMain4, main3ResetKey, setMain3ResetKey}){

    // 初始 state
    const [main3GroupDataState, setMain3GroupDataState] = useState({
        supportMaterial: 10,
        wallThickness: 50,
        supportDensity: 10,
    });
    useEffect(()=>{},[main3GroupDataState]);

    // 點加號的時候
    const handleIncrement = (id) => {
        if(id === "wallThickness"){
            setOrderData(prev => ({
                ...prev,
                [id]: Math.min(prev[id] + 10, 50), 
                //上限50
            }));
        }else{
            setOrderData(prev => ({
                ...prev,
                [id]: Math.min(prev[id] + 1, 50), 
                //上限50
            }));
        }
    };
    // const handleIncrement = (id) => {
    //     if(id === "wallThickness"){
    //         setMain3GroupDataState(prev => ({
    //             ...prev,
    //             [id]: Math.min(prev[id] + 10, 50), 
    //         }));
    //     }else{
    //         setMain3GroupDataState(prev => ({
    //             ...prev,
    //             [id]: Math.min(prev[id] + 1, 50), 
    //         }));
    //     }
    // };
    

    // 點減號的時候
    const handleDecrement = (id) => {
        if(id === "wallThickness"){
            setOrderData(prev => ({
                ...prev,
                [id]: Math.max(prev[id] - 10, 1), 
                //下限1
            }));
        }else{
            setOrderData(prev => ({
                ...prev,
                [id]: Math.max(prev[id] - 1, 1), 
                //下限1
            }));
        }
    };
    // const handleDecrement = (id) => {
    //     if(id === "wallThickness"){
    //         setMain3GroupDataState(prev => ({
    //             ...prev,
    //             [id]: Math.max(prev[id] - 10, 0), 
    //         }));
    //     }else{
    //         setMain3GroupDataState(prev => ({
    //             ...prev,
    //             [id]: Math.max(prev[id] - 1, 0), 
    //         }));
    //     }
    // };

    //預設配置
    const handleMaterialDefault = ()=>{
        setOrderData((item)=>(({
            ...item,
            supportMaterial: 10,
            wallThickness: 50,
            supportDensity: 10,
        })))
    }

    const main3GroupData = [
        {
            id:"supportMaterial",
            labelTitle:"支撐材",
            unit:"mm",
        },
        {
            id:"wallThickness",
            labelTitle:"壁厚",
            unit:"%",
        },
        {
            id:"supportDensity",
            labelTitle:"支撐材密度",
            unit:"mm",
        },
    ]

    //#region Main3初始化函式
        const handleMain3Reset = ()=>{
            setOrderData((item)=>(({
                ...item,
                supportMaterial: 10,
                wallThickness: 50,
                supportDensity: 10,
            })))
        }
    //#endregion

    //#region 觸發初始化
        useEffect(()=>{
            if(main3ResetKey){
                handleMain3Reset();
                setMain3ResetKey(null);
            }
        },[main3ResetKey]);
    //#endregion

    return(
        <>
            <div className="EstimatePageMain3">
                <div className="EstimatePageMain3-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className='EstimatePageMain3-content'>
                                    <div className="EstimatePageMain3-title">
                                        <h3 className="title-set">規格設置</h3>
                                    </div>

                                    <div className="EstimatePageMain3-note-box">
                                        <span className="material-symbols-outlined note-icon-set">
                                            error
                                        </span>
                                        <div className="note-text-box">
                                            <p className="text-set">
                                                若無法確定規格，可點擊預設配置<span className='d-none d-lg-inline'>，</span><span className='d-block d-lg-none'></span>系統會自動帶出適合的規格設置。
                                            </p>
                                        </div>
                                    </div>
                                    <form className='EstimatePageMain3-form-box'>
                                        <div className='EstimatePageMain3-form-group-box'>
                                        {
                                            main3GroupData?.map((item,index)=>{
                                                return(
                                                    
                                                    <div key={item.id} className="EstimatePageMain3-group-box">
                                                        <label htmlFor={`EstimatePageMain3-input${index}`} className="label-set">
                                                            {item.labelTitle}
                                                        </label>

                                                        <div className="groupBody-box">
                                                            <input
                                                                className="input-set"
                                                                type="text" 
                                                                id={`EstimatePageMain3-input${index}`} 
                                                                placeholder="1mm" 
                                                                value={`${orderData[item.id]}${item.unit}`}
                                                                onChange={(e) => {
                                                                    const value = parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
                                                                    setOrderData(prev => ({
                                                                        ...prev,
                                                                        [item.id]: Math.min(Math.max(value, 0), 50),
                                                                    }));
                                                                }}
                                                            />
                                                            {/* 上下按鈕 */}
                                                            <div className='groupBtn-box'>
                                                                <button onClick={()=>{handleIncrement(item.id)}}
                                                                        className="addBtn-set" type="button">
                                                                    <picture>
                                                                        <source srcSet={`${import.meta.env.BASE_URL}assets/images/EstimatePage/main3/EstimatePage-main3-arrowUP.png`}   
                                                                                media="(min-width:1200px)" />
                                                                        <img className="addBtn-img-set" 
                                                                            src={`${import.meta.env.BASE_URL}assets/images/EstimatePage/main3/EstimatePage-main3-sm-arrowUP.png`} alt="home-section2-1" />
                                                                    </picture>
                                                                </button>
                                                                <button onClick={()=>{handleDecrement(item.id)}} 
                                                                        className="subBtn-set" type="button">
                                                                    <picture>
                                                                        <source srcSet={`${import.meta.env.BASE_URL}assets/images/EstimatePage/main3/EstimatePage-main3-arrowDOWN.png`}
                                                                                media="(min-width:1200px)" />
                                                                        <img className="subBtn-img-set" 
                                                                            src={`${import.meta.env.BASE_URL}assets/images/EstimatePage/main3/EstimatePage-main3-sm-arrowDOWN.png`}
                                                                            alt="home-section2-1" />
                                                                    </picture>
                                                                </button>
                                                            </div>
                                                            {/* 上下按鈕 */}
                                                        </div>
                                                    </div>
                                                    
                                                )
                                            })
                                        }
                                        </div>

                                        <div className="EstimatePageMain3-groupCheckBtn-box">
                                            <button onClick={()=>{handleMaterialDefault()}} className="groupCheckBtn-set mian-btn1-set" type="button">
                                                預設配置
                                            </button>
                                        </div>
                                        
                                    </form>
                                    <div className="EstimatePageMain3-next-btn">
                                        <button type='button' className='pagination-btn01' onClick={()=>{toEstimatePageMain4()}}>
                                            <img className="pagination-img01-set" 
                                                src={`${import.meta.env.BASE_URL}assets/images/EstimatePage/main3/EstimatePage-main3-Vector15.png`} 
                                                alt="Vector 15" 
                                            />
                                        </button>
                                        <div className='EstimatePageMain3-next-btn-box'>
                                            <p className='nextBtnTipText-set'><span className='d-none d-sm-inline'>前往下一頁</span>選擇日期</p>
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
export default EstimatePageMain3;



