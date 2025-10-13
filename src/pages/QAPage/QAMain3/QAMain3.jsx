import './_QAMain3.scss';


function QAMain3(){

    const QAMain3Data = [
        {
            id:"QAMain301",
            img:`${import.meta.env.BASE_URL}assets/images/QaPage/main3/qP-main3-img1.png`,
            title:"店到店",
            text:"固定運費$60，約2-3個工作天到達。",
        },
        {
            id:"QAMain302",
            img:`${import.meta.env.BASE_URL}assets/images/QaPage/main3/qP-main3-img2.png`,
            title:"郵局",
            text:"運費$80，偏遠地區可能需延遲1-2天。",
        },
        {
            id:"QAMain303",
            img:`${import.meta.env.BASE_URL}assets/images/QaPage/main3/qP-main3-img3.png`,
            title:"宅配",
            text:"運費$120，當天寄送，隔天到貨。",
        },
        {
            id:"QAMain304",
            img:`${import.meta.env.BASE_URL}assets/images/QaPage/main3/qP-main3-img4.png`,
            title:"自取",
            text:"免運費，請按照預約時間至門市領取。",
        },
    ]

    return(
        <>  
            <div className="QAMain3">
                <div className="QAMain3-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-10 mx-auto">
                                <div className='QAMain3-content'>
                                    <div className="QAMain3-title">
                                        <h3 className="title-set">運費說明</h3>
                                    </div>
                                    <div className="QAMain3-content-box">
                                        {
                                            QAMain3Data?.map((item)=>{
                                                return(
                                                    
                                                    <div key={item.id} className="QAMain3-item-set qP-main2-box">
                                                        <div className="QAMain3-item-img-box">
                                                            <img src={item.img} 
                                                                    alt="qP-main2-img1" 
                                                                    className='QAMain3-item-img'/>
                                                        </div>
                                                        <div className="QAMain3-content-box">
                                                            <div className="QAMain3-item-title-box">
                                                                <h5 className="QAMain3-item-title">{item.title} </h5>
                                                            </div>
                                                            <div className="QAMain3-item-text-box">
                                                                <p className="QAMain3-item-text">{item.text} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                )
                                            })
                                        }
                                        
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
export default QAMain3;



