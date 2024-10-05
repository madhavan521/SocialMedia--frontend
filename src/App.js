import React from 'react';  
import { Route, Routes } from 'react-router-dom';  
import Login from './Components/Auth/Login';  
import Signup from './Components/Auth/Signup';  
import Sidebar from './Components/Home/Sidebar';
import Notification from './Components/Pages/Notification';
import Profile from './Components/Pages/Profile';
import { UserContextProvider } from './Context/UserContext'
import Suggest from './Components/Pages/Suggest';
import Homepage from './Components/Home/Homepage';
import AddPost from './Components/Pages/AddPost';
import IndividualProfile from './Components/Pages/IndividualProfile';
import UpdateProfile from './Components/Pages/UpdateProfile';
import Comment from './Components/Pages/Comment';

const App = () => {  
  return (  
<>
    <UserContextProvider>
      <>  
      <div className="container-fluid">
        <div className="row">
          <div className="col-0">
       <Sidebar />   
       </div>
        <div className="col-12">
        {/* <Mainpage /> */}

     
        <Routes>               


        <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />  
          <Route path='/signup' element={<Signup />} />  
          <Route path="/notification" element={<Notification />}/>
          <Route path='/profile'   element={<Profile />} />
          <Route path='/suggest' element={<Suggest />}/>
          <Route path='/post' element={<AddPost />}/>
          <Route path="/:username" element={<IndividualProfile />}/>
          <Route path='/update' element={<UpdateProfile />} />
          <Route path='comment/:id' element={<Comment />}/>
         </Routes>
           </div>
         </div>
      </div>
      </> 
       </UserContextProvider>
      </>    );  
}  

export default App;