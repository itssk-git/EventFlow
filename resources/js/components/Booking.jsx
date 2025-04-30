import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Moment from 'moment';
import Spinner from './Spinner';
import { baseUrl } from '../layouts/App';

const Booking = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const codeRef = useRef();
    const countryRef = useRef();
    const eventidRef = useRef();
    const quantityRef = useRef();
    const priceRef = useRef();
    const availableRef = useRef();
    const eventnameRef = useRef();
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    let bearer = 'Bearer ' + localStorage.getItem('token')

    const fetcheventdetail = async () => {
        let result1 = await fetch(baseUrl + "/api/booking/" + params.id);
        result1 = await result1.json();
        setLoading(false);
        setData1(result1);
    }

    const fetchuser = async () => {
        let result = await fetch(baseUrl + "/api/user", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': bearer,
            },
        });
        result = await result.json();
        // console.log(result.data);
        setData(result.data);
    }

    const fetchsettings = async () => {
        let settings = await fetch(baseUrl + "/api/settings");
        settings = await settings.json();

        setData2(settings);
    }

    const eventBooking = async (event) => {
        event.preventDefault();
    
        // Generating a random payment ID
        const generateRandomPaymentId = () => {
            return 'PAY' + Math.floor(Math.random() * 1000000000); 
        };
    
        const item = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            pin_code: codeRef.current.value,
            country: countryRef.current.value,
            event_id: eventidRef.current.value,
            ticket_quantity: quantityRef.current.value,
            total_price: priceRef.current.value,
            ticket_available: availableRef.current.value,
            event_name: eventnameRef.current.value,
            payment_id: generateRandomPaymentId(), // Use generated payment ID
        };
    
        // Sending booking details to the server without payment integration
        let booking = await fetch(baseUrl + "/api/booking/" + params.id, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        
        booking = await booking.json();
        
        // Navigate to the success page if booking is successful
        if (booking.status === 1) {
            navigate('/success');
        }
    };
    
    useEffect(() => {
        fetchuser();
        fetcheventdetail();
        fetchsettings();
    }, [])

    return (
        <div>
            <div className="booking">
                <div className="section-head single mb-5 border py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <h3 className="align-self-center">Book Event</h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                        <li className="breadcrumb-item active">Book Event</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-xl container-fluid">
                    {loading && <Spinner />}
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="title dark">Your Information</h3>
                            <div className="booking-form" >
                                <div className="row" >
                                    <ul className="user-list">
                                        <li>
                                            <span><b>Name:</b></span>
                                            <span>{data.name || ''}</span>
                                        </li>
                                        <li>
                                            <span><b>Email:</b></span>
                                            <span>{data.email || ''}</span>
                                        </li>
                                        <li>
                                            <span><b>Phone Number:</b></span>
                                            <span>{data.phone || ''}</span>
                                        </li>
                                        <li>
                                            <span><b>City:</b></span>
                                            <span>{data.city || ''}</span>
                                        </li>
                                        <li>
                                            <span><b>State:</b></span>
                                            <span>{data.state || ''}</span>
                                        </li>
                                        <li>
                                            <span><b>Pin Code:</b></span>
                                            <span>{data.pin_code || ''}</span>
                                        </li>
                                        <li>
                                            <span><b>Country:</b></span>
                                            <span>{data.country || ''}</span>
                                        </li>
                                    </ul>
                                </div>
                                <input type="hidden" name="name" placeholder="Your Name" className="form-control" value={data.name} ref={nameRef} />
                                <input type="hidden" name="email" placeholder="Your Email" className="form-control" value={data.email} ref={emailRef} />
                                <input type="hidden" name="phone" placeholder="Your Number" className="form-control" value={data.phone} ref={phoneRef} />
                                <input type="hidden" name="city" placeholder="Your City" className="form-control" value={data.city} ref={cityRef} />
                                <input type="hidden" name="state" placeholder="Your State" className="form-control" value={data.state} ref={stateRef} />
                                <input type="hidden" name="pin_code" placeholder="Your Pin Code" className="form-control" value={data.pin_code} ref={codeRef} />
                                <input type="hidden" name="country" placeholder="Your Country" className="form-control" value={data.country} ref={countryRef} />
                                <button type="submit" onClick={eventBooking} className="main-btn btn-filled btn dark" >Checkout</button>
                            </div>
                        </div>
                        <div className="offset-lg-1 col-lg-5 col-md-6">
                            {
                                data1.map((item, i) =>
                                    <div className="event-sidebar" key={i}>
                                        <input type="hidden" name="event_id" value={item.event_id} ref={eventidRef} />
                                        <input type="hidden" name="event_name" value={item.event_name} ref={eventnameRef} />
                                        <input type="hidden" name="ticket_quantity" value={localStorage.getItem('quantity')} ref={quantityRef} />
                                        <input type="hidden" name="ticket_available" value={item.ticket_available} ref={availableRef} />
                                        <div className="sidebar-img">
                                            <img src={baseUrl + '/public/event/' + item.event_img.split(',')[0]} alt="" style={{ width: '100%' }} />
                                        </div>

                                        <div className="sidebar-desc">
                                            <h4 className="title-heading"><Link to={"/eventdetails/" + item.event_id}>{item.event_name}</Link></h4>
                                            <Link to={"/events/" + item.event_cat} className="event-cat"><span><i className="fa fa-cube" aria-hidden="true"></i> {item.category_name}</span></Link>
                                            <span className="event-date"><i className="fa fa-calendar" aria-hidden="true"></i> {Moment(item.start_time).format('d MMM,Y')}</span>
                                            {
                                                data2.map((element, i) =>
                                                    <p key={i} className="mb-1"><span><b>Tax: </b></span>{element.tax}%</p>
                                                )
                                            }
                                            <p className="m-0"><span><b>Ticket Quantity: </b></span>{localStorage.getItem('quantity')}</p>
                                        </div>
                                        <div className="total-amount">
                                            {
                                                data2.map((element, i) =>
                                                    <p key={i}>
                                                        Total: {element.cur_format}{Math.ceil((item.ticket_price * localStorage.getItem('quantity')) + (item.ticket_price * localStorage.getItem('quantity') * element.tax / 100))}
                                                        <input type="hidden" name="total_price" value={Math.ceil((item.ticket_price * localStorage.getItem('quantity')) + (item.ticket_price * localStorage.getItem('quantity') * element.tax / 100))} ref={priceRef} />
                                                    </p>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Booking
