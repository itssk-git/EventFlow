import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Moment from 'moment';
import Spinner from './Spinner';
import ReactPaginate from 'react-paginate';
import { baseUrl } from '../layouts/App';

const Events = () => {
    const [data, setData] = useState([]);
    const date = new Date();
    const showTime = date.getTime();
    const [loading, setLoading] = useState(true);
    const [category_name, setCategory] = useState('');
    const params = useParams();

    const fetchcatevent = async () => {
        let result = await fetch(baseUrl + "/api/events/" + params.id);
        result = await result.json();
        setLoading(false);
        setCategory(0)
        setData(result);
    }

    const itemsPerPage = 1;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        fetchcatevent();
    }, [data, category_name]);

    // Filter the events to exclude inactive ones (status !== "0")
    const filteredData = data.filter(item => item.status !== "0" && item.ticket_available > 0 && Date.parse(item.end_time) > showTime);

    return (
        <>
            <div id="main-content">
                <div className="section-head single mb-5 border py-5">
                    <div className="container">
                        <div className="row">
                            {
                                filteredData.map((item, i) =>
                                    <div className="col d-flex flex-row justify-content-between" key={i}>
                                        {(category_name === i) ? <h3 className="align-self-center">{item.category_name}</h3> : <h3 className='d-none'></h3>}
                                        <nav aria-label="breadcrumb">
                                            {(category_name === i) ?
                                                <ol className="breadcrumb">
                                                    <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                                    <li className="breadcrumb-item active">{item.category_name}</li>
                                                </ol> : <ol className='d-none'></ol>}
                                        </nav>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="latest-events">
                    <div className="container">
                        {loading && <Spinner />}
                        {
                            filteredData.slice(itemOffset, endOffset).map((item, i) =>
                                <div className="latest-grid row" key={i}>
                                    <Link to={"/eventdetails/"+item.event_id} className="col-lg-4">
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
                                            <li>{Moment(item.start_time).format('D MMM,Y')}</li>
                                            <li>{Moment(item.start_time).format('h:mm a')}</li>
                                        </ul>
                                        <p>{item.description}</p>
                                        <Link to={"/eventdetails/"+item.event_id} className="btn dark mb-3">Read More</Link>
                                        <p className="ticket-available"><span>Tickets Available: </span>{item.ticket_available}</p>
                                    </div>
                                </div>
                            )
                        }
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            className='pagination'
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Events;
