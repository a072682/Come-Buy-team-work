
import { useEffect, useRef } from "react";
import AboutUsPageMain1 from "./AboutUsPageMain1/AboutUsPageMain1";
import AboutUsPageMain2 from "./AboutUsPageMain2/AboutUsPageMain2";
import AboutUsPageMain3 from "./AboutUsPageMain3/AboutUsPageMain3";
import AboutUsPageMain4 from "./AboutUsPageMain4/AboutUsPageMain4";
import { useLocation } from "react-router-dom";




function AboutUsPage(){

    const contactUsRef = useRef(null);
    
    const location = useLocation();

    // 捲到函式
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
    

    

    return(
        <>
            <div className="AboutUsPageMain1-box">
                <AboutUsPageMain1 />
            </div>

            <div className="AboutUsPageMain2-box">
                <AboutUsPageMain2 />
            </div>

            <div className="AboutUsPageMain3-box">
                <AboutUsPageMain3 />
            </div>

            <div ref={contactUsRef} className="AboutUsPageMain4-box">
                <AboutUsPageMain4 />
            </div>
        </>
    )
}
export default AboutUsPage;