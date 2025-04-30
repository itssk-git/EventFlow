import React, { useState, useEffect } from 'react'
import { baseUrl } from '../layouts/App';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = (props) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchBanner = async () => {
        let result = await fetch(baseUrl + '/api/banner_list',{});
        result = await result.json();
        setIsLoaded(true);
        setData(result);
    }

    useEffect(() => {
        fetchBanner();
    }, [])
    return (
        <div>
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                slidesPerView={props.slideview}
                loop={props.Loop}
                autoplay={props.Autoplay}
                navigation={props.Navigation}
                pagination={{ clickable: props.Pagination }}
            >
                {
                    data.map((item, i) =>
                        <SwiperSlide key={i}>

                            <div className="banner-img d-block" style={{ backgroundImage: `url(${baseUrl + "/public/banner/" + item.banner_img})` }}>
                                <div className="banner-description">
                                    <h1>Creating Moments, Building Memories</h1>
                                    <p>
                                    Crafting unforgettable experiences, fostering genuine connections, and building lasting relationships through creativity, passion, and meaningful moments that leave a lasting impact on hearts and minds.
                                    </p>
                                </div>
                            </div>

                        </SwiperSlide>
                    )
                }

            </Swiper>
        </div>
    )
}

export default Slider