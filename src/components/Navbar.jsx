import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import {  } from "firebase/auth";

const Navbar = ({ isAuth, setIsAuth }) => {

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        });
    }

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = "/login";
        });
    };

    return (
        <>
            <nav className="navbar-expand-lg navbar navbar-dark bg-dark">
                <div className="container" style={{color: "#FF4F00"}}>
                    <Link className="navbar-brand">
                        <img src={logo} alt="logo" style={{width: "100px"}} />
                    </Link>
                    <button
                        className="navbar-toggler text"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon text"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-md-auto gap-2 d-flex align-items-center">
                            <li className="nav-item rounded">
                                <Link className="nav-link active" aria-current="page" to={"/"}>
                                    <i className="bi bi-house-fill me-2"></i><span className="text fs-5">Home</span>
                                </Link>
                            </li>
                            <li className="nav-item rounded">
                                {
                                    !isAuth ? (
                                        <Link className="nav-link d-flex align-items-center" to={"/login"}>
                                            <i className="bi bi-people-fill me-2"></i>
                                            <button className="login-with-google-btn text fs-5" onClick={signInWithGoogle}>
                                                <span className='ms-4'>Sign in with Google</span>
                                            </button>
                                        </Link>
                                    ) : (
                                        <div className='d-flex justify-content-around'>
                                            <i className="bi bi-people-fill me-2"></i>
                                            <Link to="/createpost" className='nav-link text fs-5'> Create Post </Link>
                                            <button onClick={signUserOut} className="login-with-google-btn text fs-5"> Log Out</button>
                                        </div>
                                    )
                                }
                                
                            </li>                            
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar