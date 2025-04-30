import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import Moment from 'moment';
import Spinner from './Spinner';
import { baseUrl } from '../layouts/App';

const Eventdetails = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const date = new Date();
    const showTime = date.getTime();

    const fetchbooking = async () => {
        localStorage.setItem('quantity', quantity);
    };

    const fetcheventdetails = async () => {
        let result = await fetch(baseUrl + '/api/event_details/' + params.event_id);
        result = await result.json();
        setLoading(false);
        setData(result);
    };

    const fetchsetting = async () => {
        let settings = await fetch(baseUrl + '/api/settings');
        settings = await settings.json();
        setLoading(false);
        setData1(settings);
    };

    useEffect(() => {
        fetcheventdetails();
        fetchsetting();
    }, []);

    return (
        <div>
            <div id="main-content">
                <div className="section-head single mb-5 border py-5">
                    <div className="container">
                        <div className="row">
                            {data.map((item, i) => (
                                <div className="col d-flex flex-row justify-content-between" key={i}>
                                    <h3 className="align-self-center">{item.event_name}</h3>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to="/">Home</Link>
                                            </li>
                                            <li className="breadcrumb-item active">{item.event_name}</li>
                                        </ol>
                                    </nav>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="single-event-info">
                    <div className="container">
                        {loading && <Spinner />}
                        {data.map((item, i) => (
                            <div className="row" key={i}>
                                <div className="col-md-4 mb-5">
                                    <div className="event-info">
                                        <i className="fa fa-map-marker-alt"></i>
                                        <span>{item.event_city}</span>
                                        <span className="small">{item.event_state}</span>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-5">
                                    <div className="event-info">
                                        <i className="far fa-clock"></i>
                                        <span>{Moment(item.start_time).format('DD MMM,Y')} - {Moment(item.end_time).format('DD MMM,Y')}</span>
                                        <span className="small">{Moment(item.start_time).format('h:mm a')}</span>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-5">
                                    <div className="event-info">
                                        <span className="small">Price</span>
                                        {data1.map((element, i) => (
                                            <span key={i}>
                                                {element.cur_format}
                                                {item.ticket_price}
                                            </span>
                                        ))}
                                        {item.ticket_available > 0 && Date.parse(item.end_time) > showTime ? (
                                            <div>
                                                <div className="form-group mb-3">
                                                    <label>
                                                        <b>Ticket Quantity</b>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="ticket_quantity"
                                                        defaultValue={quantity}
                                                        onChange={(e) => {
                                                            const value = parseInt(e.target.value, 10);
                                                            setQuantity(value);
                                                        }}
                                                    />
                                                </div>
                                                {quantity > item.ticket_available ? (
                                                    <p className="text-danger">Quantity exceeds available tickets.</p>
                                                ) : null}
                                                {!localStorage.getItem('token') ? (
                                                    <Link
                                                        className={`btn dark ${quantity > item.ticket_available || quantity <= 0 ? 'disabled' : ''}`}
                                                        to={'/login'}
                                                    >
                                                        Book Ticket
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        onClick={quantity <= item.ticket_available && quantity > 0 ? fetchbooking : null}
                                                        className={`btn dark ${quantity > item.ticket_available || quantity <= 0 ? 'disabled' : ''}`}
                                                        to={'/booking/' + item.event_id}
                                                    >
                                                        Book Ticket
                                                    </Link>
                                                )}
                                                <div>
                                                    <p className="text-info">
                                                        Tickets Remaining: {item.ticket_available}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : item.ticket_available === 0 ? (
                                            <p className="text-danger event-expire">Tickets are not available.</p>
                                        ) : (
                                            <p className="text-danger event-expire">Event has expired.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {data.map((item, i) => (
                            <div className="row mb-5" key={i}>
                                <div className="col-md-6">
                                    <OwlCarousel className="owl-theme" loop={true} margin={10} items={1} nav>
                                        {item.event_img.split(',').map((img, i) => (
                                            <div className="item" key={i}>
                                                <img className="event-img" src={baseUrl + '/public/event/' + img} alt="" />
                                            </div>
                                        ))}
                                    </OwlCarousel>
                                </div>
                                <div className="col-md-6">
                                    <div className="about-event">
                                        <h4>About This Event</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {data.map((item, i) => (
                            <div className="row" key={i}>
                                <div className="col-md-4">
                                    <div className="event-info">
                                        <span>Organization</span>
                                        <span className="small">{item.event_organization}</span>
                                        <span>Phone</span>
                                        <span className="small">+91-{item.phone}</span>
                                        <span>Email</span>
                                        <span className="small">{item.email}</span>
                                        <ul className="social-links">
                                            {item.facebook ? (
                                                <li>
                                                    <a href={item.facebook} className="facebook">
                                                        <i className="fab fa-facebook-f"></i>
                                                    </a>
                                                </li>
                                            ) : (
                                                <li></li>
                                            )}

                                            {item.twitter ? (
                                                <li>
                                                    <a href={item.twitter} className="twitter">
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                </li>
                                            ) : (
                                                <li></li>
                                            )}

                                            {item.instagram ? (
                                                <li>
                                                    <a href={item.instagram} className="instagram">
                                                        <i className="fab fa-instagram"></i>
                                                    </a>
                                                </li>
                                            ) : (
                                                <li></li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="event-info">
                                        <span>Audience</span>
                                        <span className="small text-capitalize">{item.audience}</span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="event-info p-0">
                                        <iframe
                                            src={`http://maps.google.com/maps?q=${item.event_latitude},${item.event_longitude}&z=18&output=embed`}
                                            className="map-iframe"
                                            width="100%"
                                            height="100%"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Eventdetails;
