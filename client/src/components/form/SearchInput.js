import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setData } from '../../redux/slices/SearchSlice'

const SearchInput = () => {
    // const {keyword,results} = useSelector(state => state.searchData)
    const dispatch = useDispatch()
    const [values,setValues] = useState({
        keyword:"",
        results:[]
    })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`)
            setValues({...values,results:data})
            dispatch(setData({keyword:values.keyword,results:data}))
            navigate("/search")
        } catch(error) {
            console.log(error);
        }
    }
  return (
    <div>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e) => setValues({...values, keyword : e.target.value })} />
        <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    </div>
  )
}

export default SearchInput