

import './_AboutUsPageMain1.scss';


function AboutUsPageMain1(){
    return(
        <>
            <div className="AboutUsMain1">
                <div className="AboutUsMain1-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className='AboutUsMain1-content'>
                                    <div className="row row-gap-24 row-gap-lg-0">
                                        <div className="col-12 col-lg-6">
                                            <div className='AboutUsMain1-Introduce-box'>
                                                <div className="AboutUsMain1-title">
                                                    <h3 className="title-set ">關於我們</h3>
                                                </div>
                                                <div className="AboutUsMain1-text-box">
                                                    <p className="text-set">歡迎來到Come & Buy！</p>
                                                    <p className="text-set">自2018年成立以來，我們專注於3D列印技術，致力於為全球客戶提供高品質、精確且客制化的列印解決方案。</p>
                                                    <p className="text-set">我們的專業團隊擁有豐富的技術經驗，秉持著創新與卓越的精神，不斷突破技術極限，為每一位客戶實現創意與想像。</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            
                                            <div className="AboutUsMain1-img-box-set">
                                                <picture>
                                                    <source srcSet={`${import.meta.env.BASE_URL}assets/images/AboutUs/main1/aboutUs-main1-img01.png`} 
                                                            media="(min-width:992px)" />
                                                    <img    className="AboutUsMain1-img-set"
                                                            src={`${import.meta.env.BASE_URL}assets/images/AboutUs/main1/aboutUs-main1-sm-img01.png`} 
                                                            alt="images/aboutUs-main1-img01" />
                                                </picture>  
                                            </div>
                                            
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
export default AboutUsPageMain1;