



import './_AboutUsPageMain3.scss';

function AboutUsPageMain3(){

    return(
        <>
            <div className="AboutUsMain3">
                <div className="AboutUsMain3-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className='AboutUsMain3-content'>
                                    <div className="row row-gap-12 row-gap-lg-0">
                                        <div className="col-12 col-lg-8">
                                            <div className='AboutUsMain3-Introduce-box'>
                                                <div className="AboutUsMain3-title">
                                                    <h3 className="title-set">售後服務</h3>
                                                </div>
                                                <div className="AboutUsMain3-text-box1"> 
                                                    <p className="text-set">
                                                        為保障您的權益，在收貨時請注意以下幾點 : <br/>簽收前請當面與貨運人員前進行開箱清點，產品名稱、產品數量、發貨清單。
                                                    </p>
                                                    <p className="text-set">
                                                        3D列印服務：<br/>各類材料的3D列印,包括PLA ABS 樹脂等。適用於原型製作、小批量生產及個性化定制。
                                                    </p>
                                                    <p className="text-set">
                                                        如存在列印問題、產品錯誤、產品短缺、產品品質等問題請立刻聯繫我們。
                                                    </p>
                                                    <p className="text-set">
                                                        為了維護權益，請勿請他人簽收產品，如簽收後有疑義，後果請自行承擔。
                                                    </p>
                                                </div>
                                                <div className="AboutUsMain3-text-box2"> 
                                                    <p className="text-set titleColor fw-set">
                                                        如產品有問題請在1日內反應。
                                                    </p>
                                                    <p className="text-set fw-set">
                                                        LINE客服：@come&buy3d
                                                    </p>
                                                    <p className="text-set fw-set">
                                                        (星期一至星期五8:30~17:30)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-4">
                                            <div className="AboutUsMain3-img-box-set">
                                                <picture className='picture'>
                                                    <source srcSet={`${import.meta.env.BASE_URL}assets/images/AboutUs/main3/aboutUs-main3-img01.png`} 
                                                            media="(min-width:1200px)" />
                                                    <img className="AboutUsMain3-img-set" 
                                                            src={`${import.meta.env.BASE_URL}assets/images/AboutUs/main3/aboutUs-main3-sm-img01.png`} 
                                                            alt="aboutUs-main3-sm-img01" />
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
export default AboutUsPageMain3;