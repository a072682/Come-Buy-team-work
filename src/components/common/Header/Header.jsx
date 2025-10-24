import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Nav, Navbar as Container, Navbar } from "react-bootstrap";
import { checkLogin, linkTest, logoutUser, userLoginCounter } from "../../../slice/loginSlice";
import { close, open, MODALS } from "../../../slice/modalSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import News from "./News/News";
import Faq from "./FAQ/FAQ";
import './_Header.scss';
import UserDropdown from "./UserDropdown/UserDropdown";
import OffcanvasPage from "./OffcanvasPage/OffcanvasPage";


function Header(){

    //#region
    //#endregion

    //#region 讀取中央登入狀態資料
        //讀取中央資料
        const linkState = useSelector((state)=>{
            return(
                state.login.linkState
            )
        })

        useEffect(()=>{},[linkState])
    //#endregion

    //#region 讀取中央登入資料
        //讀取中央資料
        const loginState = useSelector((state)=>{
            return(
                state.login.isLogin
            )
        })

        useEffect(()=>{
            // console.log("loginState狀態:",loginState);
        },[loginState])
    //#endregion

    //#region 讀取中央會員頭像資料
        //讀取中央資料
        const avatarUrl = useSelector((state)=>{
            return(
                state.login.avatar_url
            )
        })

        useEffect(()=>{
            // console.log("頭像資料:",avatarUrl);
        },[avatarUrl])
    //#endregion

    //#region 讀取中央會員名稱資料
        //讀取中央資料
        const userName = useSelector((state)=>{
            return(
                state.login.username
            )
        })

        useEffect(()=>{
            // console.log("會員名稱資料:",userName);
        },[userName])
    //#endregion

    //#region 讀取中央登入資料
        //讀取中央資料
        const active = useSelector((state)=>{
            return(
                state.modal.activeModal
            )
        })
        useEffect(()=>{
            // console.log("Modal狀態:",active);
        },[active])
    //#endregion

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 連線測試
        //連線測試
        useEffect(()=>{
            dispatch(linkTest()); 
        },[]);
        //連線測試
    //#endregion

    //#region 宣告記錄會員狀態
        //宣告記錄會員狀態
        // const[userData,setUserData]=useState(null);
        // useEffect(()=>{console.log("測試:",userData)},[userData]);
        //登入確認
    //#endregion

    //#region 登入確認
        useEffect(() => {
            const getUserData = async()=>{
                try{
                    await dispatch(checkLogin()).unwrap();
                    await dispatch(userLoginCounter()).unwrap();
                }catch(error){
                    console.log("登入檢查失敗",error);
                }
            };

            // 首次掛載先跑一次
            getUserData();

            // 監聽 pageshow：只要頁面被顯示，就有機會觸發
            const onPageShow = (event) => {
                //event.persisted此屬性如果是
                // false：代表是常規載入（真正從網路）。
                // true：代表這次顯示是從 BFCache 恢復
                if (event.persisted) getUserData();   // persisted=true 表示從 BFCache 恢復
            };
            //當頁面被顯示 (pageshow) 的時候，請執行指定的函式 onPageShow。
            //'pageshow' 是一個事件，代表:瀏覽器把頁面「顯示出來」了。
            //另外像是'click' → 代表使用者按了滑鼠。
            window.addEventListener('pageshow', onPageShow);

            return () => window.removeEventListener('pageshow', onPageShow);
        }, []);
    //#endregion

    //#region 抓取網址
    const location = useLocation();
    //#endregion

    //#region 監控路徑
        //監控路徑
        useEffect(() => {
            // console.log("🔄 路由變更了！當前路徑：", location.pathname);
            window.scrollTo(0, 0);
            // console.log("已移動到頁面最上方");
        }, [location.pathname]); // 監聽 `pathname`，當變更時執行
        //監控路徑
    //#endregion

    //#region 設定每固定時間觸發函式
        useEffect(() => {
            const id = setInterval(() => {
                dispatch(checkLogin()).unwrap().catch(err => console.log("登入檢查失敗", err));
                console.log("cookie更新請求已送出");
            }, 25 * 60 * 1000); // 25 分鐘 
            return () => clearInterval(id);
        }, []);
    //#endregion
    
    //#region 側邊狀態
        //側邊狀態
            const [onOpen, setOnOpen] = useState(false); // 控制 offcanvas 開關
            useEffect(()=>{},[onOpen]);

            const handleOpen = () => setOnOpen(true);
            const handleClose = () => setOnOpen(false);
        //側邊狀態
    //#endregion

    

    const [expanded, setExpanded] = useState(false);
    
    return(
        <>
            <div className={linkState ? "d-none" : "mask"}>
                <div className="loader">
                    <p className="loader-text" aria-live="polite" aria-busy="true">
                        網站載入中，請稍後
                        <span className="dots">
                            <span>.</span><span>.</span><span>.</span>
                        </span>
                    </p>
                </div>
            </div>
            <Navbar expand="lg" className="navBg-set" expanded={expanded} id="siteHeader">
                <Container>

                    <div className='navbar-box'>
                        {/* 左上角 Logo */}
                        <Link to="/" className='navbarLogo-box'>
                            <img className="navbarLogoImg-set" src={`${import.meta.env.BASE_URL}assets/images/Header/logo.png`} alt="home-section2-1" />
                        </Link>
                        {/* 左上角 Logo */}
                        

                        
                        {/* lg 以上選項區塊 */}
                        <div className="navbarItem-box d-none d-lg-flex">
                            <News />
                            <Nav.Link as={NavLink} to="/EstimatePage" className="navbarItem-set">線上估價</Nav.Link>
                            <Nav.Link as={NavLink} to="/MateriaPage" className="navbarItem-set">材料選擇</Nav.Link>
                            <Faq />
                            <Nav.Link as={NavLink} to="/AboutUsPage" className="navbarItem-set">聯絡我們</Nav.Link>
                            {/* <button className="testBtn" onClick={()=>{setTestStage(!testStage)}}></button> */}
                        </div>
                        {/* lg 以上選項區塊 */}

                        {/* lg 以上會員頭像 */}
                        {
                            loginState?
                            (
                                <UserDropdown />
                            )
                            :
                            (
                                <button className="userImg-box d-none d-lg-flex"
                                        onClick={()=>{dispatch(open(MODALS.LOGIN))}}
                                >
                                    <img className="userImg-set" src={`${import.meta.env.BASE_URL}assets/images/Header/log01.png`} alt="log01" />
                                </button>
                            )
                        }

                        {/* lg 以下的右上角：漢堡選單按鈕 */}
                        <div className="navbarMenuIcon-box d-flex d-lg-none">
                            <button className="MenuIconBtn-set" onClick={()=>{handleOpen()}}>
                                <img className="MenuIconImg-set" src={`${import.meta.env.BASE_URL}assets/images/Header/齒輪.png`} alt="齒輪" />
                            </button>
                        </div>
                        {/* lg 以下的右上角：漢堡選單按鈕 */}
                    </div>
                    
                </Container>
            </Navbar>
            <OffcanvasPage onOpen={onOpen} handleClose={handleClose} loginState={loginState}/>
        </>
    )
}

export default Header;
