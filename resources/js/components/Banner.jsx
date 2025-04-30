import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import Slider from './Slider'

function Banner() {
    return (
        <div>
            <Slider slideview={1} Loop={true} Autoplay={true} Navigation={true} Pagination={true} /> 
        </div>
    )
}

export default Banner
