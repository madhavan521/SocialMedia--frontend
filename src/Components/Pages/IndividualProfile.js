import React, { useEffect, useState } from 'react';  
import cover from '../../Assests/cover.jpg';  
import { Link, useParams } from 'react-router-dom';  
import img1 from '../../Assests/avatars/boy1.png'
import img2 from '../../Assests/avatars/boy2.png'
import img3 from '../../Assests/avatars/boy3.png'



  


const IndividualProfile = () => {  
    const [data, setData] = useState([]);  
    const { username } = useParams();  
    console.log(username)
      const image =[img1,img2,img3]
    const num = Math.floor(Math.random()*3)
    console.log(num)

    useEffect(() => {  
        fetch(`https://socialmedia-backend-wlia.onrender.com/api/user/profile/${username}`, {  
            method: "GET",  
            headers: {  
                "Content-Type": "application/json"  
            } ,
            credentials:"include"

        })  
        .then(res =>  res.json()  )  
    .then(result => {  
            setData(result); 
            console.log(data) 
        })  
        .catch(error => {  
            console.error('Error fetching data:', error);  
            setData(null); 
        });  
    }, []);  

    // const handleFollow = async (id) => {  
    //     try {  
    //         const response = await fetch(`https://socialmedia-backend-wlia.onrender.com/api/user/follow/${id}`, {  
    //             method: "POST",  
    //             headers: {  
    //                 "Content-Type": "application/json",  
    //             },  
    //             credentials: "include",  
    //         });  
    //         const result = await response.json();  
    //         console.log(result);  
    //         console.log("Followed Successfully");  
    //     } catch (err) {  
    //         console.error(err);  
    //     }  
    // };  
    const followinglength = data?.following?.length || 0;  
    const followerlength = data?.followers?.length || 0;  

    return (  
        <div className="container-fluid">  
          
                <div className="row">  
                   
                    <div className="row ">  
                        <img src={cover} alt="User cover" width="100%" height="150px" />  
                        <div className="col-6 ">  
                            <img src={image[num]} alt="User profile" className='ms-3' width="100px" height="100px" style={{ borderRadius: "60%" }} />  
                        </div>  
                        {/* <div className="col-6 d-flex justify-content-end align-item-end mt-3">  
                            <button className='btn btn-info h-50'>Follow</button>  
                        </div>   */}
                    </div>  
                    <div className="row ms-2 mt-1"> 
                    <h4>{data.fullname}</h4>
                        <p style={{ fontSize: "11px" }}>@{data.username}</p>  
                        <p>{data.description || `Hi, this is me ${data.fullname} using this app`}</p>  
                        <Link to={data.link} style={{ fontSize: "13px" }}>{data.link}</Link>  
                        <p className='text-dark mt-1'>  
                           <span className='text-light'> {followinglength} </span>
                           <Link to='/following'  className='text-light text-decoration-none'>Following</Link>   
                          <span className='ps-3 text-light'>  {followerlength} Followers</span>  
                        </p>  
                    </div>  
                    <div className="row">  
                        <div className="col">  
                            <h6 className='text-light d-flex justify-content-center align-items-center mt-2' >Post</h6>  
                        </div>  
                        
                        <hr className='text-light' />  
                    </div>  
                </div>    
        </div>  
    );  
};  

export default IndividualProfile;