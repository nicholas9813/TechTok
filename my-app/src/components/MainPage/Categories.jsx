import React from "react"


const Categories = () => {

    const data = [
      {
        cateImg: "images/category/computer.png",
        cateName: "Computer",
      },
      {
        cateImg: "images/category/eletronica.png",
        cateName: "Elettronica",
      },
      {
        cateImg: "images/category/telefono.png",
        cateName: "Telefoni",
      },
      {
        cateImg: "images/category/smartwatch.png",
        cateName: "Smartwatch",
      },
      {
        cateImg: "images/category/cuffie.png",
        cateName: "Cuffie",
      },
      {
        cateImg: "images/category/Mouse-tastiera.png",
        cateName: "Mouse  tastiere",
      },
      {
        cateImg: "images/category/monitor.png",
        cateName: "Monitor",
      },
      {
        cateImg: "images/category/modem.png",
        cateName: "Modem",
      },
    ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (
            <div className='category-box f_flex' key={index} >
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories