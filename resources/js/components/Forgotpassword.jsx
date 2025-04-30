import React, { useState } from 'react'
import $ from 'jquery'
import { useNavigate, Link } from 'react-router-dom'
import { baseUrl } from '../layouts/App';

const Login = () => {
    const [forgotInput, setForgot] = useState({
        email: '',
        errors: [],
    });
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(null);
    const navigate = useNavigate();

    const handleInput = (e) => {
        e.persist();
        setForgot({ ...forgotInput, [e.target.name]: e.target.value })
    }

    async function forgotform() {
        const item = {
            email: forgotInput.email,
        }

        let result = await fetch(baseUrl + "/api/forgotpassword", {
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
            localStorage.setItem("reset_token", result.reset_token);
            messageShow(setIsSuccessfullySubmitted(<div className='alert alert-success'>{result.message}</div>));
        } else {
            setForgot({ ...forgotInput, errors: result.errors })
        }

    }
    return (
        <div>
            <div id="main-content">
                <div className="section-head single mb-5 border py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <h3 className="align-self-center">Forgot Password</h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                        <li className="breadcrumb-item active">Forgot Password</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <div className="form-container text-center border p-5 pb-2">
                                <h4>Forgot Password</h4>
                                <div className="text-start login-form">
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="email" name="email" value={forgotInput.email} onChange={handleInput} className="form-control" placeholder="Email Address" required />
                                        <span className='text-danger'>{forgotInput.errors.email}</span>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between mb-3">
                                        <button onClick={forgotform} className="btn dark w-100">Send Password Reset Link</button>
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

export default Login
