

import { useDispatch } from "react-redux";
import MaterialPageMain1 from "./MaterialPageMain1/MaterialPageMain1";
import MaterialPageMain2 from "./MaterialPageMain2/MaterialPageMain2";
import MaterialPageMain3 from "./MaterialPageMain3/MaterialPageMain3";
import { materialDataUpLoad } from "../../slice/materialSlice";
import { MODALS, open } from "../../slice/modalSlice";





function MateriaPage(){

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion
    
    const handleOpenMaterialModal = (data) =>{
        dispatch(materialDataUpLoad(data));
        dispatch(open(MODALS.MaterialPageModal));
    }

    return(
        <>
            <div className="MaterialPageMain1-box">
                <MaterialPageMain1 handleOpenMaterialModal={handleOpenMaterialModal}/>
            </div>

            <div className="MaterialPageMain2-box">
                <MaterialPageMain2 handleOpenMaterialModal={handleOpenMaterialModal}/>
            </div>

            <div className="MaterialPageMain3-box">
                <MaterialPageMain3 handleOpenMaterialModal={handleOpenMaterialModal}/>
            </div>
        </>
    )
}

export default MateriaPage;