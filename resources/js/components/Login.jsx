import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { baseUrl } from '../layouts/App';

const Login = () => {
    const navigate = useNavigate();

    // Redirect if already logged in
    if (localStorage.getItem('token')) {
        navigate('/');
    }

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState(null);

    const handleInput = (e) => {
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    };

    const loginform = async () => {
        const credentials = {
            email: loginInput.email,
            password: loginInput.password,
        };

        try {
            let response = await fetch(`${baseUrl}/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            let result = await response.json();

            if (result.status === 1) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("username", result.user.name);
                setMessage({ type: 'success', text: result.message });
                setTimeout(() => navigate('/'), 1000);
            } else if (result.status === 0) {
                setMessage({ type: 'error', text: 'Invalid email or password.' });
            } else {
                setMessage({ type: 'error', text: 'Please check your inputs and try again.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong. Please try again later.' });
        }
    };

    return (
        <div>
            <div id="main-content">
                <div className="section-head single mb-5 border py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <h3 className="align-self-center">LogIn</h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                        <li className="breadcrumb-item active">LogIn</li>
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
                                <h4>Login</h4>
                                <div className="text-start login-form">
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={loginInput.email}
                                            onChange={handleInput}
                                            className="form-control"
                                            placeholder="Email Address"
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={loginInput.password}
                                            onChange={handleInput}
                                            className="form-control"
                                            placeholder="Password"
                                            required
                                        />
                                    </div>
                                    {message && (
                                        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mb-3`}>
                                            {message.text}
                                        </div>
                                    )}
                                    <div className="d-flex flex-row justify-content-between mb-3">
                                        <button onClick={loginform} className="btn dark">Login</button>
                                        <Link to="/signup" className="btn light">Signup</Link>
                                    </div>
                                    {/* <div className="forgot">
                                        <Link to="/forgotpassword">Forgot password?</Link>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
