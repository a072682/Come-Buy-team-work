
import { useEffect, useRef } from "react";
import IndexPageMain1 from "./IndexPageMain1/IndexPageMain1";
import IndexPageMain2 from "./IndexPageMain2/IndexPageMain2";
import IndexPageMain3 from "./IndexPageMain3/IndexPageMain3";
import IndexPageMain4 from "./IndexPageMain4/IndexPageMain4";
import IndexPageMain5 from "./IndexPageMain5/IndexPageMain5";
import { useLocation } from "react-router-dom";




function IndexPage(){

    //宣告ref
    const NewsRef = useRef(null);
    //宣告ref

    //取得網址資訊
    const location = useLocation();
    //取得網址資訊
    //useLocation抓到http://localhost:5174/#/IndexPage#news
    //原始link為to={{ pathname: "/IndexPage", hash: "#news" }}
    //location.hash 就是 "#news"
    


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
        if (location.hash === "#news" && NewsRef.current) {
            // 等 DOM/佈局穩定再滾（更保險）
            //requestAnimationFrame為指定方法
            //作用是等dom渲染好了以後才會執行
                const timer = setTimeout(() => {
                    scrollToRef(NewsRef);
                }, 500); // 延遲 0.5 秒
                return () => clearTimeout(timer); // 清理計時器
            }
    }, [location]);


    

    return(
        <>

            <div className="main1-box">
                <IndexPageMain1 />
            </div>

            <div className="main2-box">
                <IndexPageMain2 />
            </div>

            <div className="main3-box">
                <IndexPageMain3 />
            </div>

            <div className="main4-box">
                <IndexPageMain4 />
            </div>

            <div ref={NewsRef} className="main5-box">
                <IndexPageMain5 />
            </div>
        </>
    )
}
export default IndexPage;