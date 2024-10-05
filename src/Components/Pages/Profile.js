import React, { useContext, useState } from 'react';  
import cover from '../../Assests/cover.jpg';  
import profile from '../../Assests/avatars/boy3.png';  
import { Link } from 'react-router-dom';  
import { UserContext } from '../../Context/UserContext';
import ProfileNotAvaliable from '../Pages/ProfileNotAvaliable'  
import Mypost from './Mypost';
import Likedpost from './Likedpost'
const Profile = () => {  
   const { data } = useContext(UserContext);  
   const [feed ,setFeed] = useState("post")
   console.log(feed)

   const followinglength = data?.following?.length || 0;  
   const followerlength = data?.followers?.length || 0;  

   return (  
        <div className="container-fluid">  
        {  
          data.fullname !== undefined ? (  
              <div className="row">  
                 
                <div className="row ">  
                  <img src={data.coverImg  || cover } alt="User cover" width="100%" height="150px" />  
                  <div className="col-6 ">  
                    <img src={ data.profileImg ||  profile} alt="User profile" className='ms-3' width="100px" height="100px" style={{ borderRadius: "60%" }} />  
                  </div>  
                  <div className="col-6 d-flex justify-content-end align-item-end mt-3">  
                   <Link to='/update'> <button className='btn btn-dark h-50'>Edit</button>  </Link>
                  </div>  
                </div>  
                <div className="row ms-2 mt-1">  
                  <h4>{data.fullname}</h4>  
                  <p style={{fontSize: "11px"}}>@{data.username} post</p>  
                  <p>{data.bio || `Hi this is me ${data.fullname} using this app`}</p>  
                  <a  style={{fontSize: "13px"}}
                  href={data.link}>{data.link}  </a>
                  <p className='text-dark mt-1'>  
                           <span className='text-light'> {followinglength} </span>
                           <span className='text-light text-decoration-none' >Following</span>
                          <span className='ps-3 text-light'>  {followerlength} Followers</span>  
                        </p>   
                </div>  
                <div className="row">  
                  <div className="col-6">  
                    <h6 className='text-light d-flex justify-content-center align-items-center mt-2 ' onClick={()=>setFeed("post")}> 
                     {feed ==='post' ? (<h6 className='text-info'>Post</h6>):(<h6 className=''>Post</h6>) } </h6>  
                  </div>  
                  <div className='col-6'>  
                    <h6 className='text-light d-flex justify-content-center align-items-center mt-2' onClick={()=>setFeed("likes")}  >
                    {feed ==='likes' ? (<h6 className='text-info'>Likes</h6>):(<h6 className=''>Likes</h6>) }                    </h6>  
                  </div>  
                  <hr className='text-light' />  

                 {
                    feed === "post" ? (<Mypost username={data.username} />):
                    (<Likedpost id={data._id} />)
                  }

                </div>            

              </div>  
                 
          ):(
            <ProfileNotAvaliable />
          )} 
         
      </div>  
  );   
};  

export default Profile;