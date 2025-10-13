
import { Link } from 'react-router-dom';
import './_IndexPageMain1.scss';


function IndexPageMain1(){
    return(
        <>
            <div className="main1">
                <div className="main1-bg">
                <img className="main-corner-img" src={`${import.meta.env.BASE_URL}assets/images/IndexPage/main-sm-corner.png`} alt="main-sm-corner" />
                    <div className="container">{/*外框 要增加y軸pd在這邊加 sm用*/}
                        <div className="row">{/*外框 不動*/} 
                            <div className="col-12 col-xl-6"> {/*外框 控制欄數*/}
                            
                                <div className='main1-right-content'>
                                {/*內層外框*/}
                                    <div className="main1-title">
                                        <h1 className="main1-title-text-set">從想像到實物</h1>
                                        <h1 className="main1-title-text-set">只需Come & Buy</h1>
                                    </div>
                                    <Link className="main1-btn1-set mian-btn1-set" to="/EstimatePage">
                                        開始製作
                                    </Link>
                                    <div className="main1-img-box">
                                        <img className="main1-img" src={`${import.meta.env.BASE_URL}assets/images/IndexPage/main-frame.png`} alt="main-frame" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 d-none d-xl-block">
                                <div className='main1-left-content'>
                                    <div className="main1-img-box">
                                        <img className="main1-img" src={`${import.meta.env.BASE_URL}assets/images/IndexPage/main-frame.png`} alt="main-frame" />
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
export default IndexPageMain1;