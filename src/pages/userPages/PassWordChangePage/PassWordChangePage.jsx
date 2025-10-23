
import { useEffect, useState } from 'react';
import './_PassWordChangePage.scss';
import { userPasswordChange } from '../../../slice/loginSlice';
import { useDispatch } from 'react-redux';





function PassWordChangePage (){

    //#region
    //#endregion

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 宣告錯誤訊息狀態
        const [originPassWordErrorMsg,setOriginPassWordErrorMsg] = useState("");
        useEffect(()=>{},[originPassWordErrorMsg]);
        const [newPassWordErrorMsg,setNewPassWordErrorMsg] = useState("");
        useEffect(()=>{},[newPassWordErrorMsg]);
        const [newPassWordRepeatErrorMsg,setNewPassWordRepeatErrorMsg] = useState("");
        useEffect(()=>{},[newPassWordRepeatErrorMsg]);
    //#endregion

    //#region 宣告密碼資料初始狀態
        const [passWordData,setPassWordData] = useState(
            {
                originPassWord:"",
                newPassWord:"",
                newPassWordRepeat:"",
            }
        )
        useEffect(()=>{
            // console.log("密碼資料:",passWordData)
        },[passWordData]);
    //#endregion

    //#region 寫入密碼函式
        const handlePassWordInput = (event)=>{
            const { name, value } = event.target;
            setPassWordData({
                ...passWordData, 
                [name]: value
            })
        }
    //#endregion

    //#region 確認錯誤訊息函式
        const errorsMsgCheck = () => {
            // 先清空舊錯誤
            setOriginPassWordErrorMsg('');
            setNewPassWordErrorMsg('');
            setNewPassWordRepeatErrorMsg('');

            let ok = true;

            const originPassWord = (passWordData?.originPassWord ?? '').toString().trim();
            const newPassWord  = (passWordData?.newPassWord ?? '').toString().trim();
            const newPassWordRepeat = (passWordData?.newPassWordRepeat ?? '').toString().trim();

            if (!originPassWord) {
                setOriginPassWordErrorMsg('請填寫原密碼');
                ok = false;
            }else if(originPassWord.length < 6){
                setOriginPassWordErrorMsg('密碼至少需 6 碼');
                ok = false;
            }

            if (!newPassWord) {
                setNewPassWordErrorMsg('請填寫新密碼');
                ok = false;
            }else if(newPassWord.length < 6){
                setNewPassWordErrorMsg('密碼至少需 6 碼');
                ok = false;
            }

            if (!newPassWordRepeat) {
                setNewPassWordRepeatErrorMsg('請重複確認新密碼');
                ok = false;
            }else if(newPassWordRepeat.length < 6){
                setNewPassWordRepeatErrorMsg('密碼至少需 6 碼');
                ok = false;
            }else if(newPassWordRepeat !== newPassWord){
                setNewPassWordRepeatErrorMsg('新密碼與新密碼確認不相符，請在確認。');
                ok = false;
            }

            return ok;  // ✅ 回傳是否通過
        };
    //#endregion

    //#region 確認錯誤訊息函式
        const handleUserPasswordChange = async()=>{
            try{
                await dispatch(userPasswordChange({passWordData:passWordData})).unwrap();
                // console.log("密碼修改成功");
            }catch(error){
                console.log(error);
                throw error;
            }
        }
    //#endregion

    //#region 檢查函式
        const handleCheckPassWordData = async(event)=>{
            event.preventDefault();

            // 有錯就中斷，不要送出
                if (!errorsMsgCheck()){
                    return; 
                }
            // 有錯就中斷，不要送出
            
            try {
                await handleUserPasswordChange(); // ✅ 等待執行，若失敗會進 catch
                console.log("密碼修改流程完成");
                setPassWordData({
                    originPassWord:"",
                    newPassWord:"",
                    newPassWordRepeat:"",
                })
            } catch (error) {
                console.log("密碼修改失敗:", error);
                setPassWordData({
                    originPassWord:"",
                    newPassWord:"",
                    newPassWordRepeat:"",
                })
            }
        }
    //#endregion


    



    

    return(
        <div className="PassWordChangePage">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="PassWordChangePage-content">
                            <form className='PassWordChangeForm-set' onSubmit={handleCheckPassWordData}>
                                <div className="PassWordChangePage-title-box">
                                    <div className="title-set">
                                        修改密碼
                                    </div>
                                </div>
                                <div className='PassWordChangePage-Group-box'>
                                    <div className="originPassWordGroup">
                                        <label className='label-set' htmlFor="originPassWord">原始密碼</label>
                                        <input  value={passWordData.originPassWord} 
                                                onChange={handlePassWordInput} 
                                                name="originPassWord" 
                                                type="password" 
                                                className="form-item inputItem-set" 
                                                id="originPassWord" 
                                                placeholder="請輸入原始密碼" 
                                                autoComplete="current-password"/>
                                        {originPassWordErrorMsg && <div className="text-danger mt-1">{originPassWordErrorMsg}</div>}
                                    </div>
                                    <div className="newPassWordGroup">
                                        <label className='label-set' htmlFor="newPassWord">新密碼</label>
                                        <input  value={passWordData.newPassWord}  
                                                onChange={handlePassWordInput} 
                                                name="newPassWord" 
                                                type="password" 
                                                className="form-item inputItem-set" 
                                                id="newPassWord" 
                                                placeholder="請輸入新的密碼" 
                                                autoComplete="current-password"/>
                                        {newPassWordErrorMsg && <div className="text-danger mt-1">{newPassWordErrorMsg}</div>}
                                    </div>
                                    <div className="newPassWordRepeatGroup">
                                        <label className='label-set' htmlFor="newPassWordRepeat">確認新密碼</label>
                                        <input  value={passWordData.newPassWordRepeat}  
                                                onChange={handlePassWordInput} 
                                                name="newPassWordRepeat" 
                                                type="password" 
                                                className="form-item inputItem-set" 
                                                id="newPassWordRepeat" 
                                                placeholder="請確認輸入新的密碼" 
                                                autoComplete="current-password"/>
                                        {newPassWordRepeatErrorMsg && <div className="text-danger mt-1">{newPassWordRepeatErrorMsg}</div>}
                                    </div>
                                </div>
                                <button type="submit" className='formBtn submitBtn mian-btn1-set'>儲存</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PassWordChangePage;