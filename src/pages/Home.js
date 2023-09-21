
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {
    const [users,setUsers] = useState([]);

    const {user_id}=useParams()
    useEffect (() => {
        loadUsers()
    },[]);

    const loadUsers = async()=>{
        const result = await axios.get("http://localhost:8080/api/users/getAllUsers");
        setUsers(result.data);
    };

    const deleteUser=async (user_id)=>{
        await axios.delete(`http://localhost:8080/api/users/deleteByID/${user_id}`);
        loadUsers();
    }

  return (
    <div className='container'>
        <div className='py-4'>
    <table className="table table-dark table-striped">
        <thead>
            <tr>
            <th scope="col">User ID</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            {
                users.map((user,index)=>(
                <tr>
                    <th scope="row" key={index}>{user.user_id}</th>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                    <td>
                        {/* <button className='btn btn-primary mx-2'>View</button> */}
                        <Link className="btn btn-info  mx-2 rounded-5" to={`/viewuser/${user.user_id}`} >View </Link>
                        <Link className='btn btn-success mx-2 rounded-5' to={`/edituser/${user.user_id}`}>Edit</Link>
                        <button className='btn btn-warning mx-2 rounded-5' onClick={()=> deleteUser(user.user_id)}>Delete</button>
                    </td>
                </tr>
                ))
            }
        </tbody>
    </table>
        </div>
    </div>
  )
}
