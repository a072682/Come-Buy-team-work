import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Nav, Navbar as Container, Navbar } from "react-bootstrap";
import { checkLogin, linkTest, logoutUser, userLoginCounter } from "../../../slice/loginSlice";
import { open, MODALS } from "../../../slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import News from "./News/News";
import Faq from "./FAQ/FAQ";
import './_Header.scss';
import UserDropdown from "./UserDropdown/UserDropdown";
import OffcanvasPage from "./OffcanvasPage/OffcanvasPage";


function Header(){

    //#region
    //#endregion

    //#region 讀取連線狀態
        //讀取中央資料
        const linkState = useSelector((state)=>{
            return(
                state.login.linkState
            )
        })

        useEffect(()=>{
            //console.log("連線狀態:",linkState);
        },[linkState])
    //#endregion

    //#region 讀取中央登入資料
        //讀取中央資料
        const loginState = useSelector((state)=>{
            return(
                state.login.isLogin
            )
        })

        useEffect(()=>{
            //console.log("loginState狀態:",loginState);
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
            //console.log("頭像資料:",avatarUrl);
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
            //console.log("會員名稱資料:",userName);
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
            //console.log("Modal狀態:",active);
        },[active])
    //#endregion

    //#region 確認token
        useEffect(() => {
            const saved = localStorage.getItem("token");
            //console.log("token：", saved);
        }, [linkState]);
    //#endregion

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 連線測試
        //連線測試
        // useEffect(() => {
        //     if(linkState){
        //         //console.log("連線成功敲擊結束");
        //         return;
        //     }else if(!linkState){
        //         //console.log("執行敲擊");
        //         // 每兩秒執行一次
        //         const timeId = setInterval(() => {
        //             dispatch(linkTest());
        //         }, 2000); 

        //         // 離開頁面時清除 interval（必要）
        //         return () => clearInterval(timeId);
        //     }
        // }, [linkState]);
        //連線測試
    //#endregion

    //#region 宣告記錄會員狀態
        //宣告記錄會員狀態
        // const[userData,setUserData]=useState(null);
        // useEffect(()=>{console.log("測試:",userData)},[userData]);
        //登入確認
    //#endregion

    //#region 登入確認
        //登入確認
        useEffect(()=>{
            const getUserData = async()=>{
                try{
                    await dispatch(checkLogin()).unwrap();
                    await dispatch(userLoginCounter()).unwrap();
                }catch(error){
                    //console.log("登入檢查失敗",error);
                }
            };

            getUserData();

            // 每半小時執行一次
            // const timeId = setInterval(() => {
            //     getUserData();
            // }, 30*60*1000); 
            
            // 離開頁面時清除 interval（必要）
            //return () => clearInterval(timeId);
        },[]);
        //登入確認
    //#endregion

    //#region 抓取網址
    const location = useLocation();
    //#endregion

    //#region 監控路徑
        //監控路徑
        useEffect(() => {
            //console.log("🔄 路由變更了！當前路徑：", location.pathname);
            window.scrollTo(0, 0);
            //console.log("已移動到頁面最上方");
        }, [location.pathname]); // 監聽 `pathname`，當變更時執行
        //監控路徑
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
