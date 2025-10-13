import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header/Header";
import ModalRoot from "../components/common/ModalRoot/ModalRoot";




function FrontLayout(){
    return(
        <>
            <Header />
            <Outlet />
            <Footer />
            <ModalRoot />
        </>
    )
}

export default FrontLayout;