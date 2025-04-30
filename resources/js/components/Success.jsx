import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
    return (
        <div>
            <div className="section-head single mb-5 border py-5">
                <div className="container">
                    <div className="row">
                        <div className="col d-flex flex-row justify-content-between">
                            <h3 className="align-self-center">Booking Successfull</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                    <li className="breadcrumb-item active">Booking Successfull</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div id="user-content">
                <div className="container">
                    <div className='row'>
                        <div className='offset-md-4 col-md-4'>
                            <div className="payment">
                                <div className="payment_header">
                                    <div className="check"><i class="fa fa-check" aria-hidden="true"></i></div>
                                </div>
                                <div className="content-desc">
                                    <h1>Payment Success !</h1>
                                    <p>Event booking successfully. </p>
                                    <Link to={"/my_events"}>My Events</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success
