import React from 'react'
import sliderimg1 from "../Images/slider-image-1.jpeg"
import sliderimg2 from "../Images/slider-image-2.jpeg"
import sliderimg3 from "../Images/slider-image-3.jpeg"
import sliderimg4 from "../Images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg"
import sliderimg5 from "../Images/1681511121316.png"
import sliderimg6 from "../Images/grocery-banner-2.jpeg"
import sliderimg7 from "../Images/grocery-banner-2.jpeg"
import sliderimg8 from "../Images/grocery-banner-2.jpeg"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function MainSlider() {
return (
    <div className='container'>
        <div className="row g-0">
            <div className="col-md-9">
            <OwlCarousel className='owl-theme' items={1} autoPlay={true}   loop margin={10} dots={true} >
    <div className='item'>
    <img className='w-100 mainImg' src={sliderimg1} alt="" />
    </div>
    <div className='item'>
    <img className='w-100 mainImg' src={sliderimg2} alt="" />
    </div>
    <div className='item'>
    <img className='w-100 mainImg' src={sliderimg3} alt="" />
    </div>
    </OwlCarousel>
        </div>
            <div className="col-md-3">
            <img className='w-100 subimg' src={sliderimg5} alt="" />
                <img className='w-100 subimg' src={sliderimg4} alt="" />
            </div>

        </div>
    </div>
  )
}
