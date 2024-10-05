import React, { useContext, useEffect, useState } from 'react';  
import { CiHeart, CiBookmark } from "react-icons/ci";  
import { toast, Toaster } from 'react-hot-toast';  
import { Link } from 'react-router-dom';  
import { UserContext } from '../../Context/UserContext';  
import img1 from '../../Assests/avatars/boy1.png'
import img2 from '../../Assests/avatars/boy2.png'
import img3 from '../../Assests/avatars/boy3.png'

const ForYou = () => {  
    const { data } = useContext(UserContext);  
    const [posts, setPosts] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const image =[img1,img2,img3]
    const num = Math.floor(Math.random()*3)
    console.log(num)

    useEffect(() => {  
        const fetchPosts = async () => {  
            setLoading(true);  
            try {  
                const response = await fetch("https://socialmedia-backend-wlia.onrender.com/api/posts/getall", {  
                    method: "GET",  
                    headers: {  
                        "Content-Type": "application/json"  
                    },  
                    credentials: "include"  
                });  
                if (!response.ok) {  
                    throw new Error("Failed to fetch posts");  
                }  
                const result = await response.json();  
                setPosts(result);  
            } catch (err) {  
                console.error(err);  
                toast.error("Error fetching posts");  
            } finally {  
                setLoading(false);  
            }  
        };  
        fetchPosts();  
    }, []);  

    const handleLike = async (id) => {  
        try {  
            const response = await fetch(`https://socialmedia-backend-wlia.onrender.com/api/posts/like/${id}`, {  
                method: "POST",  
                headers: {  
                    "Content-Type": "application/json"  
                },  
                credentials: "include"  
            });  
            if (response.ok) {  
                toast.success("Liked successfully");  
                setPosts((prevPosts) =>   
                    prevPosts.map(post =>   
                        post._id === id ? { ...post, likes: [...post.likes, data._id] } : post  
                    )  
                );  
            }  
        } catch (err) {  
            console.error(err);  
            toast.error("Error while liking the post");  
        }  
    };  

    const handleUnLike = async (id) => {  
        try {  
            const response = await fetch(`https://socialmedia-backend-wlia.onrender.com/api/posts/unlike/${id}`, {  
                method: "POST",  
                headers: {  
                    "Content-Type": "application/json"  
                },  
                credentials: "include"  
            });  
            if (response.ok) {  
                toast.success("Unliked successfully");  
                setPosts((prevPosts) =>   
                    prevPosts.map(post =>   
                        post._id === id ? { ...post, likes: post.likes.filter(uid => uid !== data._id) } : post  
                    )  
                );  
            }  
        } catch (err) {  
            console.error(err);  
            toast.error("Error while unliking the post");  
        }  
    };  

    if (loading) return <p>Loading posts...</p>;  

    return (  
        <div className='container'>  
            <Toaster position="top-center" reverseOrder={false} />  

            {Array.isArray(posts) && posts.map((item) =>  
                <div className='row' key={item._id}>  
                    <div className='d-inline d-flex'>  
                        <img src={image[num]} alt="" className='mt-1' width="38px" height="38px"  
                             style={{ borderRadius: "30px" }} />  
                        <div className='ms-2'>  
                            <li className='h5 mb-0'>{item.user.fullname}</li>  
                            <Link to={`/${item.user.username}`}>  
                                <span style={{ fontSize: "12px" }}>@{item.user.username}</span>  
                            </Link>  
                        </div>  
                    </div>  

                    <div className='row card bg-dark my-2 ms-1'>  
                        <p className='text-light my-3'>{item.text}</p>  
                    </div>  
                    <div className='row my-1'>  
                        <div className="col-6 d-flex justify-content-center align-items-center">  
                            <CiHeart  
                                style={{  
                                    width: "20px",  
                                    height: "20px",  
                                    color: item.likes.includes(data._id) ? "red" : "white"   
                                }}  
                                onClick={() => item.likes.includes(data._id)  
                                    ? handleUnLike(item._id)  
                                    : handleLike(item._id)}  
                                className='likeicon'  
                                aria-label={item.likes.includes(data._id) ? "Unlike" : "Like"}  
                            />  
                        </div>  
                        <div className="col-6 d-flex justify-content-center align-items-center">  
                            <CiBookmark aria-label="Bookmark"/>   
                        </div>   
                    </div>  
                    <hr />  
                </div>  
            )}  
        </div>  
    );  
};  

export default ForYou;