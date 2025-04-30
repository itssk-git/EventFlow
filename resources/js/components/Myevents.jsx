import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment';
import Spinner from './Spinner';
import { baseUrl } from '../layouts/App';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

const Myevents = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    if (!localStorage.getItem('token')) {
        navigate('/login');
    }

    let bearer = 'Bearer ' + localStorage.getItem('token')

    const fetchmyevents = async () => {
        let result = await fetch(baseUrl + "/api/my_events", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': bearer,
            },
        });
        result = await result.json();
        setLoading(false);
        setData(result);
    }

    const itemsPerPage = 10;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        fetchmyevents();
    }, [])

    return (
        <div>
            <div id="main-content">
                <div className="section-head single mb-5 border py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <h3 className="align-self-center">My Events</h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                        <li className="breadcrumb-item active">My Events</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="latest-events">
                    <div className="container">
                        {loading && <Spinner />}
                        {
                            data.slice(itemOffset, endOffset).map((item, i) =>
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
                                        <h4><Link to="">{item.event_name}</Link></h4>
                                        <ul>
                                            <li><i class="fa fa-map-marker-alt"></i> {item.event_city}</li>
                                            {/* <li><i class="fa fa-table"></i> {Moment(item.start_time).format('d MMM,Y')}</li> */}
                                            {/* <li><i class="far fa-clock"></i> {Moment(item.start_time).format('h:mm a')}</li> */}
                                            <li><b>Ticket No. #{item.id}</b></li>
                                        </ul>
                                        
                                        <p>{item.description}</p>
                                        <Link to={"/view_event/" + item.id} className="btn dark mb-3">View More</Link>
                                    </div>
                                </div>
                            )
                        }
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={Math.ceil(data.length / itemsPerPage)}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            className='pagination'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Myevents
