import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import Spinner from './Spinner'
import { baseUrl } from '../layouts/App';

const Contactus = () => {
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [contactInput, setContact] = useState({
        name: '',
        email: '',
        message: '',
        errors: [] 
    });

    const handleInput = (e) => {
        e.persist();
        setContact({ ...contactInput, [e.target.name]: e.target.value })
    }
  

    const fetchcontact = async () => {
        let result = await fetch(baseUrl + "/api/settings");
        result = await result.json();
        setLoading(false);
        setData(result);
    }

    async function contactform() {
        let item = {
            name: contactInput.name,
            email: contactInput.email,
            message: contactInput.message,
        };

        let result = await fetch(baseUrl + "/api/contact", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        localStorage.setItem("contact-info", JSON.stringify(result));

        function messageHide() {
            $('.message').animate({ opacity: 0, top: '0px' }, 'slow');
            setTimeout(function () { $(".message").html(''); }, 1000);
        }

        function messageShow(data) {
            $(".message").html(data);
            $('.message').animate({ opacity: 1, top: '60px' }, 'slow');
            setTimeout(function () { messageHide() }, 3000);
        }
        if (result.status == 1) {
            messageShow(setIsSuccessfullySubmitted(<div className='alert alert-success'>Message Submitted Successfully</div>));
            setContact({
                name: '',
                email: '',
                message: '',
                errors: []
            });
        } else if (result.status == 0) {
            messageShow(setIsSuccessfullySubmitted(<div className='alert alert-danger'>Internal Server Error</div>));
            setContact({
                name: '',
                email: '',
                message: '',
                errors: [] 
            });
        } else {
            setContact({ ...contactInput, errors: result.errors })
        }
        
    }

    useEffect(() => {
        fetchcontact();
    }, [])
    return (
        <div>
            <div id="main-content">
                <div className="section-head single mb-5 border py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <h3 className="align-self-center">Contact Us</h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                        <li className="breadcrumb-item active">Contact Us</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-xl container-fluid">
                    {loading && <Spinner />}
                    <div className="row">
                        <div className="col-lg-6 col-md-7">
                            <div className="contact-form">
                                <div className="form-group mb-3">
                                    <label htmlFor="">Your Name</label>
                                    <input type="text" value={contactInput.name} onChange={handleInput} name="name" placeholder="Your Name" className="form-control" required />
                                    <span className='text-danger'>{contactInput.errors.name}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="">Email</label>
                                    <input type="email" value={contactInput.email} onChange={handleInput} name="email" placeholder="Your Email" className="form-control" required />
                                    <span className='text-danger'>{contactInput.errors.email}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="">Your Message</label>
                                    <textarea name="message" value={contactInput.message} onChange={handleInput} id="" placeholder="Your Message" className="form-control" cols="30" rows="5" required></textarea>
                                    <span className='text-danger'>{contactInput.errors.message}</span>
                                </div>
                                <button onClick={contactform} className="btn dark">Send Message</button>
                            </div>
                            {isSuccessfullySubmitted &&
                                <div className="message">{isSuccessfullySubmitted}</div>
                            }
                        </div>
                        <div className="offset-lg-1 col-lg-5 col-md-5">
                            {
                                data.map((item, i) =>
                                    <div className="contact-box" key={i}>
                                        <div className="contact-details">
                                            <h4 className="title">Contact Us:</h4>
                                            <span>+977-{item.phone}</span>
                                            <p>{item.email}</p>
                                        </div>
                                        <div className="contact-details">
                                            <h4 className="title">Address:</h4>
                                            <p>{item.address}</p>
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

export default Contactus
