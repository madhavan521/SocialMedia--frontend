import React, { useContext, useState } from 'react';
import {UserContext} from '../../Context/UserContext'
import{ toast ,Toaster }from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
  
const AddPost = () => {
    const {data}=useContext(UserContext)
    console.log(data)
    const naviagte =useNavigate()


    const[text,setText]=useState()

const handlePost = async()=>{

const postdata ={
    text
}
    try{
        await fetch("https://socialmedia-backend-wlia.onrender.com/api/posts/create",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            credentials:"include",
            body:JSON.stringify(postdata)  }, )
            .then(res=>res.json())
            .then(result=>{
                console.log(result)
                toast.success("Post was Successfully posted")
                setText('')
                setTimeout(() => {
                  naviagte('/')
                }, 1000);
                
            })

    }
    catch(err){
        console.error(err)
    }
     





}



  return (
 <div className="container ms- mt-3 ">
 <div className="row ms-2" >
 <div className="col ">
      <Toaster position="top-center" reverseOrder={false} />  

   <h5>Post here</h5>


      <div className="row">
        <textarea className='bg-dark text-light ' style={{height:"150px"}} placeholder='Post' value={text} 
         onChange={(e)=>setText(e.target.value)} />  
         <div className='d-flex align-item-end justify-content-end'>
        <button className='btn btn-info mt-2 w-25 ' onClick={handlePost}>Post</button>  
        </div>
      </div>
    </div></div></div>
  );
}

export default AddPost;
