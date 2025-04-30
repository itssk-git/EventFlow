import React from 'react'
import Banner from './Banner'
import Category from './Category'
import LatestEvents from './LatestEvents'

const Homepage = () => {
  return (
    <div>
        <Banner />
        <LatestEvents />
        <Category />
    </div>
  )
}

export default Homepage