import React, {  useEffect, useState } from 'react';  
import profile from '../../Assests/avatar.png';  
import { CiHeart } from "react-icons/ci";  
import { toast, Toaster } from 'react-hot-toast';  
import { MdOutlineDelete } from "react-icons/md";  
import img1 from '../../Assests/avatars/boy1.png'
import img2 from '../../Assests/avatars/boy2.png'
import img3 from '../../Assests/avatars/boy3.png'

const Mypost = ({ username }) => {  
    const [items, setItems] = useState([]);  
    const image =[img1,img2,img3]
    const num = Math.floor(Math.random()*3)
    console.log(num)

    useEffect(() => {  
        const fetchPosts = async () => {  
            try {  
                const response = await fetch(`https://socialmedia-backend-wlia.onrender.com/api/posts/user/${username}`, {  
                    method: "GET",  
                    headers: {  
                        "Content-Type": "application/json"  
                    },  
                    credentials: "include"  
                });  
                const result = await response.json();  
                setItems(result);  
            } catch (err) {  
                console.error(err);  
                toast.error('Failed to load posts!');  
            }  
        };  
        
        fetchPosts();  
    }, [username]);  
    
    const handleDelete = async (id) => {  
        console.log(id)
        try {  
            await fetch(`https://socialmedia-backend-wlia.onrender.com/api/posts/delete/${id}`, {  
                method: "DELETE",  
                headers: {  
                    "Content-Type": "application/json"  
                },  
                credentials: "include"  
            })   
            .then(res => {  
                toast.success("Post deleted successfully");  
                setTimeout(() => {  
                    window.location.reload();  
                }, 1000);  
            });  
        } catch (err) {  
            console.error(err.message);  
            toast.error("Invalid")
        }  
    }  

    return (  
        <div className='container'>  
            <Toaster position="top-center" reverseOrder={false} />  
            {items.map(item => (  
                <div className='row' key={item._id}>  
                    <div className='d-flex align-items-center'>  
                        <img src={image[num]} alt="Profile" className='mt-1' width="38" height="38" style={{ borderRadius: "20px" }} />  
                        <div className='ms-2'>  
                            <li className='h5 mb-0'>{item.user.fullname}</li>  
                            <span style={{ fontSize: "12px" }}>{item.user.username}</span>  
                        </div>  
                    </div>  
                    <div className='row card bg-dark my-2 ms-2 '>  
                        <p className='text-light my-3'>{item.text}</p>  
                    </div>  
                    <div className='row my-1'>  
                    
                        <div className="col-6 d-flex justify-content-center align-items-center">  
                            <CiHeart className='likeicon' style={{ width: "20px", height: "20px" }} />  
                        </div>  
                        <div className="col-6 d-flex justify-content-center align-items-center">  
                            <MdOutlineDelete onClick={() => handleDelete(item._id)} style={{ width: "20px", height: "20px" }} />  
                        </div>  
                    </div>  
                    <hr />  
                </div>  
            ))}  
        </div>  
    );  
}  

export default Mypost;
