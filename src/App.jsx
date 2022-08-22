import './App.css'
import ProfilePage from './components/ProfilePage/ProfilePage'
import Login from './Pages/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Register from './Pages/Register/Register';
import { AddPost } from './Pages/AddPost/AddPost';
import { useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2'

function App() {

const [loginState,setLoginState] =useState(false)
const [userId,setUserId] = useState("")  
const [userLogin, setUserLogin] = useState({
  username: '',
  password: ''
});


const handleChange = (event) => {
  setUserLogin({...userLogin, [event.target.name]: event.target.value})
};

const loginValidation= async() =>{
    const headers = {
      'Content-Type':'application/json'
    }

    const postData = {
      "username": userLogin.username,
      "password": userLogin.password,
    }  
   
    await axios.post('http://localhost:8080/users/login', postData, {headers:headers}).then((res)=>{
      setLoginState(true)
      setUserId(res.data.username_id)
    
    }).then(()=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login Success',
        showConfirmButton: false,
        timer: 1500
      })
    }).then(()=>{
      return <Navigate to="/" />;
    })
    .catch((res)=>{
      Swal.fire({
        icon: 'error',
        title: 'Username or Password wrong',
        text: 'Please try again',
        footer: '<a href="">Why do I have this issue?</a>'
      })

    })
};

const handleSubmit = (event) => {
  event.preventDefault();

  // preventDefault ไม่ให้ browser reload
  loginValidation();
};
  if(loginState===false){
    return (
      <div className="App">
        <BrowserRouter>
        <div className='nav'>
          <Navbar/>
        </div>
          <Routes>
            {/* <Route path = '/nav' element={<Navbar/>}/> */}
           \
            <Route path = '/login' element = {<Login onSubmit={handleSubmit} user_login = {userLogin.username} user_password = {userLogin.password} onChange={handleChange} />}/>
            <Route path = '/register' element = {<Register/>}/>
           \
            <Route path='*' element = {<Navigate to="/login"/>}/>
          </Routes>

        </BrowserRouter>
        
      
      </div>
    )
  }
  else{
    return (
        <div className="App">
          <BrowserRouter>
          <div className='nav'>
            <Navbar/>
          </div>
            <Routes>
              {/* <Route path = '/nav' element={<Navbar/>}/> */}
              <Route path = '/myactivities' element={<ProfilePage userId={userId}/> } />
              {/* <Route path = '/login' element = {<Login onSubmit={handleSubmit} user_login = {userLogin.username} user_password = {userLogin.password} onChange={handleChange} />}/> */}
              {/* <Route path = '/register' element = {<Register/>}/> */}
              <Route path = '/addpost' element = {<AddPost/>}/>
              <Route path='*' element = {<Navigate to="/myactivities"/>}/>
            </Routes>

          </BrowserRouter>
          
        
        </div>
      )
  }
}


export default App
