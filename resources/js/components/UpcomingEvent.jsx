import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment';
import { baseUrl } from '../layouts/App';

const mergeSort = (arr) => {
    if (arr.length <= 1) return arr; 

    const middle = Math.floor(arr.length / 2); 
    const left = arr.slice(0, middle);  
    const right = arr.slice(middle);   

    return merge(mergeSort(left), mergeSort(right));  // Recursively sort and merge
};

const merge = (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Merge two sorted arrays by comparing event start dates
    while (leftIndex < left.length && rightIndex < right.length) {
        if (Moment(left[leftIndex].start_time).isBefore(Moment(right[rightIndex].start_time))) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Concatenate the remaining elements of the left and right arrays
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

function LatestEvents() {
    const [data, setData] = useState([]);

    const fetchEvent = async () => {
        let result = await fetch(baseUrl + '/api/upcoming_lists');
        result = await result.json();
        
        // Filter out inactive events (status !== "0") before setting data
        const activeEvents = result.filter(item => item.status !== "0" && item.ticket_available > 0);
        setData(activeEvents);
    }

    useEffect(() => {
        fetchEvent();
    }, []);

    // Apply merge sort once the data is set
    useEffect(() => {
        if (data.length > 0) {
            const sortedData = mergeSort([...data]); // Clone data to avoid mutation
            setData(sortedData); // Update state with sorted events
        }
    }, [data]);

    return (
        <div id="upcoming-events" className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-head mb-4 d-flex justify-content-between">
                            <h3 className="align-self-center">Upcoming Events</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        data.length > 0 ? 
                            data.map((item, i) =>
                                <div className="col-lg-4 col-md-4" key={i}>
                                    <div className="event-grid">
                                        <img src={baseUrl + '/public/event/' + item.event_img.split(',')[0]} alt="" />
                                        <div className="event-time">
                                            <span>{Moment(item.start_time).format('D')}</span>
                                            <span>{Moment(item.start_time).format('MMM')}</span>
                                            <span>{Moment(item.start_time).format('Y')}</span>
                                        </div>
                                        <div className="event-price">NPR{item.ticket_price}</div>
                                        <div className="event-info">
                                            <h4><Link to={"/eventdetails/" + item.event_id}>{item.event_name}</Link></h4>
                                            <span className="location">{item.event_city}, {item.event_state}</span>
                                            <Link to={"/eventdetails/" + item.event_id}>View More</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                            : <span className="text-center">No Record Found</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default LatestEvents;

