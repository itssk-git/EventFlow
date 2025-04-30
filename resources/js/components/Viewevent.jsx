import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Moment from 'moment';
import Spinner from './Spinner';
import { baseUrl } from '../layouts/App';

const Viewevent = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    let bearer = 'Bearer ' + localStorage.getItem('token')

    const fetchviewevent = async () => {
        let result = await fetch(baseUrl + "/api/view_event/" + params.id, {
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

    const fetchsetting = async () => {
        let settings = await fetch(baseUrl + "/api/settings");
        settings = await settings.json();
        setData1(settings);
    }

    useEffect(() => {
        fetchviewevent();
        fetchsetting();
    }, [])
    return (
        <div>
            <div id="main-content">
                <div className="section-head single mb-5 border py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <h3 className="align-self-center">View Event</h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                        <li className="breadcrumb-item active">View Event</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-content">
                    <div className="container">
                        {loading && <Spinner />}
                        <div className="row">
                            <div className="col-md-12">
                                {
                                    data.map((item, i) =>
                                        <table className="table table-bordered" style={{ backgroundColor: '#fff', }}>
                                            <tr>
                                                <th>Event Details</th>
                                            </tr>
                                            <tr>
                                                <td>Ticket No. </td>
                                                <td>#{item.id}</td>
                                            </tr>
                                            <tr>
                                                <td>Event Name </td>
                                                <td>{item.event_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Ticket Quantity </td>
                                                <td>{item.ticket_quantity}</td>
                                            </tr>
                                            <tr>
                                                <td>Total Price </td>
                                                {
                                                    data1.map((element, i) =>
                                                        <td key={i}>{element.cur_format}{item.total_amount}</td>
                                                    )
                                                }
                                            </tr>
                                            <tr>
                                                <td>Booking Date </td>
                                                <td>{Moment(item.created_at).format('D MMM,Y')}</td>
                                            </tr>
                                            <tr>
                                                <th>Personal Details</th>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td>{item.user_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{item.user_email}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone</td>
                                                <td>{item.user_phone}</td>
                                            </tr>
                                        </table>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Viewevent