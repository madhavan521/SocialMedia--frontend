import React from 'react';
import { Link } from 'react-router-dom';

const ProfileNotAvaliable = () => {
  const handleRefresh=()=>{
    window.location.reload()
  }
  return (
    
   
      <div className="row text-center d-flex justify-content-center align-item-center mt-3">
      <h2>Profile page </h2>

      <h6 className='my-3'>To view Profile you need to login </h6>
          
   <Link to='/signup' className='my-3'><button className='btn btn-info'>Signup</button></Link> 
 <h6> Please Refresh if you already login</h6>
 <button className='btn btn-info ' style={{width:"max-content"}} onClick={handleRefresh}>Refresh</button>

    </div>

   
  );
}

export default ProfileNotAvaliable;
