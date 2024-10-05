import React, { useEffect, useState } from 'react';  
// import Slider from 'react-slick';  
import "slick-carousel/slick/slick.css";   
import "slick-carousel/slick/slick-theme.css";  
import { Link } from 'react-router-dom';
import img1 from '../../Assests/avatars/boy1.png'
import img2 from '../../Assests/avatars/boy2.png'
import img3 from '../../Assests/avatars/boy3.png'
import toast, { Toaster } from 'react-hot-toast';

const Suggest = () => {  
    const [data, setData] = useState([]);   

    const image =[img1,img2,img3]
    const num = Math.floor(Math.random()*3)
    console.log(num)

    useEffect(() => {  
        fetch("https://socialmedia-backend-wlia.onrender.com/api/user/suggest", {  
            method: "GET",  
            headers: {  
                "Content-Type": "application/json",  
            },  
            credentials: 'include',  
        })  
        .then(res => res.json())  
        .then(result => {  
            console.log(result);  
            setData(result);  
        });  
    }, []);  

    const handleFollowing = async (id) => {  
        try {  
            const response = await fetch(`https://socialmedia-backend-wlia.onrender.com/api/user/follow/${id}`, {  
                method: "POST",  
                headers: {  
                    "Content-Type": "application/json",  
                },  
                credentials: "include",  
            });  
            const result = await response.json();  
            console.log(result);  
            console.log("Followed Successfully"); 
            toast.success("Followed Successfully") 
           
        } catch (err) {  
            console.error(err);  
        }  
    };  

    return (  
        <div className='container'  >   
            <div className="row  "> 
            <Toaster position='top-center' reverseOrder={true} />
            <h3 className='text-center'>Suggestion For You</h3> 
            <hr />
                    {/* <Slider {...settings}>   */}
                        {data.map((item) => (      
                            
                                    <div className="col-lg-3 col-sm-12 col-md-4 mt-3">
                            <div key={item._id} className='d-flex justify-content-center '>   
    <div className='bg-dark card text-center'  style={{width:"300px"}}>   
             <div className="d-flex justify-content-center align-item-center">
              <img src={image[num] }   
            className='card-image mb-1 '  
            width="50px"   
            height="50px"  
            style={{ borderRadius: "50%" }} 
            alt=''
        />  </div>
        <p className='text-light'>{item.fullname}</p>  
        <Link to={`/${item.username}`} className='text-light'>@{item.username}</Link>  
        <button   
            onClick={() => handleFollowing(item._id)}   
            className='btn btn-info mb-2' style={{height:"30px",marginBottom:"11px"}}>   
            Follow  
        </button>  
    </div>   </div> 
</div>
                        ))}  
                   </div> {/* </Slider>    */}
            
        </div>  
    );  
};  

export default Suggest;