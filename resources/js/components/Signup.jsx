import React, { useState } from 'react'
import $ from 'jquery'
import { useNavigate, Link } from 'react-router-dom'
import { baseUrl } from '../layouts/App';

const Signup = () => {
    const [signupInput, setSignup] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        code: '',
        country: '',
        password: '',
        errors: [] 
    });

    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(null);
    const navigate = useNavigate();
    if (localStorage.getItem('token')) {
        navigate('/');
    }

    const handleInput = (e) => {
        e.persist();
        setSignup({ ...signupInput, [e.target.name]: e.target.value })
    }

    // Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone Number Validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;

    const validateForm = () => {
        let errors = [];

        // Validate email
        if (!emailRegex.test(signupInput.email)) {
            errors.email = "Please enter a valid email address";
        }

        // Validate phone number (must be 10 digits)
        if (!phoneRegex.test(signupInput.phone)) {
            errors.phone = "Phone number must be 10 digits";
        }

        // Validate other fields if needed
        if (signupInput.name.trim() === '') {
            errors.name = "Name is required";
        }

        // Continue similar validations for other fields (e.g., city, state, etc.)

        return errors;
    }

    async function signupform() {
        const errors = validateForm();
        
        if (Object.keys(errors).length > 0) {
            setSignup({ ...signupInput, errors });
            return;  // Stop form submission if validation fails
        }

        let item = {
            name: signupInput.name,
            email: signupInput.email,
            phone: signupInput.phone,
            city: signupInput.city,
            state: signupInput.state,
            code: signupInput.code,
            country: signupInput.country,
            password: signupInput.password
        };

        let result = await fetch(baseUrl + "/api/signup", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
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
            messageShow(setIsSuccessfullySubmitted(<div className='alert alert-success'>Signup successfully</div>));
            setTimeout(function () { navigate('/login'); }, 1000);
        } else if (result.status == 0) {
            messageShow(setIsSuccessfullySubmitted(<div className='alert alert-danger'>{result.message}</div>));
        } else {
            setSignup({ ...signupInput, errors: result.errors })
        }
    }

    return (
        <div>
            <div id="main-content">
                <div className="section-head single mb-5 border py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <h3 className="align-self-center">Signup</h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                        <li className="breadcrumb-item active">Signup</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="form-container text-center border p-5 pb-2">
                                <h4>Signup</h4>
                                <div className="text-start signup-form">
                                    <div className="form-group mb-3">
                                        <input type="text" name="name" value={signupInput.name} onChange={handleInput} className="form-control" placeholder="Name" required />
                                        <span className='text-danger'>{signupInput.errors.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="email" name="email" value={signupInput.email} onChange={handleInput} className="form-control" placeholder="Email" required />
                                        <span className='text-danger'>{signupInput.errors.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="number" name="phone" value={signupInput.phone} onChange={handleInput} className="form-control" placeholder="Phone" required />
                                        <span className='text-danger'>{signupInput.errors.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="text" name="city" value={signupInput.city} onChange={handleInput} className="form-control" placeholder="City" required />
                                        <span className='text-danger'>{signupInput.errors.city}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="text" name="state" value={signupInput.state} onChange={handleInput} className="form-control" placeholder="State" required />
                                        <span className='text-danger'>{signupInput.errors.state}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="number" name="code" value={signupInput.code} onChange={handleInput} className="form-control" placeholder="Pin Code" required />
                                        <span className='text-danger'>{signupInput.errors.code}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="text" name="country" value={signupInput.country} onChange={handleInput} className="form-control" placeholder="Country" required />
                                        <span className='text-danger'>{signupInput.errors.country}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="password" name="password" value={signupInput.password} onChange={handleInput} className="form-control" placeholder="Password" required />
                                        <span className='text-danger'>{signupInput.errors.password}</span>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between mb-3">
                                        <button type="submit" onClick={signupform} className="btn dark">Signup</button>
                                        <Link to={"/login"} className="btn light">Login</Link>
                                    </div>
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

export default Signup;
