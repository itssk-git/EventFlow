import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment'
import Spinner from './Spinner'
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

    const [nameInput, setName] = useState({
        event_city: '',
        from_date: '',
        to_date: ''
    });

    const fetchcatevent = async () => {
        let result = await fetch(baseUrl + "/api/allupcoming_lists?" + params.toString(), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        result = await result.json();
        setLoading(false);
        setData(result);
    }

    const fetchsetting = async () => {
        let settings = await fetch(baseUrl + "/api/settings");
        settings = await settings.json();
        setLoading(false);
        setData1(settings);
    }

    const fetchcategory = async () => {
        let result = await fetch(baseUrl + '/api/category_list');
        result = await result.json();
        setData2(result);
    }

    const handleInput = (e) => {
        e.persist();ss
        setName({ ...nameInput, [e.target.name]: e.target.value })
    }

    async function searchfrom(e) {
        e.preventDefault();
        const item = {
            keyword: nameInput.keyword,
            event_city: nameInput.event_city,
            from_date: nameInput.from_date,
            to_date: nameInput.to_date
        }

        navigate("/all_events?keyword=" + nameInput.keyword + "&city=" + nameInput.event_city + "&from_date=" + nameInput.start_date + "&to_date=" + nameInput.end_date);
    }

    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        //const { category } = userinfo;

        console.log(`${value} is ${checked}`);

        // Case 1 : The user checks the box
        if (checked) {
            setSCat([...sCat, value]);
            console.log(sCat);
            navigate("/all_events?keyword="+nameInput.keyword + "&city="+nameInput.event_city + "&start_date="+nameInput.start_date + "&end_date="+nameInput.end_date + "&category="+value);
        } else {
            setSCat({
                sCat: sCat.filter((e) => e !== value),
                //response: category.filter((e) => e !== value),
            });
        }

        // console.log(userinfo.response);
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
    }, [data])

    return (
        <div>
            <div id="search-form-section" className="py-5 mb-5">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-2">
                            <label>Search Keyword</label>
                            <input type="text" name="keyword" value={nameInput.keyword} onChange={handleInput} className="form-control" />
                        </div>
                        {/* <div className="col-md-2">
                            <label>Location</label>
                            <input type="text" name="event_city" value={nameInput.event_city} onChange={handleInput} className="form-control" />
                        </div>
                        <div className="col-md-2">
                            <label>From Date</label>
                            <input type="datetime-local" name="from_date" value={nameInput.from_date} onChange={handleInput} className="form-control" />
                        </div>
                        <div className="col-md-2">
                            <label>To Date</label>
                            <input type="datetime-local" name="to_date" value={nameInput.to_date} onChange={handleInput} className="form-control" />
                        </div> */}
                        <div className="col-md-2">
                            <button onClick={searchfrom} className="btn light w-100 mt-4">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="search-result-section">
                <div className="container">
                    {loading && <Spinner />}
                    <div className="row">
                        <div className="col-md-3">
                            <div className="sidebar-widget">
                                <h4>Category</h4>
                                <div className="category-checkbox-list">
                                    {
                                        data2.map((item, i) =>
                                            <div className="category-checkbox" key={i}>
                                                <input type="checkbox" id={item.id} name="category" value={item.id} onChange={handleChange} />
                                                <label htmlFor={item.id}>{item.name}</label>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div id="latest-events">
                                <div className="section-head mb-4 d-flex justify-content-between border px-2 py-2">
                                    <h3 className="align-self-center">Latest Events</h3>
                                    {/* <div className="sort-selectbox">
                                        <span className="">Sort By</span>
                                        <select name="sort" className="form-control">
                                            <option value="1">Oldest</option>
                                            <option value="1">Newest</option>
                                        </select>
                                    </div> */}
                                </div>
                                {
                                    data.slice(itemOffset, endOffset).map((item, i) =>
                                        <div className="latest-grid event-res row" key={i}>
                                            <Link to={"/eventdetails/" + item.event_id} className="col-lg-3">
                                                <img src={baseUrl + '/public/event/' + item.event_img.split(',')[0]} alt="" />
                                            </Link>
                                            <div className="event-info col-lg-6">
                                                <h4><Link to={"/eventdetails/" + item.event_id}>{item.event_name}</Link></h4>
                                                <ul>
                                                    <li>
                                                        <span>Venue</span> {item.event_city}
                                                    </li>
                                                    <li>
                                                        <span>date</span> {Moment(item.start_time).format('d MMM,Y')}
                                                    </li>
                                                    <li>
                                                        <span>Time</span> {Moment(item.start_time).format('h:mm a')}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="event-price col-lg-3">
                                                <span>Price</span>
                                                {
                                                    data1.map((element, i) =>
                                                        <span key={i}>{element.cur_format}{item.ticket_price}</span>
                                                    )
                                                }
                                                <Link to={"/eventdetails/" + item.event_id} className="btn dark mb-3">Book Ticket</Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
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
        </div>
    )
}

export default Allevents
