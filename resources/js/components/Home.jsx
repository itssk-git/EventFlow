import React from 'react'
import Banner from './Banner'
import Category from './Category'
import Eventsearch from './Eventsearch'
import LatestEvents from './LatestEvents'
import UpcomingEvent from './UpcomingEvent'

function Home() {
    return (
        <div>
            <Banner />
            <Eventsearch />
            <UpcomingEvent />
            <Category />
            <LatestEvents />
        </div>
    )
}

export default Home