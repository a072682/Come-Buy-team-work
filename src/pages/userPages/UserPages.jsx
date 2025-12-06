
import { Tab, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Dropdown } from 'react-bootstrap';
import './_UserPages.scss';
import BasicInformation from './BasicInformation/BasicInformation';
import AddressInformation from './AddressInformation/AddressInformation';
import MyOrder from './MyOrder/MyOrder';
import PassWordChangePage from './PassWordChangePage/PassWordChangePage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, logoutUser } from '../../slice/loginSlice';


function UserPages (){

    //#region
    //#endregion

    //#region 跳轉網址前置宣告
        const navigate = useNavigate();
    //#endregion

    //#region 讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 讀取中央登入資料
        //讀取中央資料
        const loginState = useSelector((state)=>{
            return(
                state.login.isLogin
            )
        })

        useEffect(()=>{
            console.log("loginState狀態:",loginState);
        },[loginState])
    //#endregion

    //#region 讀取中央會員來源資料
        //讀取中央資料
        const authProvider = useSelector((state)=>{
            return(
                state.login.auth_provider
            )
        })

        useEffect(()=>{
            console.log("會員來源資料:",authProvider);
        },[authProvider])
    //#endregion

    //#region 檢查是否為會員
        useEffect(()=>{
            if(!loginState){
                navigate("/");
            }
        },[loginState])
    //#endregion

    //#region 會員資料儲存狀態宣告
        const [userData, setUserData] = useState(null);
        useEffect(()=>{console.log("會員資料:", userData);},[userData]);
    //#endregion

    //#region 會員資料儲存狀態宣告
        const [userProfileData, setUserProfileData] = useState(null);
        useEffect(()=>{console.log("會員個人資料:", userProfileData);},[userProfileData]);
    //#endregion

    //#region 取得會員資料
        useEffect(()=>{
            const getUser = async () => {
                try {
                    const user = await dispatch(getUserData()).unwrap();
                    setUserData(user.UserData);
                    setUserProfileData(user.UserProfileData);
                } catch (err) {
                    console.error("取得使用者資料失敗", err);
                }
            };
            getUser();
        },[])
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

    

    const [activeTab, setActiveTab] = useState('基本資訊');//tab控制

    const tabdata = [
        {
            title:"基本資訊",
            key:"基本資訊",
            icon:"account_circle",
            pageData: <BasicInformation userData={userData} 
                                        setUserData={setUserData} 
                                        userProfileData={userProfileData} 
                                        setUserProfileData={setUserProfileData}
                                        triggerSet={triggerSet}
                                        fadeUp={fadeUp }/>,
            disabled: false,
        },
        {
            title:"地址資料",
            key:"地址資料",
            icon:"location_on",
            pageData: <AddressInformation   userProfileData={userProfileData} 
                                            setUserProfileData={setUserProfileData}
                                            triggerSet={triggerSet}
                                            fadeUp={fadeUp }/>,
            disabled: false,
        },
        {
            title:"我的訂單",
            key:"我的訂單",
            icon:"add_shopping_cart",
            pageData:<MyOrder   triggerSet={triggerSet}
                                fadeUp={fadeUp }/>,
            disabled: false,
        },
        {
            title:"修改密碼",
            key:"修改密碼",
            icon:"key",
            pageData:<PassWordChangePage    triggerSet={triggerSet}
                                            fadeUp={fadeUp }/>,
            disabled: false,
        },
        {
            title:"登出",
            key:"登出",
            icon:"logout",
            pageData:"",
            isAction:true,
        },
    ]

    //#region TabData過濾函式
        const filteredTabData = authProvider === 'google'? 
        tabdata.filter(item => item.key !== '修改密碼'): tabdata;
    //#endregion

    //#region 處理登出按鈕
        //處理登出按鈕
        const handleLogout = () => {
            dispatch(logoutUser());
            navigate('/');
        };
        //處理登出按鈕
    //#endregion

    
    
   

    
    return(
        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
            <section className="UserPages">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="title-box">
                                <h1 className='title'>會員中心 - 基本資訊</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="app-tabs">

                                {/* Tab-Mb 選單區 */}
                                <div className='tab-mb-box'>
                                    <Nav className='tab-mb-nav'>
                                        <Swiper
                                            className=''
                                            modules={[]}
                                            slidesPerView={2}
                                            loop={true}
                                            spaceBetween={0}
                                            >
                                            {
                                                filteredTabData?.map((item)=>{
                                                    return(
                                                        
                                                        <SwiperSlide key={item.key}>
                                                            <Nav.Item  className='tab-mb-item'>
                                                                <Nav.Link className={`tab-mb-link ${item.disabled ? 'is-disabled' : ''}`} 
                                                                        aria-disabled={item.disabled} 
                                                                        eventKey={item.isAction ? undefined : item.key}
                                                                        onClick={(e) => {
                                                                            if (item.isAction) {
                                                                                e.preventDefault();
                                                                                handleLogout();
                                                                            }
                                                                        }}
                                                                >
                                                                    <span className="material-symbols-outlined">
                                                                        {item.icon}
                                                                    </span>
                                                                    {item.title}
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                        </SwiperSlide>
                                                        
                                                    )
                                                    
                                                })
                                            }
                                        </Swiper>
                                    </Nav>
                                </div>
                                {/* Tab-Mb 選單區 */}

                                {/* Tab 選單區 */}
                                <div className='tab-box'>
                                    <Nav className='tab-nav'>
                                        {
                                            filteredTabData?.map((item)=>{
                                                return(
                                                    
                                                    <Nav.Item key={item.key} className='tab-item'>
                                                        <Nav.Link className={`tab-link ${item.disabled ? 'is-disabled' : ''}`} 
                                                                aria-disabled={item.disabled} 
                                                                eventKey={item.isAction ? undefined : item.key}
                                                                onClick={(e) => {
                                                                    if (item.isAction) {
                                                                        e.preventDefault();
                                                                        handleLogout();
                                                                    }
                                                                }}
                                                        >
                                                            <span className="material-symbols-outlined">
                                                                {item.icon}
                                                            </span>
                                                            {item.title}
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    
                                                )
                                            })
                                        }
                                    </Nav>
                                </div>
                                {/* Tab 選單區 */}
                                
                                {/* Tab 內容區 */}
                                <Tab.Content className='content-box'>
                                    {
                                        filteredTabData.filter((key) => !key.isAction).map((item) => (
                                            <Tab.Pane key={item.key} eventKey={item.key}>
                                                {item.pageData}
                                            </Tab.Pane>
                                        ))
                                    }
                                </Tab.Content>
                                {/* Tab 內容區 */}
                            
                            </div>
                        </div>
                    </div>
                </div>
            </section>
         </Tab.Container>
    )
}
export default UserPages;    