import './_QAPage.scss';
import { Tab, Nav } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'
import 'swiper/css';
import { useEffect, useState } from 'react';
import QAMain1 from './QAMain1/QAMain1';
import QAMain2 from './QAMain2/QAMain2';
import QAMain3 from './QAMain3/QAMain3';
import QAMain4 from './QAMain4/QAMain4';
import { useLocation } from 'react-router-dom';


function QAPage(){

    const location = useLocation();

    const [activeTab, setActiveTab] = useState('客製化流程');//tab控制

    const tabdata = [
        {
            id:"QaPageTab_01",
            title:"客製化流程",
            key:"客製化流程",
            pageData: <QAMain1 />,
            disabled: false,
        },
        {
            id:"QaPageTab_02",
            title:"設計需求介紹",
            key:"設計需求介紹",
            pageData: <QAMain2 />,
            disabled: false,
        },
        {
            id:"QaPageTab_03",
            title:"運費說明",
            key:"運費說明",
            pageData:<QAMain3 />,
            disabled: false,
        },
        {
            id:"QaPageTab_04",
            title:"常見問題",
            key:"常見問題",
            pageData:<QAMain4 />,
            disabled: false,
        },
    ]

    useEffect(() => {
        //對中文進行解碼
        const decoded = decodeURIComponent(location.hash);
        const hashToTab = {
            "#客製化流程": "客製化流程",
            "#設計需求介紹": "設計需求介紹",
            "#運費說明": "運費說明",
            "#常見問題": "常見問題",
        };
        //假設location.hash === "#客製化流程"
        //const tab = hashToTab[location.hash];
        //const tab = hashToTab["#客製化流程"];
        //tab === "客製化流程"
        const tab = hashToTab[decoded];
        if (tab) {
            requestAnimationFrame(() => 
                setActiveTab(tab)
            );
        }

    }, [location]);

    return(
        <>
            <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                <div className="QAPage">
                    <div className="QAPage-bg">
                        <div className="QAPage-title">
                            <h3 className="title-set">新手指南/QA</h3>
                        </div>
                        <div className='QAPage-content'>
                            
                            {/* Tab-手機板 選單區 */}
                            <div className='tab-mb-box'>
                                <div className='tab-mb-btn-box'>
                                    <span className="material-symbols-outlined tab-mb-btnR">
                                        keyboard_arrow_right
                                    </span>
                                    <span className="material-symbols-outlined tab-mb-btnL">
                                        keyboard_arrow_left
                                    </span>
                                </div>
                                <Nav className='tab-mb-nav'>
                                    <Swiper
                                        className='w-100'
                                        modules={[ Navigation, ]}
                                        slidesPerView={3}
                                        navigation={{ prevEl: ".tab-mb-btnL", nextEl: ".tab-mb-btnR" }}
                                        loop={true}
                                        spaceBetween={0}
                                        breakpoints={{
                                            576: { 
                                                slidesPerView:4,
                                                loop:false,
                                            },
                                        }}
                                        >
                                        {
                                            tabdata?.map((item)=>{
                                                return(
                                                    
                                                    <SwiperSlide key={item.id}>
                                                        <Nav.Item  className='tab-mb-item'>
                                                            <Nav.Link   className={`tab-mb-link ${item.disabled ? 'is-disabled' : ''}`} 
                                                                        aria-disabled={item.disabled} 
                                                                        eventKey={item.key}
                                                                        onClick={()=>{window.scrollTo(0, 0);}}
                                                            >
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
                            {/* Tab-手機板 選單區 */}
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-12'>
                                        {/* 整體頁面 */}
                                        <div className="QAPage-BodyContents">
                                            {/* Tab 選單區 */}
                                            <div className='tab-box'>
                                                <Nav className='tab-nav'>
                                                    {
                                                        tabdata?.map((item)=>{
                                                            return(
                                                                
                                                                <Nav.Item key={item.id} className='tab-item'>
                                                                    <Nav.Link   className={`tab-link ${item.disabled ? 'is-disabled' : ''}`} 
                                                                                aria-disabled={item.disabled} 
                                                                                eventKey={item.key}
                                                                                onClick={()=>{window.scrollTo(0, 0);}}
                                                                    >
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
                                                    tabdata?.map((item)=>{
                                                        return(
                                                            
                                                            <Tab.Pane key={item.id} eventKey={item.key}>
                                                                {item.pageData}
                                                            </Tab.Pane>
                                                            
                                                        )
                                                    })
                                                }
                                            </Tab.Content>
                                            {/* Tab 內容區 */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                                        
                                    
                                
                            
                        </div>
                    </div>
                </div>
            </Tab.Container>
        </>
    )
}
export default QAPage;

