import React, { useState, useContext } from "react";    
import { UserContext } from "../App";

const AddContact = () => {

    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [user] = useContext(UserContext);

    const handleChange = e => {
        if (e.currentTarget.name === 'username') {
            setUsername(e.currentTarget.value);
        } else {
            setDescription(e.currentTarget.value);
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const result = await fetch('http://localhost:4000/addContacts', {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-type': "application/json",
                'authorization': `Bearer ${user.accesstoken}`
            },
            body: JSON.stringify({
                username,
                description
            })
        });

        console.log(result);
    }

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
                <h2>Add a new Contact</h2>
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
                        value={description}
                        onChange={handleChange}
                        type="text"
                        name="description"
                        placeholder="Description"
                        autoComplete="description"
                    />
                    <button className="button-5" type="sumbit">Add</button>
                </div>
            </form>
        </div>
    )

}

export default AddContact;