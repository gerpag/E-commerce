import React, { useEffect, useState } from "react";
import axios from "axios";




function AdminView(){
    const [users,setUsers]=useState([]);
    const [userId,setUserId]=useState();

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/admin/users")
        .then((res)=>setUsers(res.data))
        .catch((error)=>{console.log(error)})
    },[])

    useEffect(()=>{
        axios.delete(`http://localhost:3000/api/v1/admin/users/${userId}`)
        .then((res)=>res.status(202))
        .catch((error)=>{console.log(error)})

    },[userId])


    return(
        <>
        <ul>
            {users.map(user=>{
                return(
                    <div key={user.id}>
                        <li >
                    {`${user.firstname} ${user.lastname}`}
                    <button onClick={()=>setUserId(user.id)}>🗑️</button>
                </li>

                    </div>)
                
            })}
        </ul>
        </>
    )
}

export default AdminView;