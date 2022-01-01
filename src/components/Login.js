import React, {useState, useContext, useEffect } from "react";
import { navigate } from "@reach/router";
import { UserContext } from "../App";

const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await (await fetch('http://localhost:4000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        })).json();

        if (result.accesstoken) {
            setUser({
                accesstoken: result.accesstoken
            });
            navigate('/');
        } else {
            console.log(result.error);
        }
    };

    useEffect(() => {
        console.log(user);
    }, [user]);

    const handleChange = async e => {
        if (e.currentTarget.name === 'username') {
            setUsername(e.currentTarget.value);
        } else {
            setPassword(e.currentTarget.value)
        }
    }

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="login-input">
                    <input 
                        value={username}
                        onChange={handleChange}
                        type="text"
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                    />
                    <input 
                        value={password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                    />
                    <button className="button-5" type="sumbit">Login</button>
                </div>
            </form>
        </div>
    )

}

export default Login;