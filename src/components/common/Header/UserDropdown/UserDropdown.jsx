import { useEffect, useState } from 'react';
import './_UserDropdown.scss';
import { Dropdown, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../../slice/loginSlice';



function UserDropdown() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  
  const [show, setShow] = useState(false);//紀錄是否開啟視窗

  const handleLogoutUser = async()=>{
    try{
      await dispatch(logoutUser()).unwrap();
      console.log("登出成功");
      setShow(false);
    }catch(error){
      console.log("登出失敗:",error);
    }
  }

  return (
    <>
      
      <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)}>
        
        <Dropdown.Toggle as="div" className='user-dropdown-toggle'>

            <Nav.Link as="div" className="userItem-set">
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
            </Nav.Link>

        </Dropdown.Toggle>
        
        <Dropdown.Menu className="userDropdown-list-wrapper">

            <Link className="dropdown-item-set" to="UserPages"
                  onClick={()=>{
                    setShow(false);
                  }}>
                    會員中心
            </Link>
            <Link className="dropdown-item-set" to="/"
                  onClick={()=>{
                    handleLogoutUser()
                  }}>
                    登出
            </Link>

        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default UserDropdown;
