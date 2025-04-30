import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'; 

const binarySearch = (arr, keyword) => {
    let left = 0;
    let right = arr.length - 1;
    const keywordLower = keyword.toLowerCase(); 
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const eventName = arr[mid].name.toLowerCase(); 

        if (eventName === keywordLower) {
            return arr[mid]; 
        }

        if (eventName < keywordLower) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return null; 
};

const Eventsearch = () => {
    const [nameInput, setName] = useState({
        keyword: '',
    });
    const [events, setEvents] = useState([]); 
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const handleInput = (e) => {
        e.persist();
        setName({ ...nameInput, [e.target.name]: e.target.value });
    };

    const searchFrom = (e) => {
        e.preventDefault();
        const keyword = nameInput.keyword.trim();

        if (keyword) {
            const sortedEvents = [...events].sort((a, b) => a.name.localeCompare(b.name));

            const event = binarySearch(sortedEvents, keyword);
            if (event) {
                navigate(`/event/${event.id}`);
            } else {
                navigate(`/all_events?keyword=${keyword}`);
            }
        }
    };

    useEffect(() => {
        // Fetch real event data from your API
        axios.get('/api/events') // Replace with your actual API endpoint
            .then(response => {
                setEvents(response.data); // Assuming the data is in response.data
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                // Handle error if needed (e.g., display an error message)
            });
    }, []);

    return (
        <div>
            <div id="search-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <form>
                                <h3>Search Your Event</h3>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="keyword"
                                        value={nameInput.keyword}
                                        onChange={handleInput}
                                        placeholder="Search"
                                    />
                                    <button onClick={searchFrom} className="btn light flex-shrink-1" type="submit">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Eventsearch;
