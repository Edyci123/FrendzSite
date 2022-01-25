import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "@reach/router";
import { UserContext } from '../App';

import Card from "./Card.js";

const Protected = ( {logOutCallback} ) => {
    const [user] = useContext(UserContext);
    const [content, setContent] = useState('You need to login');

    useEffect(() => {
        async function fetchProtected() {
            const result = await (await fetch('http://localhost:4000/getContacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.accesstoken}`
                }
            })).json();
            if (result.contacts) {
                setContent(result.contacts);
            } 
        }
        fetchProtected();
    }, [user]);
    
    console.log(content);
    if ( content === 'You need to login')
        return <div>{content}</div>;

    return (
        <div>
            <div> 
                {content.map(({username, description}) => (
                    <div className="card">
                        <div className="top">
                            <h2 className="name">{username}</h2>
                        </div>
                        <div className="bottom">
                            <p className="info">Description: {description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="button-5" onClick={logOutCallback}>Log out</button> 
        </div>

    );
}

export default Protected;