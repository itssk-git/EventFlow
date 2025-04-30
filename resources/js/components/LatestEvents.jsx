import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment';
import { baseUrl } from '../layouts/App';

function LatestEvents() {
    const [data, setData] = useState([]);
    const date = new Date();
    const showTime = date.getTime();

    const fetchEvent = async () => {
        let result = await fetch(baseUrl + '/api/event_list');
        result = await result.json();
        console.log(result); // Check the structure of the data
        setData(result);
    }

    useEffect(() => {
        fetchEvent();
    }, []);

    return (
        <div id="latest-events">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-head mb-4 d-flex justify-content-between ">
                            <h3 className="align-self-center">Latest Events</h3>
                            <Link to={"/all_events"}>See All Events</Link>
                        </div>
                    </div>
                </div>
                {
                    data.length > 0 ? 
                    // Modify filter condition to check for status as string "0"
                    data.filter(item => item.status !== "0").map((item, i) => (
                        <div className="latest-grid row" key={i}>
                            <Link to={"/eventdetails/" + item.event_id} className="col-lg-4">
                                <img src={baseUrl + '/public/event/' + item.event_img.split(',')[0]} alt="" />
                                <div className="event-time">
                                    <span>{Moment(item.start_time).format('D')}</span>
                                    <span>{Moment(item.start_time).format('MMM')}</span>
                                    <span>{Moment(item.start_time).format('Y')}</span>
                                </div>
                            </Link>
                            <div className="event-info col-lg-8">
                                <h4><Link to={"/eventdetails/" + item.event_id}>{item.event_name}</Link></h4>
                                <ul>
                                    <li>{Moment(item.start_time).format('D MMM,Y')}</li>
                                    <li>{Moment(item.start_time).format('h:mm a')}</li>
                                </ul>
                                <p>{item.description}</p>
                                <Link to={"/eventdetails/" + item.event_id} className="btn dark mb-3">Read More</Link>
                                {(item.ticket_available > 0 && Date.parse(item.end_time) > showTime) ? 
                                    <p className="ticket-available"><span>Tickets Available: </span>{item.ticket_available}</p> : 
                                    (item.ticket_available == 0) ? 
                                    <p className="text-danger event-expire">Tickets are not available.</p> : 
                                    <p className="text-danger event-expire">Event has expired.</p>
                                }
                            </div>
                        </div>
                    )) : 
                    <span className="text-center">No record found</span>
                }
            </div>
        </div>
    )
}

export default LatestEvents;
