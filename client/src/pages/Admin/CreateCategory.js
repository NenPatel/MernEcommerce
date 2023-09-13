import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast'
import axios from "axios"
import CategoryForm from '../../components/form/CategoryForm'
import {Modal} from "antd"
import { useSelector } from 'react-redux'

const CreateCategory = () => {
  const [categories,setCategories] = useState([])
  const [name,setName] = useState("")
  const [visible,setVisible] = useState(false)
  const [selected,setSelected] = useState(null)
  const [updatedName,setUpdatedName] = useState("")
  const {user,token} = useSelector(state => state.userData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,
      {
        name
      },
      {
        headers: {  //  header section which contains authorization having token is used when 
          Authorization: token  //middleware requireSignIn is used in backend for controller
        }
      })
      if(data?.success){
        toast.success(`${name} is created`);
        getAllCategory()
      }
      else{
        toast.error(data.message)
      }
    } catch(error) {
      console.log(error);
      toast.error("Something went wrong in input form")
    }
  }

  const getAllCategory = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if(data?.success){
        setCategories(data?.category)
      }
    } catch(error) {
      console.log(error);
      toast.error("Something went Wrong")
    }
  }

  useEffect(() => {
    getAllCategory()
  },[])

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
      {
        name:updatedName
      },
      {
        headers: {
          Authorization: token
        }
      })
      if(data?.success){
        toast.success(`${updatedName} is Updated`);
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategory()
      }
      else{
        toast.error(data.message)
      }
    } catch(error) {
      console.log(error);
      toast.error("Something went wrong in input form")
    }
  }

  const handleDelete = async (id) => {
    try {
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`,
      {
        headers: {
          Authorization: token
        }
      })
      if(data?.success){
        toast.success("Category is Deleted");
        getAllCategory()
      }
      else{
        toast.error(data.message)
      }
    } catch(error) {
      console.log(error);
      toast.error("Something went wrong in input form")
    }
  }


  return (
    <Layout title="Create Category">
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1>Manage Category</h1>
          <div className='p-3 w-50'>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>
          <div className='w-75'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((c) => {
                return (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>
                    <button className='btn btn-primary ms-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c)  }}>Edit</button>
                    <button className='btn btn-danger ms-2' onClick={() => handleDelete(c._id)}>Delete</button>
                  </td>
                </tr>
                )
              })}
            </tbody>  
          </table>
          </div>
          <Modal  onCancel={() => setVisible(false)} open={visible} footer={null}>
           <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
          </Modal>
        </div>
    </div>    
  </div>
</Layout>
  )
}

export default CreateCategory