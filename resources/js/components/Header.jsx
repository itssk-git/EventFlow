import React, { useState, useEffect } from 'react'
import { NavLink,Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import { baseUrl } from '../layouts/App';

function Header() {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(null);
    const navigate = useNavigate();

    let bearer = 'Bearer ' + localStorage.getItem('token')

    const logoutSubmit = async () => {
        let result1 = await fetch(baseUrl + "/api/logout", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': bearer,
            },
        });
        result1 = await result1.json();

        function messageHide() {
            $('.message').animate({ opacity: 0, top: '0px' }, 'slow');
            setTimeout(function () { $(".message").html(''); }, 1000);
        }

        function messageShow(data) {
            $(".message").html(data);
            $('.message').animate({ opacity: 1, top: '60px' }, 'slow');
            setTimeout(function () { messageHide() }, 3000);
        }

        if (result1.status == 1) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            messageShow(setIsSuccessfullySubmitted(<div className='alert alert-success'>{result1.success}</div>))
            setTimeout(function () { navigate('/'); }, 1000);
        }
    }

    var AuthButtons = '';
    if (!localStorage.getItem('token')) {
        AuthButtons = (
            <ul className="top-right">
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
            </ul>
        )
    }

    var userButtons = '';
    if (localStorage.getItem('token')) {
        userButtons = (
            <ul className="navbar-nav ml-auto">
                <div className="dropdown">
                    <button className="btn dropdown-toggle p-md-0 fw-bolder" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Hello, {localStorage.getItem('username')}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link className="dropdown-item" to="/my_profile">My Profile</Link>
                        <Link className="dropdown-item" to="/my_events">My Events</Link>
                        {/* <Link className="dropdown-item" to="/changepassword">Change Password</Link> */}
                        <Link onClick={logoutSubmit} className="dropdown-item logout user-logout" to="#">Log Out</Link>
                    </div>
                </div>
            </ul>
        )
    }

    const fetchcategory = async () => {
        let result = await fetch(baseUrl + '/api/category_list');
        result = await result.json();
        setData(result);
    }

    const fetchsettings = async () => {
        let result = await fetch(baseUrl + "/api/settings");
        result = await result.json();
        setData1(result);
    }

    useEffect(() => {
        fetchcategory();
        fetchsettings();
    }, []);
    return (
        <div>
            {isSuccessfullySubmitted &&
                <div className="message">{isSuccessfullySubmitted}</div>
            }
            <header id="header">
                <div className="top-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                {
                                    data1.map((item, i) =>
                                        <ul className="top-left" key={i}>
                                            <li><i className="fa fa-phone"></i> {item.phone}</li>
                                            <li><i className="fa fa-envelope"></i> {item.email}</li>
                                        </ul>
                                    )
                                }
                            </div>
                            <div className="col-6">
                                {AuthButtons}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            {
                                data1.map((item, i) =>
                                    <Link className="navbar-brand" to='/' key={i}>
                                {item.site_logo ? (
                                    <img
                                        src={baseUrl + '/public/site/' + item.site_logo}
                                        alt=""
                                        style={{
                                            width: '100px',        // Adjust width to control the size
                                            height: '100px',       // Adjust height to match width
                                            borderRadius: '50%',  // Makes the image round
                                            objectFit: 'cover'    // Ensures the image covers the area without distortion
                                        }}
                                    />
                                ) : (
                                    <h4>{item.site_name}</h4>
                                )}
                            </Link>
                            
                                )
                            }
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav ms-auto me-0">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to='/'>Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/all_events">Events</NavLink>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Category
                                        </Link>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown" >
                                            {
                                                data.map((item, i) =>
                                                    <Link className="dropdown-item" to={"/events/" + item.id} key={i}>{item.name}</Link>
                                                )
                                            }
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                                    </li>
                                    <li className="nav-item dropdown">
                                        {userButtons}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header
