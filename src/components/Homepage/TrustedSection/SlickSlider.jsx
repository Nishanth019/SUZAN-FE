'use client'

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const TrustedSlider = ({data}) => {
    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        arrows: true,
        slidesToShow:2,
        slidesToScroll: 1
    };
    return (
        <div className="w-56">
            <Slider {...settings}>
              {
                data.map((ele, ind )=> (
                    <div className="justify-center px-2 items-center flex ">
                        <img src={ele} key={ind} alt="" className="max-w-[100px]" />
                    </div>
                ))
              }

            </Slider>
        </div>

    );
}
