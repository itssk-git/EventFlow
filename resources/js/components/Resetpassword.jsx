import React, { useState } from 'react'
import $ from 'jquery'
import { useNavigate, Link } from 'react-router-dom'
import { baseUrl } from '../layouts/App';

const Login = () => {
    const [forgotInput, setForgot] = useState({
        password: '',
        password_confirmation: '',
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
            password: forgotInput.password,
            password_confirmation: forgotInput.password_confirmation,
            reset_token: localStorage.getItem('reset_token')
        }

        let result = await fetch(baseUrl + "/api/resetpassword", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        console.log(result);

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
            messageShow(setIsSuccessfullySubmitted(<div className='alert alert-success'>{result.message}</div>));
            localStorage.removeItem("reset_token");
            setTimeout(function () { navigate('/user_login'); }, 1000);
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
                                <h3 className="align-self-center">Reset Password</h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                        <li className="breadcrumb-item active">Reset Password</li>
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
                                <h4>Reset Password</h4>
                                <div className="text-start login-form">
                                    <div className="form-group mb-3">
                                        <label>New Password</label>
                                        <input type="password" name="password" value={forgotInput.password} onChange={handleInput} className="form-control" placeholder="New Password" required />
                                        <span className='text-danger'>{forgotInput.errors.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Confirm Password</label>
                                        <input type="password" name="password_confirmation" value={forgotInput.password_confirmation} onChange={handleInput} className="form-control" placeholder="Confirm Password" required />
                                        <span className='text-danger'>{forgotInput.errors.password_confirmation}</span>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between mb-3">
                                        <button onClick={forgotform} className="btn dark w-100">Reset Password</button>
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
