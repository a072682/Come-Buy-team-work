import { useState } from 'react';
import './_OffcanvasNews.scss';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';




function OffcanvasNews({handleClose}) {
  
  const [openDefault, setOpenDefault] = useState(false);

  return (
    <>
      
        <button className={`offcanvasItem-set ${openDefault ? 'active' : ''}`} onClick={() => setOpenDefault(!openDefault)}>
            最新消息
            <span className="material-symbols-outlined">
                arrow_drop_down
            </span>
        </button>
        <Collapse in={openDefault}>
            <div className='Collapse-box'>
                <Link className="Collapse-item-set" to={{ pathname: "/IndexPage", hash: "#news" }} onClick={()=>{handleClose()}}>
                    最新消息
                </Link>
                <Link className="Collapse-item-set" to={{ pathname: "/AboutUsPage", hash: "#contactUs" }} onClick={()=>{handleClose()}}>
                        聯絡我們
                </Link>
            </div>
        </Collapse>
    </>
  );
}

export default OffcanvasNews;
