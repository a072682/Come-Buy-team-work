import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header/Header";
import ModalRoot from "../components/common/ModalRoot/ModalRoot";
import './_Header.scss';
import { useSelector } from "react-redux";
import { useEffect } from "react";




function FrontLayout(){

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
            console.log("連線狀態:",linkState);
        },[linkState])
    //#endregion


    return(
        <>
            {/* 遮罩 */}
            <div className={linkState ? "d-none" : "pageMask"}>
                <div className="loader">
                    <p className="loader-text" aria-live="polite" aria-busy="true">
                        網站載入中，請稍後
                        <span className="dots">
                            <span>.</span><span>.</span><span>.</span>
                        </span>
                    </p>
                </div>
            </div>
            {/* 遮罩 */}
            <Header />
            <Outlet />
            <Footer />
            <ModalRoot />
        </>
    )
}

export default FrontLayout;