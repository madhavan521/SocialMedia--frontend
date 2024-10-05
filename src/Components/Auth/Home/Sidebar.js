import React, { useContext, useState } from 'react';  
import icon from '../../Assests/logo.png';   
import { IoMdHome } from "react-icons/io";  
import { Link, useNavigate } from 'react-router-dom';  
import { IoIosNotifications } from "react-icons/io";  
import { CgProfile } from "react-icons/cg";  
import { IoIosLogOut } from "react-icons/io";  
import { MdCancel } from "react-icons/md";  
import { IoMenu } from "react-icons/io5";  
import { UserContext } from '../../Context/UserContext';  

const Sidebar = () => {  
  const [isVisible, setIsVisible] = useState("visible");  
 const navigate = useNavigate()
  const handleToggleVisibility = () => {  
    setIsVisible("hidden");  
  };  

  const handleToggle = () => {  
    setIsVisible("visible");   
  };  

  const { data } = useContext(UserContext);   

  const handleLogout = async () => {  
    try {  
      await fetch("https://socialmedia-backend-wlia.onrender.com/api/auth/logout", {  
        method: "POST",  
        headers: {  
          "Content-Type": "application/json"  
        },  
        credentials: "include"  
      })  
      .then(res => {
        console.log("Successfully logged out");
        window.location.reload() 
        navigate('/') 
      });  

    } catch (err) {  
      console.error(err);  
    }  
  };  



  return (  
    <>  
      {isVisible === "visible" ? (  
        <div className='sidebar '>
                 <IoMenu className='text-light' style={{ width: "35px", height: "35px" }} onClick={handleToggle}/> 
 </div>
      ) : (   
        <div >  
          <div>  
            <ul>  
              <li className='ms-5'>  
                <div className="row">  
                  <div className="col-6 d-flex justify-content-center align-items-center">        
                    <img src={icon} alt="Logo" width="50" height="50" />  
                  </div>  
                  <div className="col-6 d-flex justify-content-end align-items-center">  
                      <MdCancel onClick={handleToggleVisibility} aria-label="Close Sidebar" className='text-light' style={{ width: '25px', height: '25px' }} />  
                  </div>  
                </div>  
              </li>  

              <li className='d-inline d-flex align-items-start mt-3'>  
                <Link to='/' className='text-light text-decoration-none d-flex align-items-start'>  
                  <IoMdHome className='text-light' style={{ width: '32px', height: '32px' }} />  
                  <h5 className='text-light ms-2 mb-0'>Home</h5>  
                </Link>  
              </li>  

              <li className='d-inline d-flex align-items-start mt-3'>  
                <Link to='/notification' className='text-light text-decoration-none d-flex align-items-start'>  
                  <IoIosNotifications className='text-light' style={{ width: '32px', height: '32px' }} />  
                  <h5 className='text-light ms-2 mb-0'>Notification</h5>  
                </Link>  
              </li>  

              <li className='d-inline d-flex align-items-start mt-3'>  
                <Link to='/profile' className='text-light text-decoration-none d-flex align-items-start'>  
                  <CgProfile className='text-light' style={{ width: '32px', height: '32px' }} />  
                  <h5 className='text-light ms-2 mb-0'>Profile</h5>  
                </Link>  
              </li>  
            </ul>  
          </div>  

 
          <div className="fixed-bottom">  
              <li className='d-inline d-flex align-items-start mt-3 ms-5'>  
                <IoIosLogOut className='text-light' style={{ width: '32px', height: '32px' }} />  
                <h5 className='text-light ms-2 mb-0'>  
              {data.fullname === undefined ? (  
      <Link to='/signup'> <button className='btn btn-dark'>Signup</button></Link>  ) :
       ( <button onClick={handleLogout} className='btn btn-dark'> Logout</button>  
      )}
                </h5>  
              </li>  
             
             
          </div>  
        </div>  
      )}  
    </>  
  );  
};  

export default Sidebar;