import { useState } from 'react';
import './_News.scss';
import { Dropdown, Nav } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';




function News() {
  
  const [show, setShow] = useState(false);//紀錄是否開啟視窗

  const navigate = useNavigate();//頁面跳轉宣告

  return (
    <>
      
      <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)}>
        
        <Dropdown.Toggle as="div" className='News-dropdown-toggle'>

            <Nav.Link as="div" className={`NewsItem-set ${show ? 'active' : ''}`}>
                最新消息
                <span className="material-symbols-outlined">
                  arrow_drop_down
                </span>
            </Nav.Link>

        </Dropdown.Toggle>
        
        <Dropdown.Menu className="NewsDropdown-list-wrapper">

            <Link className="dropdown-item-set" to={{ pathname: "/IndexPage", hash: "#news" }} 
                  onClick={()=>{
                    setShow(false);
                  }}>
                    最新消息
            </Link>
            <Link className="dropdown-item-set" to={{ pathname: "/AboutUsPage", hash: "#contactUs" }} 
                  onClick={()=>{
                    setShow(false)
                  }}>
                    聯絡我們
            </Link>

        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default News;
