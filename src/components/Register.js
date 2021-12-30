import React, {useState, useContext, useEffect } from "react";
import { navigate } from "@reach/router";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await (await fetch('http://192.168.0.103:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, email, password
            })
        })).json();

        if (!result.error) {
            console.log(result.message);
            navigate('/');
        } else {
            console.log(result.error);
        }
    };

    const handleChange = async e => {
        if (e.currentTarget.name === 'username') {
            setUsername(e.currentTarget.value);
        } else if (e.currentTarget.name === 'email') {
            setEmail(e.currentTarget.value);
        } else {
            setPassword(e.currentTarget.value);
        }
    }

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
                <h2 >Welcome!</h2>
                <div className="login-input" >
                    <input 
                        value={username}
                        onChange={handleChange}
                        type="text"
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                    />
                    <input 
                        value={email}
                        onChange={handleChange}
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                    />
                    <input 
                        value={password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                    />
                    <button className="button-5" role="button" type="sumbit">Register</button>
                </div>
            </form>
        </div>
    );

}

export default Register;