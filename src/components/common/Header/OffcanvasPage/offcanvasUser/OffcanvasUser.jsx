import { useEffect, useState } from 'react';
import './_OffcanvasUser.scss';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../../../slice/loginSlice';


function OffcanvasUser({handleClose}) {

    const dispatch = useDispatch();
  
    const [openDefault, setOpenDefault] = useState(false);

    const handleLogoutUser = async()=>{
        try{
            await dispatch(logoutUser()).unwrap();
            // console.log("登出成功");
            handleClose();
        }catch(error){
            console.log("登出失敗:",error);
        }
    }

    //#region 讀取中央會員頭像資料
        //讀取中央資料
        const avatarUrl = useSelector((state)=>{
            return(
                state.login.avatar_url
            )
        })

        useEffect(()=>{

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
            
        },[userName])
    //#endregion

  return (
    <>
        
        <button className="offcanvasUserItem-set" onClick={() => setOpenDefault(!openDefault)}>
            {
                avatarUrl?
                (
                    <img className="userItemImg-set" src={avatarUrl} alt={userName} />
                )
                :
                (
                    <div className="userItemImg-set textVer">{(userName?.trim()?.charAt(0) || '?').toUpperCase()}</div>
                )
            }
        </button>
        <Collapse in={openDefault}>
            <div className='Collapse-box'>
                <Link className="Collapse-item-set" to="UserPages" onClick={()=>{handleClose()}}>
                    會員中心
                </Link>
                <Link className="Collapse-item-set" onClick={()=>{handleLogoutUser()}}>
                    登出
                </Link>
            </div>
        </Collapse>
    </>
  );
}

export default OffcanvasUser;
