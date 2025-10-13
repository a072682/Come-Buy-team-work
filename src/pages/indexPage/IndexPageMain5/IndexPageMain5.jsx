import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";// 核心 CSS
import "swiper/css/navigation";// 左右箭頭
import './_IndexPageMain5.scss';


function IndexPageMain5(){

    const main5Data = [
    {
        title:"2024材料與應用展即將來臨",
        content:"第十三屆材料與應用大展將於2024年10月20日盛大登場，聚焦前沿科技與創新應用，精彩不容錯過。",
        html:"https://www.imttaiwan.com/",
        img: `${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-mian5-img01.png`,
        imgSm: `${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-mian5-sm-img01.png`
    },
    {
        title:"Come&Buy榮獲藍點設計獎",
        content:"好消息！恭喜Come&Buy榮獲藍點設計獎，這一殊榮肯定了我們在3D列印與創新設計領域的卓越表現。",
        html:"https://www.imttaiwan.com/",
        img:`${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-mian5-img02.png`,
        imgSm: `${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-mian5-sm-img02.png`,
    },
    {
        title:"新材料現世！！！",
        content:"德國杜瓦實驗室發表最新型奈米級技術,將在材料科學與應用領域帶來突破性進展。",
        html:"https://www.imttaiwan.com/",
        img:`${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-mian5-img03.png`,
        imgSm: `${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-mian5-sm-img03.png`,
    },
    {
        title:"2024材料與應用展即將來臨",
        content:"第十三屆材料與應用大展將於2024年10月20日盛大登場，聚焦前沿科技與創新應用，精彩不容錯過。",
        html:"https://www.imttaiwan.com/",
        img: `${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-mian5-img01.png`,
        imgSm: `${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-mian5-sm-img01.png`
    },
    {
        title:"Come&Buy榮獲藍點設計獎",
        content:"好消息！恭喜Come&Buy榮獲藍點設計獎，這一殊榮肯定了我們在3D列印與創新設計領域的卓越表現。",
        html:"https://www.imttaiwan.com/",
        img:`${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-mian5-img02.png`,
        imgSm: `${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-mian5-sm-img02.png`,
    },
    {
        title:"新材料現世！！！",
        content:"德國杜瓦實驗室發表最新型奈米級技術,將在材料科學與應用領域帶來突破性進展。",
        html:"https://www.imttaiwan.com/",
        img:`${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-mian5-img03.png`,
        imgSm: `${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-mian5-sm-img03.png`,
    },
]

    return(
        <>
            <div className="main5">
                <div className="container">        {/*外框 要增加y軸pd在這邊加*/}
                    <div className="row">
                        <div className="col-12">
                            <div className="main5-content">
                                
                                    
                                        <div className="main5-title">
                                            <h2 className="main5-title-set">最新消息</h2>
                                        </div>
                                   
                                    
                                        <div className="swiper-box">
                                            <Swiper
                                                modules={[Navigation, Pagination, Autoplay]}
                                                spaceBetween={0}
                                                slidesPerView={1}
                                                navigation={{ prevEl: ".swiper-next-L-btn", nextEl: ".swiper-next-R-btn" }}
                                                loop={true}
                                                centeredSlides={true}
                                                className="mySwiper"
                                                breakpoints={{
                                                    768: { 
                                                        slidesPerView: 2,
                                                        spaceBetween: 32,
                                                        centeredSlides: false,
                                                    }, // 電腦顯示 3 張
                                                    1200: { 
                                                        slidesPerView: 3,
                                                        spaceBetween: 32,
                                                        centeredSlides:true,
                                                    }, // 電腦顯示 3 張
                                                }}
                                            >
                                                {
                                                    main5Data?.map((itme,index)=>{
                                                        return(
                                                            <SwiperSlide key={index}>
                                                                <div className="main5-card">
                                                                    <div className="main5-card-img-box main5-card-img-box-set mx-auto">
                                                                        <picture>
                                                                            <source srcSet={itme.img} media="(min-width:1400px)" />
                                                                            <img className="img-set" src={itme.imgSm} alt={itme.title} />
                                                                        </picture>
                                                                    </div>
                                                                    <div className="main5-card-text-box">
                                                                        <div className="d-flex flex-column">
                                                                            <h5 className="fw-700 text-nautral-white">
                                                                                {itme.title}
                                                                            </h5>
                                                                            <time className="fw-500 text-primary3" dateTime="2024/04/01">
                                                                                2024/04/01
                                                                            </time>
                                                                            <p className="fw-500 text-nautral-white">
                                                                                {itme.content}
                                                                            </p>
                                                                        </div>

                                                                        <a className="main5CardBtn-set secondary-btn1-set" 
                                                                            href={itme.html} target="_blank">
                                                                                閱讀更多
                                                                            <span className="material-symbols-outlined sec-btn1-img-set">
                                                                                chevron_right
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        )
                                                    })
                                                }
                                            </Swiper>
                                            {/* swiper左右按鈕 */}
                                            <div className="swiper-btn-box">
                                                <button className="swiper-next-R-btn carousel-btn-R">
                                                    <div className="img-box">
                                                        <img className="img-set" src={`${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-main5-arrowR.png`} alt="index-main5-arrowR" />
                                                    </div>
                                                </button>
                                                <button className="swiper-next-L-btn carousel-btn-L">
                                                    <div className="img-box">
                                                        <img className="img-set" src={`${import.meta.env.BASE_URL}assets/images/IndexPage/main5/index-main5-arrowL.png`} alt="index-main5-arrowL" />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    
                                    
                                        <div className="main5-checkBtn-box d-flex justify-content-center align-items-center">
                                            <Link className="mian5-checkBtn-Set mian-btn1-set" to="/EstimatePage">
                                                開始製作
                                            </Link>
                                        </div>
                                    
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default IndexPageMain5;