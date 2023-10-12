import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from "../Stores/CategorySlice"

export default function Catgories() {
  let { categoryList } = useSelector((selector) => selector.categoryData)
  let Disp = useDispatch()
  useEffect(() => {
    Disp(getAllCategory())
  }, [])
  return (
    <div className='container mt-5'>
    <div className='row g-3'>
      {categoryList.map((el) => {
        return <div className='col-md-3'>
          <div className='category'>
            <div className='categoryImgBox'>
            <img src={el.image} className="w-100 smallImg" alt="" />
            </div>
            <div className='textBox'>
              <h5 className='text-center py-3'>{el.name}</h5>
            </div>
          </div>
        </div>
      })}

    </div>
  </div>
  )
}


{/* <img src={el.image} className="w-100 smallImg" alt="" />
<h5>{el.name}</h5> */}