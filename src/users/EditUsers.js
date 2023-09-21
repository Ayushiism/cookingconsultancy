import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditUsers() {

    let navigate =  useNavigate()

    const {user_id} = useParams()
    console.log(user_id);

    const [user,setUser] = useState({
        name:"",
        age:"",
        email:""
    })

    const{name,age,email}=user

    const onInputChange=(e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }

    useEffect(()=>{
        loadUser()
    },[])

    // console.log("Ayus");  
    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/api/users/updateByID/${user_id}`,user)
        navigate("/")
    };

    const loadUser = async()=>{
        console.log(user_id);
        const result= await axios.get(`http://localhost:8080/api/users/getByID/${user_id}`)
        setUser(result.data)
    }
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounder p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Edit User</h2>
                <form onSubmit={(e)=>onSubmit(e)}>
                <div className='mb-3'>
                    <label htmlFor='Name' className='form-label'>Name</label>
                    <input type={'text'}
                     className='form-control'
                     placeholder='Enter your Name'
                     name='name'
                     value={name}
                     onChange={(e)=>onInputChange(e)}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='Age' className='form-label'>Age</label>
                    <input type={'number'}
                     className='form-control'
                     placeholder='Enter your Age' 
                     name='age'
                     value={age}
                     onChange={(e)=>onInputChange(e)}
                     />
                </div>
                <div className='mb-3'>
                    <label htmlFor='Email' className='form-label'>Email</label>
                    <input type={'email'}
                     className='form-control'
                     placeholder='Enter your E-mail Address' 
                     name='email'
                     value={email}
                     onChange={(e)=>onInputChange(e)}
                     ></input>
                </div>
                <button type='submit' className='btn btn-outline-success'>Submit</button>
                <Link  className='btn btn-outline-warning mx-2' to="/">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
