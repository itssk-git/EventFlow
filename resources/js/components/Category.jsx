import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../layouts/App';

function Category(props) {
    const [data, setData] = useState([]);

    const fetchcategory = async () => {
        let result = await fetch(baseUrl + '/api/category_list');
        result = await result.json();
        setData(result);
    }

    useEffect(() => {
        fetchcategory();
    }, []);
    return (
        <div id="categpry-section" className="pb-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-head mb-4 d-flex justify-content-between ">
                            <h3 className="align-self-center">Events by Categories</h3>
                            <Link to={"/all_category"}>See All Categories</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        data.length > 0 ?
                        data.map((item, i) =>
                            <div className="col-lg-4" key={i}>
                                <Link to={"/events/"+item.id} className="category-grid">
                                    <img src={baseUrl + '/public/category/'+item.cat_img} alt="" />
                                    <div className="category-info">
                                        <h4>{item.name}</h4>
                                    </div>
                                </Link>
                            </div>
                        ) : <span className="text-center">No Record Found</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Category
