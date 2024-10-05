import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {  
    const [bio, setBio] = useState('');  
    const [link, setLink] = useState('');   

    const navigate =useNavigate()

    const handleSubmit = async () => {  
        const updatedata = {
            bio:bio,
            link:link
        }
        try {  
            await fetch('https://socialmedia-backend-wlia.onrender.com/api/user/update', {  
                method: "POST",  
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: "include", 
                body:JSON.stringify(updatedata) 
            })
            .then(res=>res.json())  
            .then(result=>{
                console.log(result)
                console.log("Updated Successfully")
                setTimeout(() => {
                                  navigate("/profile")
                     window.location.reload()
                }, 500);
            })
            
        } catch (error) {  
            console.error('Error:', error); 
        }  
    };  

    return (  
        <div>  
            <h1>Your Profile</h1>   
                <label htmlFor="bio">Bio:</label><br />  
                <textarea  
                    id="bio"  
                    value={bio}  
                    onChange={(e) => setBio(e.target.value)}  
                    rows="4"  
                    cols="50"  
                    className='bg-dark text-light'
                /><br /><br />  

                <label htmlFor="link">Profile Link:</label><br />  
                <input  
                    type="text"  
                    id="link"  
                    className='bg-dark text-light'
                    value={link}  
                    onChange={(e) => setLink(e.target.value)}  
                /><br /><br /> 

                <button type="submit" onClick={handleSubmit}>Submit</button>  
        </div>  
    );  
};  

export default UpdateProfile;