import { useState } from 'react';
import './_Faq.scss';
import { Dropdown, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';





function Faq() {
  
  const [show, setShow] = useState(false);//紀錄是否開啟視窗

  return (
    <>
      
      <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)}>
        
        <Dropdown.Toggle as="div" className='Faq-dropdown-toggle'>

            <Nav.Link as="div" className={`FaqItem-set ${show ? 'active' : ''}`}>
                新手指南
                <span className="material-symbols-outlined">
                  arrow_drop_down
                </span>
            </Nav.Link>

        </Dropdown.Toggle>
        
        <Dropdown.Menu className="FaqDropdown-list-wrapper">

            <Link className="dropdown-item-set" to={{ pathname: "/QaPage", hash: "#客製化流程" }} onClick={()=>{setShow(false)}}>客製化流程</Link>
            <Link className="dropdown-item-set" to={{ pathname: "/QaPage", hash: "#設計需求介紹" }} onClick={()=>{setShow(false)}}>設計需求介紹</Link>
            <Link className="dropdown-item-set" to={{ pathname: "/QaPage", hash: "#運費說明" }} onClick={()=>{setShow(false)}}>運費說明</Link>
            <Link className="dropdown-item-set" to={{ pathname: "/QaPage", hash: "#常見問題" }} onClick={()=>{setShow(false)}}>常見問題</Link>

        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default Faq;
