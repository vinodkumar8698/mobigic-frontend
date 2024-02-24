import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div>Welcome to the File Upload App</div>
            <Link to={"/login"}><button>Login</button></Link>
            <Link to={"/register"}><button>Register</button></Link>
        </>
    )
}

export default Home