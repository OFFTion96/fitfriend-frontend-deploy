import React from "react";
import './Navbar.css';
import {useState} from 'react'
function Navbar() {
    const [tabMobile,setTabMobile] = useState(false)
    const toggleMobile=()=>{
        setTabMobile(!tabMobile)
    }
    return (
        <div className="Nav-content">
            <div className="Nav-content1">
                <div className="logo">
                    <a href="#home"><img src="/images/logo-removebg-preview.png" /></a>
                </div>
            </div>
            <div className="ul">
                <ul className="Nav-ul">
                    <li>Community</li>
                    <li>Add Post</li>
                    <li>My Activities</li>
                    
                </ul>
            </div>
         
            <div className="login-name">
                    <button><a id='#' className="sign-in"><i class="fa-solid fa-right-to-bracket"></i>Sign in</a></button>
                    <button><a id='#' className="sign-up"><i class="fa-solid fa-user-plus"></i>Sign up</a></button>
            </div>
            <div className="nav-mobile">
                <div className="toggle-bar">
                    <i class="fa-solid fa-bars" onClick={toggleMobile}></i>
                </div>
                <div className={tabMobile ? "tab-mobile active":"tab-mobile"}>
                    <div className="container-mobile">
                        <div className="mobile-login-name">
                            <button><i class="fa-solid fa-right-to-bracket"></i><a id='#' className="sign-in">Sign in</a></button>
                            <button><i class="fa-solid fa-user-plus"></i><a id='#' className="sign-up">Sign up</a></button>
                        </div>
                        <div className = "mobile-ul">
                            <ul className="mobile-nav-ul">
                                <li>Community</li>
                                <li>Add Post</li>
                                <li>My Activities</li>
                                
                            </ul>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            
        </div>

        //     // {/* ===================================MEDIA QUERY========================================== */}

        // {/* <div className="Nav-mobile">
        //     <div className="logo-mobile">
        //         <img src="/images/logo-removebg-preview.png" />
        //     </div>

        //     <div className="Nav-ui-mobile">
        //         <div id="myLinks">
        //             <li><a href="#Community" id='#community'><img src="../images/283-2836870_community-icon-transparent-background-png-download-transparent-transparent.png" alt="Community" /></a></li>
        //             <li><a href="Workout" id='#workout'><img src="../images/illust58-5797-01.jpg" alt="Community" /></a></li>
        //             <li><a href="Recipes" id='#recipes'><img src="../images/2389105.png" alt="Community" /></a></li>
        //             <li><a href="Goals" id='#goals'><img src="../images/png-clipart-arrow-target-practicing-board-cartoon-cartoon-target-miscellaneous-cartoon-character.png" alt="Community" /></a></li>


        //             <div className="login-name-mobile">
        //                 <button><a href="#" id='#' className="sign-in">Sign in</a></button>
        //                 <button><a href="#" id='#' className="sign-up">Sign up</a></button>
        //             </div>
        //         </div>



        //     </div>
        // </div> */}

        // {/* </div> */}


    )
};


export default Navbar