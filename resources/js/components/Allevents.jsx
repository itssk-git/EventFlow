import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';
import Spinner from './Spinner';
import ReactPaginate from 'react-paginate';
import { baseUrl } from '../layouts/App';

const Allevents = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [sCat, setSCat] = useState([]);

    const date = new Date();
    const showTime = date.getTime();

    let keyword = params.get('keyword') ? params.get('keyword') : '';
    let city = params.get('city') ? params.get('city') : '';
    let from_date = params.get('from_date') ? params.get('from_date') : '';
    let to_date = params.get('to_date') ? params.get('to_date') : '';
    let category = params.get('category') ? params.get('category').slice(0,-1).split(',') : [];

    const [nameInput, setName] = useState({
        keyword: keyword,
        event_city: city,
        from_date: from_date,
        to_date: to_date,
        category: category,
    });

    const fetchcatevent = async () => {
        let result = await fetch(baseUrl + "/api/all_events?" + params.toString(), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        result = await result.json();
        setLoading(false);
        setData(result);
        setSCat(category);
    };

    const fetchsetting = async () => {
        let settings = await fetch(baseUrl + "/api/settings");
        settings = await settings.json();
        setLoading(false);
        setData1(settings);
    };

    const fetchcategory = async () => {
        let result = await fetch(baseUrl + '/api/category_list');
        result = await result.json();
        setData2(result);
    };

    const handleInput = (e) => {
        e.persist();
        setName({ ...nameInput, [e.target.name]: e.target.value });
    };

    async function searchfrom(e) {
        e.preventDefault();
        
        let url = '/all_events?';
        if(nameInput.keyword){
            url += 'keyword='+nameInput.keyword+'&';
        }
        if(nameInput.event_city){
            url += 'city='+nameInput.event_city+'&';
        }
        if(nameInput.start_date && nameInput.end_date){
            url += 'from_date='+nameInput.start_date+'&'+'to_date='+nameInput.to_date+'&';
        }

        if(sCat.length > 0){
            url += 'category='+sCat.join()+','; 
        }

        navigate(url);
    }

    const handleChange = (e) => {
        setLoading(true);
        const { value, checked } = e.target;
        if (checked) {
            let cat = sCat;
            cat.push(value);      
            setSCat(cat);
        } else {
            let cat = sCat;
            if (cat.indexOf(value) > -1) { 
                cat.splice(cat.indexOf(value), 1); 
            }
            setSCat(cat);
        }
        searchfrom(e);
    };

    const itemsPerPage = 9;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        fetchcatevent();
        fetchsetting();
        fetchcategory();
    }, [params]);

    // Filter the events based on their availability, expiration status, and active status
    const filteredData = data.filter(item => {
        // Check if event status is not inactive (status !== "0"), event availability, and expiration
        const isAvailable = item.ticket_available > 0;
        const isNotExpired = Date.parse(item.end_time) > showTime;
        const isActive = item.status !== "0";  // Check if the event status is not "0" (inactive)
        return isAvailable && isNotExpired && isActive;
    });

    return (
        <div>
            <div id="search-form-section" className="py-5 mb-5">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-2">
                            <label>Search Keyword</label>
                            <input 
                                type="text" 
                                name="keyword" 
                                value={nameInput.keyword} 
                                onChange={handleInput} 
                                className="form-control" 
                            />
                        </div>
                        <div className="col-md-2">
                            <button onClick={searchfrom} className="btn light w-100 mt-4">Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="search-result-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="sidebar-widget">
                                <h4>Category</h4>
                                <div className="category-checkbox-list">
                                    {data2.map((item, i) => (
                                        <div className="category-checkbox" key={i}>
                                            <input 
                                                type="checkbox" 
                                                id={item.id} 
                                                name="category" 
                                                checked={sCat.includes(`${item.id}`)} 
                                                value={item.id} 
                                                onChange={handleChange} 
                                            />
                                            <label htmlFor={item.id}>{item.name}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div id="latest-events">
                                <div className="section-head mb-4 d-flex justify-content-between border px-2 py-2">
                                    <h3 className="align-self-center">Latest Events</h3>
                                </div>
                                {loading && <Spinner />}
                                {filteredData.length > 0 ? 
                                    filteredData.slice(itemOffset, endOffset).map((item, i) => (
                                        <div className="latest-grid event-res row" key={i}>
                                            <Link to={"/eventdetails/" + item.event_id} className="col-lg-3">
                                                <img src={baseUrl + '/public/event/' + item.event_img.split(',')[0]} alt="" />
                                            </Link>
                                            <div className="event-info col-lg-6">
                                                <h4><Link to={"/eventdetails/" + item.event_id}>{item.event_name}</Link></h4>
                                                <ul>
                                                    <li><span>Venue</span> {item.event_city}</li>
                                                    <li><span>Date</span> {Moment(item.start_time).format('d MMM,Y')}</li>
                                                    <li><span>Time</span> {Moment(item.start_time).format('h:mm a')}</li>
                                                </ul>
                                            </div>
                                            <div className="event-price col-lg-3">
                                                <span>Price</span>
                                                {data1.map((element, i) => (
                                                    <span key={i}>{element.cur_format}{item.ticket_price}</span>
                                                ))}
                                                <Link to={"/eventdetails/" + item.event_id} className="btn dark mb-3">Book Ticket</Link>
                                            </div>
                                        </div>
                                    )) : <span className="text-center">No Record Found</span>
                                }
                            </div>
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
            </div>
        </div>
    );
};

export default Allevents;
