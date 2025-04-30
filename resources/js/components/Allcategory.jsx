import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
import ReactPaginate from 'react-paginate';
import { baseUrl } from '../layouts/App';

const Allevents = () => {
    const [data, setData] = useState([]);
    const date = new Date();
    const showTime = date.getTime();
    const [loading, setLoading] = useState(true);

    const fetchallcategory = async () => {
        let result = await fetch(baseUrl + "/api/all_category", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        console.log(result);
        result = await result.json();
        setLoading(false);
        setData(result);
    }

    const itemsPerPage = 9;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        fetchallcategory();
    }, [data])

    return (
        <div>
            <div id="main-content">
                <div className="section-head single mb-5 border py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <h3 className="align-self-center">All Category</h3>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                        <li className="breadcrumb-item active">All Category</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="categpry-section">
                    <div className="container">
                        {loading && <Spinner />}
                        <div className="row">
                            {
                                data.slice(itemOffset, endOffset).map((item, i) =>
                                    <div className="col-lg-4" key={i}>
                                        <Link to={"/events/" + item.id} className="category-grid">
                                            <img src={baseUrl + '/public/category/' + item.cat_img} alt="" />
                                            <div className="category-info">
                                                <h4>{item.name}</h4>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={Math.ceil(data.length / itemsPerPage)}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            className='pagination'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Allevents
