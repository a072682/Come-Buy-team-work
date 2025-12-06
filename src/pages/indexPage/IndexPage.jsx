
import { useEffect, useRef } from "react";
import IndexPageMain1 from "./IndexPageMain1/IndexPageMain1";
import IndexPageMain2 from "./IndexPageMain2/IndexPageMain2";
import IndexPageMain3 from "./IndexPageMain3/IndexPageMain3";
import IndexPageMain4 from "./IndexPageMain4/IndexPageMain4";
import IndexPageMain5 from "./IndexPageMain5/IndexPageMain5";
import { useLocation } from "react-router-dom";




function IndexPage(){

    //#region
    //#endregion

    //#region SEO流程宣告
    useEffect(() => {
        //標題
        document.title = "首頁 | ";

        //簡介
        let metaTag = document.querySelector("meta[name='description']");
        if (!metaTag) {
            metaTag = document.createElement("meta");
            metaTag.setAttribute("name", "description");
            document.head.appendChild(metaTag);
        }
        metaTag.setAttribute(
            "content",
            "異環官方網站｜探索沉浸式虛擬世界、角色介紹、城市映像與最新遊戲資訊。觀看宣傳影片、了解遊戲特色，並立即預約加入異環的冒險旅程。"
        );
    }, []);
    //#endregion

    //#region 宣告ref
    const NewsRef = useRef(null);
    //#endregion

    //#region 取得網址資訊
    const location = useLocation();
    //取得網址資訊
    //useLocation抓到http://localhost:5174/#/IndexPage#news
    //原始link為to={{ pathname: "/IndexPage", hash: "#news" }}
    //location.hash 就是 "#news"
    //#endregion
    


    //#region 捲到函式
    const scrollToRef = (ref) => {

        const refData = ref?.current;

        if (!refData) {
            
            return;
        }

        //取得id為siteHeader的dom
        const headerEl = document.getElementById("siteHeader");
        console.log("這是headerEl:",headerEl);
        //取出dom的高度
        const headerHeight = headerEl.offsetHeight;
        console.log("這是高度:",headerHeight);
        //.offsetHeight是DOM的實際渲染高度

        if(headerHeight){
            const top = refData.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            //.getBoundingClientRect單純計算高度
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    useEffect(() => {
        if(!NewsRef.current){
            console.log("ref不存在");
            return;
        }
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

    const fadeLeft  = { 
        hidden:{opacity:0,x:-40}, 
        show:{opacity:1,x:0, 
        transition:{duration:0.6, ease:"easeOut"}} 
    };
    const fadeRight = { 
        hidden:{opacity:0,x: 40}, 
        show:{opacity:1,x:0, 
        transition:{duration:0.6, ease:"easeOut"}} 
    };
    const fadeUp = { 
        hidden:{opacity:0,y: 40}, 
        show:{opacity:1,y:0, 
        transition:{duration:0.6, ease:"easeOut"}} 
    };
    //#endregion


    

    return(
        <>
            <section className="IndexPage">
                <h1 className="visually-hidden">
                   Come & BUY 3D列印 ｜官方網站
                </h1>
                <IndexPageMain1 triggerSet={triggerSet}
                                fadeLeft={fadeLeft}
                                fadeRight={fadeRight}
                                fadeUp={fadeUp}
                />
                <IndexPageMain2 triggerSet={triggerSet}
                                fadeLeft={fadeLeft}
                                fadeRight={fadeRight}
                                fadeUp={fadeUp}
                />
                <IndexPageMain3 triggerSet={triggerSet}
                                fadeLeft={fadeLeft}
                                fadeRight={fadeRight}
                                fadeUp={fadeUp}
                />
                <IndexPageMain4 triggerSet={triggerSet}
                                fadeLeft={fadeLeft}
                                fadeRight={fadeRight}
                                fadeUp={fadeUp}
                />
                <article className="main5-box"
                        ref={NewsRef}>
                    <IndexPageMain5 
                        triggerSet={triggerSet}
                        fadeLeft={fadeLeft}
                        fadeRight={fadeRight}
                        fadeUp={fadeUp}
                    />
                </article>
            </section>

            {/* <section className="main2-box">
                
            </section>

            <section className="main3-box">
                
            </section>

            <section className="main4-box">
                
            </section>

            <section ref={NewsRef} className="main5-box">
                
            </section> */}
        </>
    )
}
export default IndexPage;