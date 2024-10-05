import React, { useState ,useEffect} from 'react';
import profile from '../../Assests/avatars/boy1.png'
import toast, { Toaster } from 'react-hot-toast';
import { CiHeart } from 'react-icons/ci';
import { SlUserFollowing } from "react-icons/sl";
import { Link } from 'react-router-dom';
const Notification = () => {

const [notify ,setNotify] =useState([])
useEffect(()=>{
  try{
  fetch("https://socialmedia-backend-wlia.onrender.com/api/notification/",{
    method:"GET",
        headers:{
            "Content-Type": "application/json"
        },
        credentials:"include"
   })
        .then(res=>res.json())
        .then(result=>{
            setNotify(result)
            console.log(notify)
        })

}
catch(err){
    console.error(err)
}
}
)


const handleDelete=()=>{
  try{
    fetch("https://socialmedia-backend-wlia.onrender.com/api/notification/",{
      method:"DELETE",
          headers:{
              "Content-Type": "application/json"
          },
          credentials:"include"
     })
          .then(res=>{
              toast.success("Notifications Deleted Successfully")
              window.location.reload()
          })
  
  }
  catch(err){
      console.error(err)
  }
}


  return (
    <div className="container-fluid">
      <div className="row">
      <Toaster position="top-center" reverseOrder={false} />  
        <h5 className='text-center'>Notification</h5>
        <hr />
      </div>
      <div className='d-flex justify-content-end align-item-end'>
      <button className='btn btn-dark' onClick={handleDelete}> delete</button>
     </div> <div className="row">
        {
          Array.isArray(notify) && notify.map(item=>
          <div key={item._id} className='mt-3' >
        <p className='d-inline'>
         <img src={profile} alt="" style={{width:"30px" ,height:"30px",borderRadius:"30px"}} />
         <span className='h5'> <Link to={`/${item.from.username}`} className='text-decoration-none'>@{item.from.username}  </Link>  </span>
           {item.type ==="follow" ?(<span>is started {item.type}ing <SlUserFollowing className='text-info' style={{width:"25px",height:"25px"}} /> you</span>):(<span>is {item.type}d
             <CiHeart className='text-danger' style={{width:"25px",height:"25px"}}/> your post </span>) }</p> 
 <hr />

          </div>
         
          )
        }
      </div>
    </div>
  );
}

export default Notification;
