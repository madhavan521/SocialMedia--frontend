import React, { useContext, useEffect, useState } from 'react';  
import profile from '../../Assests/avatar.png';  
import { CiHeart, CiBookmark } from "react-icons/ci";  
import { toast, Toaster } from 'react-hot-toast';  
import { UserContext } from '../../Context/UserContext'; 
import { Link } from 'react-router-dom';


const Likedpost = () => {  
    const { data } = useContext(UserContext);     
    const [likedPosts, setLikedPosts] = useState([]);  
     
    useEffect(() => {  
        const fetchLikedPosts = async () => {  
            try {  
              await fetch(`https://socialmedia-backend-wlia.onrender.com/api/posts/likes/${data._id}`, {  
                    method: "GET",  
                    headers: {  
                        "Content-Type": "application/json"  
                    },  
                    credentials: "include"  
                })
                .then(res=>res.json())
                .then(result =>{
                   setLikedPosts(result);  
                   console.log(result)

                })

               
            } catch (err) {  
                console.error(err);  
                toast.error('Failed to load liked posts!');  
            }  
        };  
        
        fetchLikedPosts();  
    }, [data]);  
    return (  
        <div className='container'>  
            <Toaster position="top-center" reverseOrder={false} />  
            {likedPosts.map(item => (  
                <div className='row' key={item._id}>  
                    <div className='d-flex align-items-center'>  
                        <img src={profile} alt="Profile" className='mt-1' width="38" height="38" style={{ borderRadius: "20px" }} />  
                        <div className='ms-2'>  
                            <li className='h5 mb-0'>{item.user.fullname}</li>  
                           
                            <Link to= {`/${item.user.username}`}>                              <span style={{ fontSize: "12px" }}>{item.user.username}</span>  

                            </Link>  
                           
                           
                        </div>  
                    </div>  
                    <div className='row card bg-dark my-2 ms-2'>  
                        <p className='text-light my-3'>{item.text}</p>  
                    </div>  
                    <div className='row my-1'>  
                          
                        <div className="col-6 d-flex justify-content-center align-items-center">  
                                <CiHeart className='likeicon' style={{ width: "20px", height: "20px",color:"red"  }} />  
                        </div> 
                         <div className="col-6 d-flex justify-content-center align-items-center">  
                            <CiBookmark style={{ width: "20px", height: "20px" }} />  
                        </div>
                      
                    </div>  
                    <hr />  
                </div>  
            ))}  
        </div>  
    );  
}  

export default Likedpost;