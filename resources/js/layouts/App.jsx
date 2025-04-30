import React, { useState, useEffect, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import{ BrowserRouter  as Router, Routes, Route } from 'react-router-dom';
import Footer from '../components/Footer'
import Header from '../components/Header'
import Home from '../components/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Allevents from '../components/Allevents'
import Contactus from '../components/Contactus'
import Eventdetails from '../components/Eventdetails'
import Events from '../components/Events'
import Myprofile from '../components/Myprofile'
import Myevents from '../components/Myevents'
import Changepassword from '../components/Changepassword'
import Success from '../components/Success'
import Viewevent from '../components/Viewevent'
import Booking from '../components/Booking'
import Allcategory from '../components/Allcategory'
import Forgotpassword from '../components/Forgotpassword';
import Resetpassword from '../components/Resetpassword';
import Allupcomingevents from '../components/Allupcomingevents';
import ScrollToTop from "../components/ScrollToTop";

export const baseUrl = import.meta.env.VITE_APP_URL;
const base = window.location.pathname;
const basename = base.replace('/','');


function App(){
    const [home, setHome] = useState('');

    const fetchhome = async () => {
        const url = new URL(baseUrl);
        const path = url.pathname.match(window.location.pathname);
        setHome(path);
    }
    useEffect(() => {
        fetchhome();
    }, [home]);
    return(
        <div>
            <Router basename={basename}>
                <Header />
                <ScrollToTop>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path="/all_events" element={<Allevents />} />
                    <Route exact path="/all_upcomingevents" element={<Allupcomingevents />} />
                    <Route exact path="/all_category" element={<Allcategory />} />
                    <Route exact path="/contact" element={<Contactus />} />
                    <Route exact path="/eventdetails/:event_id" element={<Eventdetails />} />
                    <Route exact path="/events/:id" element={<Events />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/signup" element={<Signup />} />
                        <Route exact path="/my_profile" element={<Myprofile />} />
                        <Route exact path="/my_events" element={<Myevents />} />
                        <Route exact path="/changepassword" element={<Changepassword />} />
                    <Route exact path="/success" element={<Success />} />
                    <Route exact path="/view_event/:id" element={<Viewevent />} />
                    <Route exact path="/booking/:id" element={<Booking />} />
                    <Route exact path="/forgotpassword" element={<Forgotpassword />} />
                    <Route exact path="/resetpassword" element={<Resetpassword />} />
                </Routes>
                </ScrollToTop>
                <Footer />
            </Router>
        </div>
    );
}

if(document.getElementById('app')){
    createRoot(document.getElementById('app')).render(<App />)
}

