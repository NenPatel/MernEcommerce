import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../components/layout/Layout'

const Search = () => {
    const {keyword,results} = useSelector(state => state.searchData)
  return (
    <Layout>
    <div className='container'>
        <div className='text-center'>
            <h4>Search Result</h4>
            <p>{results.length < 1 ? "No Product Found" : `Found ${results.length} items`}</p>
        </div>
        <div className='d-flex flex-wrap'>
            {results.map((p) => (
                <div className="card m-2" key={p._id} style={{width: "18rem"}} >
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" height="250" alt={p.name} />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0,30)}...</p>
                        <p className="card-text">${p.price}</p>
                        <button className='btn btn-primary ms-1'>More Details</button>
                        <button className='btn btn-secondary ms-1'>Add to Cart</button>
                      </div>
                </div>
                ))}
            </div>
    </div>    
    </Layout>
    
  )
}

export default Search