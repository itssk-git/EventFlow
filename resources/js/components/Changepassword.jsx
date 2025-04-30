import React, { useState } from 'react'
import $ from 'jquery'
import { useNavigate, Link } from 'react-router-dom'
import { baseUrl } from '../layouts/App';

const Changepassword = () => {
    const [passInput, setPassword] = useState({
        password: '',
        new_pass: '',
        re_pass: '',
        errors: [],
    });

    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(null);
    const navigate = useNavigate();

    if (!localStorage.getItem('token')) {
        navigate('/login');
    }

    const handleInput = (e) => {
        e.persist();
        setPassword({ ...passInput, [e.target.name]: e.target.value })
    }

    let bearer = 'Bearer ' + localStorage.getItem('token')

    async function changepassword() {
        const item = {
            password: passInput.password,
            new_pass: passInput.new_pass,
            re_pass: passInput.re_pass,
        }

        let result = await fetch(baseUrl + "/api/changepassword", {
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
            setPassword({ ...passInput, password: '', new_pass: '', re_pass: '', errors: [] })

        } else if (result.status == 0) {
            messageShow(setIsSuccessfullySubmitted(<div className='alert alert-danger'>{result.password}</div>));
        } else {
            setPassword({ ...passInput, errors: result.errors })
        }

    }
    return (
        <div>
            <div id="main-content">
                <div className="section-head single mb-5 border py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <h3 className="align-self-center">Change Password</h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                        <li className="breadcrumb-item active">Change Password</li>
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
                                <h4>Change Password</h4>
                                <div className="text-start ">
                                    <div className="form-group mb-3">
                                        <label>Old Password</label>
                                        <input type="password" name="password" value={passInput.password} onChange={handleInput} className="form-control" placeholder="Old Password" required />
                                        <span className='text-danger'>{passInput.errors.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>New Password</label>
                                        <input type="password" name="new_pass" value={passInput.new_pass} onChange={handleInput} className="form-control" id="new-pass" placeholder="New Password" required />
                                        <span className='text-danger'>{passInput.errors.new_pass}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Re-enter New Password</label>
                                        <input type="password" name="re_pass" value={passInput.re_pass} onChange={handleInput} className="form-control" placeholder="Re-enter New Password" required />
                                        <span className='text-danger'>{passInput.errors.re_pass}</span>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between mb-3">
                                        <button onClick={changepassword} className="btn dark">Login</button>
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

export default Changepassword
