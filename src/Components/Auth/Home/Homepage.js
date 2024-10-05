import React ,{useState} from 'react';
import AddPost from '../Pages/AddPost';
import { Link } from 'react-router-dom';
import ForYou from '../Pages/ForYou';
import Following from '../Pages/Following'
import { MdAddBox } from "react-icons/md";

const Homepage = () => {
  const [menu ,setMenu] =useState("forme")

  const handleMenuFor =()=>{
   setMenu("forme")
  }
  const handleMenuFollowing =()=>{
   setMenu("following")
  }

  return (
    <div> 
    <div className="container-fluid">   
   <div className="row">
       <div className="col-6">
       <h6 className='text-light  d-flex justify-content-center align-item-center mt-2'
        onClick={handleMenuFor} >Posts</h6>
       </div>
       <div className='col-6'>
       <h6 className='text-light d-flex justify-content-center align-item-center mt-2'  
       onClick={handleMenuFollowing} >Suggestion</h6>
  </div> <hr className='text-light' />
  <div  className='fixed-bottom d-flex justify-content-end align-item-end mb-5'>
 <Link to='/post'><MdAddBox  className='text-info' style={{width:"75px", height:"75px"}}/></Link> 
  </div>

  </div>
     {
      menu === "following" ? (<Following />) : (<ForYou />)
     }







</div>

   
  
    </div>
  );
}

export default Homepage;
