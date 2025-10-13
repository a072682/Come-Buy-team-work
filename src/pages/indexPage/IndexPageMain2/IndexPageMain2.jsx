
import { Link } from 'react-router-dom';
import './_IndexPageMain2.scss';


function IndexPageMain2(){

    const main2Data = [
        {
            id:"main2-01",
            img:`${import.meta.env.BASE_URL}assets/images/IndexPage/main2/index-mian2-img01.png`,
            alt:"index-mian2-img01",
            text:"設計流程標準化",
        },
        {
            id:"main2-02",
            img:`${import.meta.env.BASE_URL}assets/images/IndexPage/main2/index-mian2-img02.png`,
            alt:"index-mian2-img01",
            text:"降低前期製造成本",
        },
        {
            id:"main2-03",
            img:`${import.meta.env.BASE_URL}assets/images/IndexPage/main2/index-mian2-img03.png`,
            alt:"index-mian2-img01",
            text:"細節精準調教",
        },
    ]

    return(
        <>
            <div className="main2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className='main2-content'>
                                <div className='w-100 row row-gap-64 row-gap-lg-96'>
                                    {
                                        main2Data?.map((item)=>{
                                            return(
                                                <div key={item.id} className='col-12 col-sm-8 mx-sm-auto col-lg-4'>
                                                    <div className="main2-card-set">
                                                        <div className="main2-card-img-box-set">
                                                            <img src={item.img} alt={item.alt} />
                                                        </div>
                                                        <div className="main2-box d-flex justify-content-center align-items-center">
                                                            <p className="main2-box-text d-flex justify-content-center align-items-center">{item.text}</p>
                                                        </div>
                                                    </div>
                                                </div> 
                                            )
                                        })
                                    }
                                    <div className='col-12'>
                                        <div className="mian2-checkBtn-Box-Set">
                                            <Link className="mian2-checkBtn-Set mian-btn1-set" to="/EstimatePage">
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
export default IndexPageMain2;