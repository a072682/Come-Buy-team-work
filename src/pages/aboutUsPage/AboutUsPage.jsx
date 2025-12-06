
import { useEffect, useRef } from "react";
import AboutUsPageMain1 from "./AboutUsPageMain1/AboutUsPageMain1";
import AboutUsPageMain2 from "./AboutUsPageMain2/AboutUsPageMain2";
import AboutUsPageMain3 from "./AboutUsPageMain3/AboutUsPageMain3";
import AboutUsPageMain4 from "./AboutUsPageMain4/AboutUsPageMain4";
import { useLocation } from "react-router-dom";




function AboutUsPage(){

    //#region
    //#endregion

    //#region 位置綁定宣告
    const contactUsRef = useRef(null);
    //#endregion
    
    //#region 取得位置
    const location = useLocation();
    //#endregion

    //#region 動畫設定
    const triggerSet = {
        hidden: { opacity: 0 },                 // 父層只當觸發器，不做淡入
        show: {
            opacity: 1,
            transition: {
            duration: 0,                        // 0：不要讓父層自己動畫造成等待
            //觸發動畫到第一個動畫的延遲時間
            delayChildren: 0.08,
            //第二個動畫到第三以及後續的延遲時間
            staggerChildren: 0.1,
            // 想骨牌再開：delayChildren: 0.08, staggerChildren: 0.06,
            },
        },
    };
    const fadeUp = { 
        hidden:{opacity:0,y: 40}, 
        show:{opacity:1,y:0, 
        transition:{duration:0.6, ease:"easeOut"}} 
    };
    //#endregion

    //#region 捲到函式
    const scrollToRef = (ref) => {

        const refData = ref?.current;

        if (!refData) return;

        //取得id為siteHeader的dom
        const headerEl = document.getElementById("siteHeader");
        // console.log("這是headerEl:",headerEl);
        //取出dom的高度
        const headerHeight = headerEl.offsetHeight;
        // console.log("這是高度:",headerHeight);
        //.offsetHeight是DOM的實際渲染高度

        if(headerHeight){
            const top = refData.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            //.getBoundingClientRect單純計算高度
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (location.hash === "#contactUs" && contactUsRef.current) {
            // 等 DOM/佈局穩定再滾（更保險）
            //requestAnimationFrame為指定方法
            //作用是等dom渲染好了以後才會執行
                const timer = setTimeout(() => {
                    scrollToRef(contactUsRef);
                }, 500);
                return () => clearTimeout(timer);
            }
    }, [location]);
    //#endregion
    

    

    return(
        <>
            <section className="AboutUsPage">
                <h1 className="visually-hidden">
                   Come & BUY 3D列印｜關於我們頁面｜公司資訊
                </h1>
                <AboutUsPageMain1   triggerSet={triggerSet}
                                    fadeUp={fadeUp}/>
                <AboutUsPageMain2   triggerSet={triggerSet}
                                    fadeUp={fadeUp}/>
                <AboutUsPageMain3   triggerSet={triggerSet}
                                    fadeUp={fadeUp}/>
                <article ref={contactUsRef} className="AboutUsPageMain4-box">
                    <AboutUsPageMain4   triggerSet={triggerSet}
                                        fadeUp={fadeUp}/>
                </article>
            </section>
        </>
    )
}
export default AboutUsPage;