// Login.js
import React, { useState } from 'react';
import '../App.css'; // Import your CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const postData = { username, password };
            const res = await axios.post("http://localhost:5000/api/auth/login", postData);
            document.getElementById("error").textContent = "Loading...";
            if (res.status == 200) {
                localStorage.setItem("authToken", res.data.token)
                localStorage.setItem("userId", res.data.user?._id)
                navigate("/files");
            } else if (res.status == 301) {
                document.getElementById("error").textContent = "User Already Exist";
            } else {
                document.getElementById("error").textContent = "Something went wrong";
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <div className="input-group">
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>Login</button>
            <div id="error"></div>
        </div>
    );
}

export default Login;
