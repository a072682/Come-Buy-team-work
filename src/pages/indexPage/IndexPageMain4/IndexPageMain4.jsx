
import { Link } from 'react-router-dom';
import './_IndexPageMain4.scss';


function IndexPageMain4(){

    const main4Data = [
        {
            id:"main3-R-01",
            text:"連續碳纖維尼龍",
        },
        {
            id:"main3-R-02",
            text:"SLA雷射光固化",
        },
        {
            id:"main3-R-03",
            text:"層疊製造成型",
        },
        {
            id:"main3-L-01",
            text:"FDM技術",
        },
        {
            id:"main3-L-02",
            text:"SLM技術",
        },
        {
            id:"main3-L-03",
            text:"SLS選擇性雷射燒結",
        },
    ]

    const R_Data = main4Data.filter(d => d.id.includes("-R-"));
    const L_Data = main4Data.filter(d => d.id.includes("-L-"));
    const result = [L_Data, R_Data];

    return(
        <>
            <div className="main4">
                <div className="container">        {/*外框 要增加y軸pd在這邊加*/}
                    <div className="row">
                        <div className="col-12">
                            <div className="main4-content">
                                <div className='w-100 row gap-48 gap-lg-0'>
                                    <div className='col-12 col-lg-4'>
                                        <div className="h-100 d-flex flex-column justify-content-center align-items-center align-items-lg-start gap-48">
                                            <div className="main4-title">
                                                <h2 className="main4-title-set">服務項目</h2>
                                            </div>
                                            <Link className="d-none d-lg-block main4-title-btn-set mian-btn1-set" to="/EstimatePage">
                                                開始製作
                                            </Link>
                                        </div>
                                    </div>

                                    <div className='col-12 col-lg-8'>
                                         <div className='row'>
                                            {
                                                result.map((group,index)=>{
                                                    return(
                                                        <div key={index} className="col-6">                  
                                                            <div className="main4-card-box">
                                                                {
                                                                    group.map(item => (
                                                                        <div key={item.id} className="card-item">
                                                                            <div className="box-set item-set">
                                                                                <p className='text-set'>
                                                                                    {item.text}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                               
                                            }
                                         </div>
                                    </div>
                                    

                                    <div className="col-12 d-block d-lg-none">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <Link className="main4-title-btn-set mian-btn1-set" to="/EstimatePage">
                                                開始製作
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                                       
                    </div>
                </div>
            </div>
        </>
    )
}
export default IndexPageMain4;