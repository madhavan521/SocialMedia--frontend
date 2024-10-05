import React, { useState } from 'react';  
import logo from './logo.png';  
import { Link, useNavigate } from 'react-router-dom';  
import toast, { Toaster } from 'react-hot-toast';  

const Signup = () => {  
    const [email, setEmail] = useState('');  
    const [username, setUsername] = useState('');  
    const [fullname, setFullname] = useState('');  
    const [password, setPassword] = useState('');  

    const navigate = useNavigate()

    const handleSubmit = async () => {  
        const signupdata = {  
            email,  
            username,  
            password,  
            fullname,  
        };  

        try {  
           await fetch("https://socialmedia-backend-wlia.onrender.com/api/auth/signup", {  
                method: "POST",  
                headers: {  
                    "Content-Type": "application/json",  
                },  
                body: JSON.stringify(signupdata),  
            } )   
            .then(res=>res.json())
           .then(result =>{
              
              console.log(result)
              toast.success("Account created successfully!"); 
              setEmail('')
              setFullname('')
              setPassword('')
              setUsername('')
              setTimeout(() => {
                navigate('/login')
              }, 1000);
            })

        } catch (err) {  
            console.error(err);  
            toast.error(err.message);  
        }  
    };  

    return (  

   <div>
    <div className="conatiner">
      <div className="row">
      <Toaster position="top-center" reverseOrder={false} />  

        <div className="col-md-6 col-lg-6 col-12">
        <div className='d-flex justify-content-center align-item-center mt-3 '>
        <img src={logo} alt=""className='w-25 h-25' />
        </div>
        </div>
        <div className="col-lg-6  col-md-6 col-12 d-flex justify-content-center align-item-center ">
        <div className=' w-75 '>
                    <div className='form'>  
                        <h2 className='text-light text-center mt-5'>Join Today</h2>  
                        <br />  
                        <div>  
                        <lable className="form-label mt-1 mb-2"><h6 className='text-light'>Email</h6>
            <input type="email" 
             className=' text-light form-control bg-dark'
             placeholder='Enter your Email'
             value={email}
             onChange={(e)=>setEmail(e.target.value)}

            />
            </lable>
                        </div>  
                        <div className='mt-2'>  
                        <lable className="form-label mt-1 mb-2"><h6 className='text-light'>Username</h6>
            <input type="text" 
             className=' text-light form-control bg-dark'
             placeholder='Enter your Username'
             value={username}
             onChange={(e)=>setUsername(e.target.value)}

            />
            </lable>
                        </div>  
                        <div className='mt-2'>  
             <lable className="form-label mt-1 mb-2"><h6 className='text-light'>Fullname</h6>
            <input type="text" 
             className=' text-light form-control bg-dark'
             placeholder='Enter your Fullname'
             value={fullname}
             onChange={(e)=>setFullname(e.target.value)}

            />
            </lable>
                        </div> 
    
          <div className='mt-2'>  
          <lable className="form-label mt-1 mb-2"><h6 className='text-light'>Password</h6>
            <input type="text" 
             className=' text-light form-control bg-dark'
             placeholder='Enter your Password'
             value={password}
             onChange={(e)=>setPassword(e.target.value)}

            />
            </lable>
</div>
<div className='d-flex justify-content-center align-item-center'>  
 <button className='btn btn-dark text-info w-50 mt-2' onClick={handleSubmit}  >Signup
</button></div>
  <p className='text-light my-2 d-flex justify-content-center align-item-center'>Create a new account?</p>
   <div className='d-flex justify-content-center align-item-center'>

 <button className='btn btn-info w-50 ' ><Link  to="/login">login</Link>
  </button>
</div>

          </div>
     
 </div>
      

  


        </div>
      </div>
    </div>
      
    </div>
    )
}  

export default Signup;