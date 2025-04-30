import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../layouts/App';

function Footer() {
    const [data, setData] = useState([]);

    const fetchsettings = async () => {
        let result = await fetch(baseUrl + "/api/settings");
        result = await result.json();
        setData(result);
    }

    useEffect(() => {
        fetchsettings();
    }, [])

    return (
        <>
            <footer id="footer">
                <div className="top-footer py-5">
                    <div className="container">
                        {
                            data.map((item, i) =>
                                <div className="row" key={i}>
                                    <div className="col-md-6">
                                    <img src={baseUrl + '/public/site/' + item.site_logo} alt="" style={{
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover'
}} />

                                    </div>
                                    <div className="col-md-6 text-end align-self-center">
                                        <p className="copyright-text m-0"> {item.copyright_text}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="main-footer pt-5 pb-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9">
                                <ul className="about-links">
                                    <li>About</li>
                                    <li><Link to="/signup"> Register</Link></li>
                                </ul>
                                {
                                    data.map((item, i) =>
                                        <ul className="social-links" key={i}>
                                            <li>Stay Connected</li>
                                            {item.facebook ?
                                                <li>
                                                    <a href={item.facebook} className="facebook"><i className="fab fa-facebook-f"></i> Facebook</a>
                                                </li> : <li></li>
                                            }

                                            {item.twitter ?
                                                <li>
                                                    <a href={item.twitter} className="twitter"><i className="fab fa-x"></i> X/Twitter</a>
                                                </li> : <li></li>
                                            }

                                            {item.instagram ?
                                                <li>
                                                    <a href={item.instagram} className="instagram"><i className="fab fa-instagram"></i> Instagram</a>
                                                </li> : <li></li>
                                            }
                                        </ul>
                                    )
                                }
                            </div>
                            <div className="col-md-3">
                                <ul className="footer-links">
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link to="/all_events">Events</Link></li>
                                    <li><Link to="/contact">Contact Us</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
