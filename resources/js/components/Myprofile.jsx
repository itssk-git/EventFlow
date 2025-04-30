import React, { useState, useEffect } from 'react'
import { baseUrl } from '../layouts/App';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Myprofile = () => {
    const [profileInput, setProfile] = useState({});
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(null);
    const navigate = useNavigate();
    if (!localStorage.getItem('token')) {
        navigate('/login');
    }

    let bearer = 'Bearer ' + localStorage.getItem('token')

    const fetchgetUser = async () => {
        let result = await fetch(baseUrl + "/api/user", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': bearer,
            },
        });
        result = await result.json();
        setProfile({
            name: result.data.name,
            email: result.data.email,
            phone: result.data.phone,
            city: result.data.city,
            state: result.data.state,
            code: result.data.pin_code,
            country: result.data.country,
        });
    }

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setProfile(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        fetchgetUser();
    }, [])

    const profileUpdate = async () => {
        let item = {
            name: profileInput.name,
            email: profileInput.email,
            phone: profileInput.phone,
            city: profileInput.city,
            state: profileInput.state,
            code: profileInput.code,
            country: profileInput.country,
        };

        let result = await fetch(baseUrl + "/api/myprofile", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': bearer,
            },
            body: JSON.stringify(item)
        });
        result = await result.json();

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
            messageShow(setIsSuccessfullySubmitted(<div className='alert alert-success'>{result.message}</div>))
        } else {
            messageShow(setIsSuccessfullySubmitted(<div className='alert alert-danger'>{result.message}</div>));
        }

    }

    return (
        <div>
            <div id="main-content">
                <div className="section-head single mb-5 border py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <h3 className="align-self-center">My Profile</h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                        <li className="breadcrumb-item active">My Profile</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="form-container text-center border p-5 pb-3">
                                <h4>My Profile</h4>
                                <div className="text-start">
                                    <div className="form-group mb-3">
                                        <input type="text" name="name" value={profileInput.name || ''} onChange={handleInput} className="form-control" placeholder="Name" required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="email" name="email" value={profileInput.email || ''} onChange={handleInput} className="form-control" placeholder="Email" required disabled />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="number" name="phone" value={profileInput.phone || ''} onChange={handleInput} className="form-control" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone" required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="text" name="city" value={profileInput.city || ''} onChange={handleInput} className="form-control" placeholder="City" required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="text" name="state" value={profileInput.state || ''} onChange={handleInput} className="form-control" placeholder="State" required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="number" name="code" value={profileInput.code || ''} onChange={handleInput} className="form-control" placeholder="Pin Code" required />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="text" name="country" value={profileInput.country || ''} onChange={handleInput} className="form-control" placeholder="Country" required />
                                    </div>
                                    <button onClick={profileUpdate} className="btn dark">Update</button>
                                </div>
                            </div>
                            {isSuccessfullySubmitted &&
                                <div className="message">{isSuccessfullySubmitted}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Myprofile



// php example for loop